'use client';

import React, { useState, useMemo } from 'react';
import { Car, Clock } from 'lucide-react';
import { addDays, isSameDay, startOfDay, endOfDay, format, areIntervalsOverlapping, set } from 'date-fns';
import type { DayContentProps } from 'react-day-picker';

import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableCaption } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

// --- Mock Data ---
const vehicles = [
  { name: "MG5 CVT Core", type: "Sedan", price12h: "1,500", price24h: "2,500" },
  { name: "Toyota Raize", type: "SUV", price12h: "1,800", price24h: "3,000" },
  { name: "Honda Brio", type: "Hatchback", price12h: "1,200", price24h: "2,000" },
];

const bookings = [
  { vehicle: 'MG5 CVT Core', startDate: set(addDays(new Date(), 2), { hours: 9, minutes: 0 }), endDate: set(addDays(new Date(), 2), { hours: 21, minutes: 0 }) },
  { vehicle: 'Toyota Raize', startDate: set(addDays(new Date(), 10), { hours: 10, minutes: 0 }), endDate: set(addDays(new Date(), 10), { hours: 22, minutes: 0 }) },
  { vehicle: 'Honda Brio', startDate: set(addDays(new Date(), -5), { hours: 14, minutes: 0 }), endDate: set(addDays(new Date(), -3), { hours: 14, minutes: 0 }) },
  { vehicle: 'Honda Brio', startDate: set(addDays(new Date(), 15), { hours: 8, minutes: 0 }), endDate: set(addDays(new Date(), 18), { hours: 20, minutes: 0 }) },
];
// --- End Mock Data ---

// --- Helper Functions ---
const bookedDates = Array.from(new Set(bookings.flatMap(booking => {
  const dates = [];
  let currentDate = startOfDay(booking.startDate);
  const lastDate = startOfDay(booking.endDate);
  while (currentDate <= lastDate) {
    dates.push(new Date(currentDate));
    currentDate = addDays(currentDate, 1);
  }
  return dates;
})));

function getVehicleAvailability(vehicleName: string, selectedDate: Date) {
  const dayStart = startOfDay(selectedDate);
  const dayEnd = endOfDay(selectedDate);
  
  const vehicleBookings = bookings
    .filter(b => b.vehicle === vehicleName)
    .filter(b => areIntervalsOverlapping({ start: b.startDate, end: b.endDate }, { start: dayStart, end: dayEnd }))
    .map(b => ({
        start: b.startDate > dayStart ? b.startDate : dayStart,
        end: b.endDate < dayEnd ? b.endDate : dayEnd,
    }))
    .sort((a, b) => a.start.getTime() - b.start.getTime());

  if (vehicleBookings.length === 0) {
    return { status: 'Vacant' as const, availableSlots: ['Full Day (00:00 - 23:59)'] };
  }

  const availableSlots: string[] = [];
  let lastBookingEnd = dayStart;

  vehicleBookings.forEach(booking => {
    if (booking.start > lastBookingEnd) {
      availableSlots.push(`${format(lastBookingEnd, 'HH:mm')} - ${format(booking.start, 'HH:mm')}`);
    }
    lastBookingEnd = booking.end;
  });

  if (lastBookingEnd < dayEnd) {
    availableSlots.push(`${format(lastBookingEnd, 'HH:mm')} - ${format(dayEnd, 'HH:mm')}`);
  }
  
  if (availableSlots.length > 0) {
      return { status: 'Vacant' as const, availableSlots };
  }
  
  return { status: 'Rented' as const, availableSlots: [] };
}
// --- End Helper Functions ---

function CustomDayContent(props: DayContentProps) {
    const isBooked = bookedDates.some((bookedDate) => isSameDay(props.date, bookedDate));
    return (
        <div className="relative h-full w-full flex items-center justify-center">
            <span>{props.date.getDate()}</span>
            {isBooked && !props.outside && (
                <Car className="absolute bottom-1 right-1 h-3 w-3 text-primary opacity-80" />
            )}
        </div>
    );
}

export default function CalendarPage() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  
  const bookedModifier = { booked: bookedDates };

  const availabilityData = useMemo(() => {
    if (!selectedDate) return [];

    return vehicles.map(vehicle => {
      const availability = getVehicleAvailability(vehicle.name, selectedDate);
      return { ...vehicle, ...availability };
    });
  }, [selectedDate]);

  return (
    <section className="py-12 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-bold font-headline text-center mb-4">
          Booking Calendar
        </h1>
        <p className="text-lg text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
          Check vehicle availability. Select a date to see available slots.
        </p>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <div className="flex flex-col items-center">
                <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    showOutsideDays
                    modifiers={bookedModifier}
                    modifiersClassNames={{
                    booked: "bg-primary/10",
                    }}
                    className="rounded-md border p-4 shadow-sm"
                    components={{
                        DayContent: CustomDayContent,
                    }}
                />
                <div className="mt-6 flex items-center justify-center gap-4 text-sm text-muted-foreground border p-3 rounded-md">
                    <div className="flex items-center gap-2">
                        <div className="h-4 w-4 rounded-sm border bg-primary/10" />
                        <span>= Booked Day</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Car className="h-4 w-4 text-primary" />
                        <span>= Booking Indicator</span>
                    </div>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl font-headline">
                        Availability for {selectedDate ? format(selectedDate, 'PPP') : '...'}
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                      <TableCaption>Availability is updated in real-time.</TableCaption>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Vehicle</TableHead>
                          <TableHead>12hr Rate</TableHead>
                          <TableHead>24hr Rate</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Available Slots</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {availabilityData.map((v) => (
                          <TableRow key={v.name}>
                            <TableCell className="font-medium">{v.name}</TableCell>
                            <TableCell>₱{v.price12h}</TableCell>
                            <TableCell>₱{v.price24h}</TableCell>
                            <TableCell>
                              <Badge variant={v.status === 'Vacant' ? 'secondary' : 'destructive'}>
                                {v.status}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              {v.status === 'Vacant' ? (
                                <ul className="text-xs space-y-1">
                                {v.availableSlots.map(slot => (
                                    <li key={slot} className="flex items-center gap-1.5">
                                        <Clock className="h-3 w-3 text-primary" /> 
                                        <span>{slot}</span>
                                    </li>
                                ))}
                                </ul>
                              ) : (
                                <span className="text-xs text-muted-foreground">None</span>
                              )}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
      </div>
    </section>
  );
}
