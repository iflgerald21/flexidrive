
"use client";

import { useEffect, useRef, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, ControllerRenderProps } from "react-hook-form";
import * as z from "zod";
import { format } from "date-fns";
import { CalendarIcon, MapPin, Clock, Car } from "lucide-react";
import usePlacesAutocomplete from "use-places-autocomplete";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

const bookingFormSchema = z.object({
  vehicleName: z.string().optional(),
  travelArea: z.enum(["Metro Manila", "Province"], {
    required_error: "You need to select a travel area.",
  }),
  travelDestination: z.string().min(2, {
    message: "Travel destination must be at least 2 characters.",
  }),
  pickupDate: z.date({
    required_error: "A pickup date is required.",
  }),
  returnDate: z.date({
    required_error: "A return date is required.",
  }),
  pickupTime: z.string().min(1, { message: "Pickup time is required." }),
  returnTime: z.string().min(1, { message: "Return time is required." }),
});

type BookingFormValues = z.infer<typeof bookingFormSchema>;

const PlacesAutocompleteInput = ({ 
  field, 
  placeholder 
}: { 
  field: ControllerRenderProps<BookingFormValues, "travelDestination">;
  placeholder: string;
}) => {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    debounce: 300,
    defaultValue: field.value,
  });

  const ref = useRef<HTMLDivElement>(null);

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    field.onChange(e.target.value);
  };

  const handleSelect = ({ description }: { description: string }) => () => {
    setValue(description, false);
    field.onChange(description);
    clearSuggestions();
  };

  useEffect(() => {
    if (field.value !== value) {
        setValue(field.value);
    }
  }, [field.value, value, setValue]);

  const renderSuggestions = () => (
    data.map((suggestion) => {
      const {
        place_id,
        structured_formatting: { main_text, secondary_text },
      } = suggestion;
      return (
        <li
          key={place_id}
          onClick={handleSelect(suggestion)}
          className="p-2 hover:bg-accent cursor-pointer rounded-md"
        >
          <strong>{main_text}</strong> <small className="text-muted-foreground">{secondary_text}</small>
        </li>
      );
    })
  );

  return (
    <div className="relative" ref={ref}>
      <div className="relative">
        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          {...field}
          value={value}
          onChange={handleInput}
          onBlur={(e) => {
            field.onBlur(e);
            setTimeout(() => clearSuggestions(), 150);
          }}
          disabled={!ready}
          placeholder={placeholder}
          className="pl-10"
          autoComplete="off"
        />
      </div>
      {status === "OK" && <ul className="absolute z-50 w-full mt-1 bg-card border rounded-md shadow-lg">{renderSuggestions()}</ul>}
    </div>
  );
};


export default function BookingSection({ vehicleToBook }: { vehicleToBook: string }) {
  const router = useRouter();

  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      vehicleName: "",
      travelArea: "Metro Manila",
      travelDestination: "",
      pickupTime: "10:00",
      returnTime: "10:00"
    },
  });

  useEffect(() => {
    if (vehicleToBook) {
        form.setValue("vehicleName", vehicleToBook);
    }
  }, [vehicleToBook, form]);


  function onSubmit(values: BookingFormValues) {
    const params = new URLSearchParams();
    if (values.vehicleName) params.append("vehicleName", values.vehicleName);
    params.append("travelArea", values.travelArea);
    params.append("travelDestination", values.travelDestination);
    if (values.pickupDate) params.append("pickupDate", values.pickupDate.toISOString());
    if (values.returnDate) params.append("returnDate", values.returnDate.toISOString());
    params.append("pickupTime", values.pickupTime);
    params.append("returnTime", values.returnTime);
    
    router.push(`/booking/details?${params.toString()}`);
  }

  return (
    <section id="booking" className="py-12 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <Card className="max-w-4xl mx-auto shadow-lg">
          <CardHeader>
            <CardTitle className="text-3xl font-headline text-center">Book Your Ride</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="space-y-8">
                  {form.watch("vehicleName") && (
                    <div className="md:col-span-2">
                      <FormField
                          control={form.control}
                          name="vehicleName"
                          render={({ field }) => (
                          <FormItem>
                              <FormLabel>Selected Vehicle</FormLabel>
                              <FormControl>
                                  <div className="relative">
                                      <Car className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                      <Input {...field} className="pl-10 font-semibold" disabled />
                                  </div>
                              </FormControl>
                              <FormMessage />
                          </FormItem>
                          )}
                      />
                    </div>
                  )}

                  <FormField
                    control={form.control}
                    name="travelArea"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel>Travel Area</FormLabel>
                        <FormControl>
                           <Tabs
                            defaultValue={field.value}
                            onValueChange={field.onChange}
                            className="w-full"
                           >
                              <TabsList className="grid w-full grid-cols-2">
                                <TabsTrigger value="Metro Manila">Metro Manila</TabsTrigger>
                                <TabsTrigger value="Province">Province</TabsTrigger>
                              </TabsList>
                           </Tabs>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="travelDestination"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Travel Destination</FormLabel>
                        <FormControl>
                            <PlacesAutocompleteInput field={field} placeholder="e.g., Tagaytay, BGC" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <FormField
                      control={form.control}
                      name="pickupDate"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Pickup Date</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant={"outline"}
                                  className={cn(
                                    "w-full pl-3 text-left font-normal",
                                    !field.value && "text-muted-foreground"
                                  )}
                                >
                                  {field.value ? (
                                    format(field.value, "PPP")
                                  ) : (
                                    <span>Pick a date</span>
                                  )}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                disabled={(date) =>
                                  date < new Date(new Date().setHours(0,0,0,0))
                                }
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="returnDate"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Return Date</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant={"outline"}
                                  className={cn(
                                    "w-full pl-3 text-left font-normal",
                                    !field.value && "text-muted-foreground"
                                  )}
                                >
                                  {field.value ? (
                                    format(field.value, "PPP")
                                  ) : (
                                    <span>Pick a date</span>
                                  )}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                disabled={(date) =>
                                  date < (form.getValues("pickupDate") || new Date(new Date().setHours(0,0,0,0)))
                                }
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="pickupTime"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Pickup Time</FormLabel>
                          <FormControl>
                              <div className="relative">
                                  <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                  <Input type="time" {...field} className="pl-10" />
                              </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="returnTime"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Return Time</FormLabel>
                          <FormControl>
                              <div className="relative">
                                  <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                  <Input type="time" {...field} className="pl-10" />
                              </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <Button type="submit" size="lg" className="w-full bg-primary hover:bg-accent text-primary-foreground font-bold text-lg">
                  Book Now
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
