'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { format } from 'date-fns';
import { User, Mail, Phone, Car, MapPin, Clock } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const clientInfoSchema = z.object({
  fullName: z.string().min(2, "Full name is required."),
  email: z.string().email("Invalid email address."),
  phone: z.string().min(10, "Invalid phone number."),
});

function BookingDetailsPageContent() {
  const searchParams = useSearchParams();
  const { toast } = useToast();

  const vehicleName = searchParams.get('vehicleName') || 'N/A';
  const pickupLocation = searchParams.get('pickupLocation') || 'N/A';
  const dropoffLocation = searchParams.get('dropoffLocation') || 'N/A';
  const pickupDate = searchParams.get('pickupDate');
  const returnDate = searchParams.get('returnDate');
  const pickupTime = searchParams.get('pickupTime') || 'N/A';
  const returnTime = searchParams.get('returnTime') || 'N/A';

  const form = useForm<z.infer<typeof clientInfoSchema>>({
    resolver: zodResolver(clientInfoSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
    }
  });

  function onSubmit(values: z.infer<typeof clientInfoSchema>) {
    const bookingData = {
      clientInfo: values,
      bookingDetails: {
        vehicleName,
        pickupLocation,
        dropoffLocation,
        pickupDate,
        returnDate,
        pickupTime,
        returnTime
      }
    };
    
    console.log("Booking Confirmed:", bookingData);
    
    toast({
        title: "Booking Confirmed!",
        description: "Thank you for choosing FlexiDrive. We've received your booking details.",
    });
  }

  return (
    <section className="py-12 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-3xl font-headline">Client Information</CardTitle>
                <CardDescription>Please provide your contact details to complete the booking.</CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="fullName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                              <Input placeholder="e.g., Juan Dela Cruz" {...field} className="pl-10" />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                     <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                              <Input placeholder="e.g., you@example.com" type="email" {...field} className="pl-10" />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                     <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                              <Input placeholder="e.g., 0917-XXX-XXXX" type="tel" {...field} className="pl-10" />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" size="lg" className="w-full bg-primary hover:bg-accent text-primary-foreground font-bold text-lg">
                      Confirm Booking
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="text-2xl font-headline">Booking Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <div className="flex items-start gap-3">
                  <Car className="h-5 w-5 text-primary mt-1 shrink-0" />
                  <div className="space-y-1">
                    <p className="font-semibold">Vehicle</p>
                    <p className="text-muted-foreground">{vehicleName}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-primary mt-1 shrink-0" />
                  <div className="space-y-1">
                    <p className="font-semibold">Pickup</p>
                    <p className="text-muted-foreground">{pickupLocation}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-primary mt-1 shrink-0" />
                  <div className="space-y-1">
                    <p className="font-semibold">Drop-off</p>
                    <p className="text-muted-foreground">{dropoffLocation}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-primary mt-1 shrink-0" />
                  <div className="space-y-1">
                    <p className="font-semibold">Schedule</p>
                    <p className="text-muted-foreground">
                      From: {pickupDate ? format(new Date(pickupDate), 'PPP') : 'N/A'} at {pickupTime}
                    </p>
                    <p className="text-muted-foreground">
                      To: {returnDate ? format(new Date(returnDate), 'PPP') : 'N/A'} at {returnTime}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}

// A Suspense boundary is needed because useSearchParams is a client-side hook
// that reads from the URL, which is only available after the page has loaded.
export default function BookingDetailsPage() {
    return (
        <Suspense fallback={
          <div className="flex justify-center items-center h-screen">
            <div className="text-lg">Loading booking details...</div>
          </div>
        }>
            <BookingDetailsPageContent />
        </Suspense>
    )
}
