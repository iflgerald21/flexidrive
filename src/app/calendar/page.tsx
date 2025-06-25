'use client';

import React, { useEffect, useState } from 'react';
import { Car } from 'lucide-react';
import { addDays, isSameDay, startOfDay, endOfDay, format, parse, isWithinInterval, addMinutes } from 'date-fns';
import type { DayContentProps } from 'react-day-picker';

import { Calendar } from '@/components/ui/calendar';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableCaption } from "@/components/ui/table";

// --- More Detailed Mock Data ---
const vehicles = [
  { name: 'MG5 CVT Core' },
  { name: 'Toyota Raize' },
  { name: 'Honda Brio' },
];

const bookings = [
  // MG5 Bookings
  { vehicle: 'MG5 CVT Core', startDate: addDays(new Date(), 2), endDate: addDays(new Date(), 2), startTime: '09:00', endTime: '17:00' },
  { vehicle: 'MG5 CVT Core', startDate: addDays(new Date(), 3), endDate: addDays(new Date(), 4), startTime: '14:00', endTime: '12:00' },
  // Toyota Raize Bookings
  { vehicle: 'Toyota Raize', startDate: addDays(new Date(), 2), endDate: addDays(new Date(), 2), startTime: '18:00', endTime: '22:00' },
  { vehicle: 'Toyota Raize', startDate: addDays(new Date(), 10), endDate: addDays(new Date(), 10), startTime: '08:00', endTime: '20:00' },
  // Honda Brio Bookings
  { vehicle: 'Honda Brio', startDate: addDays(new Date(), -5), endDate: addDays(new Date(), -3), startTime: '10:00', endTime: '10:00' },
  { vehicle: 'Honda Brio', startDate: addDays(new Date(), 15), endDate: addDays(new Date(), 18), startTime: '11:00', endTime: '11:00' },
  // Fully booked day for demonstration
  { vehicle: 'MG5 CVT Core', startDate: addDays(new Date(), 10), endDate: addDays(new Date(), 10), startTime: '00:00', endTime: '23:59' }
];

// --- Helper Functions and Types ---

// Generate a flat list of all dates that have at least one booking
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

type AvailabilitySlot = { start: Date; end: Date };
type VehicleAvailability = {
  vehicleName: string;
  availableSlots: AvailabilitySlot[];
};

// --- Calendar Page Component ---

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
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const [availability, setAvailability] = useState<VehicleAvailability[]>([]);

  useEffect(() => {
    if (!date) {
      setAvailability([]);
      return;
    }

    const calculateAvailability = (selectedDate: Date): VehicleAvailability[] => {
      const results: VehicleAvailability[] = [];
      const dayStart = startOfDay(selectedDate);
      const dayEnd = endOfDay(selectedDate);

      for (const vehicle of vehicles) {
        // 1. Find all bookings for this vehicle that overlap with the selected date
        const relevantBookings = bookings.filter(b => 
          b.vehicle === vehicle.name && 
          isWithinInterval(selectedDate, { start: startOfDay(b.startDate), end: startOfDay(b.endDate) })
        );

        // 2. Create a list of "busy" time intervals for the selected date
        const busyIntervals: AvailabilitySlot[] = relevantBookings.map(b => {
          const bookingStartDateTime = parse(b.startTime, 'HH:mm', b.startDate);
          const bookingEndDateTime = parse(b.endTime, 'HH:mm', b.endDate);

          const start = bookingStartDateTime < dayStart ? dayStart : bookingStartDateTime;
          const end = bookingEndDateTime > dayEnd ? dayEnd : bookingEndDateTime;
          
          return { start, end };
        }).sort((a, b) => a.start.getTime() - b.start.getTime());

        // 3. Calculate "free" intervals by finding the gaps
        const freeSlots: AvailabilitySlot[] = [];
        let lastBusyEnd = dayStart;

        for (const interval of busyIntervals) {
          if (interval.start > lastBusyEnd) {
            freeSlots.push({ start: lastBusyEnd, end: interval.start });
          }
          if(interval.end > lastBusyEnd) {
            lastBusyEnd = interval.end;
          }
        }

        if (lastBusyEnd < dayEnd) {
          // Add a minute to dayEnd for correct upper bound
          freeSlots.push({ start: lastBusyEnd, end: addMinutes(dayEnd, 1) }); 
        }

        if(freeSlots.length > 0) {
            results.push({
              vehicleName: vehicle.name,
              availableSlots: freeSlots
            });
        }
      }
      return results;
    };

    setAvailability(calculateAvailability(date));
  }, [date]);

  const bookedModifier = { booked: bookedDates };

  return (
    <section className="py-12 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-bold font-headline text-center mb-4">
          Booking Calendar
        </h1>
        <p className="text-lg text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
          Check vehicle availability. Select a date to view available time slots.
        </p>
        <div className="flex flex-col lg:flex-row items-start justify-center gap-8 lg:gap-12">
          <div className="flex flex-col items-center w-full lg:w-auto">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
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

          <div className="w-full lg:max-w-xl flex-grow">
            {date && (
              <h2 className="text-2xl font-bold font-headline mb-4">
                Availability for {format(date, 'PPP')}
              </h2>
            )}
            {date && availability.length > 0 ? (
              <Table className="border rounded-lg shadow-sm">
                <TableCaption>Time slots are shown for available vehicles on the selected date.</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[200px]">Vehicle</TableHead>
                    <TableHead>Available Time Slots</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {availability.map(({ vehicleName, availableSlots }) => (
                    <TableRow key={vehicleName}>
                      <TableCell className="font-medium">{vehicleName}</TableCell>
                      <TableCell>
                        <div className="flex flex-col gap-1">
                          {availableSlots.map((slot, index) => (
                              <span key={index}>
                                {format(slot.start, 'p')} - {format(slot.end, 'p')}
                              </span>
                          ))}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : date ? (
              <div className="p-8 text-center border rounded-lg shadow-sm bg-muted/50">
                <p className="text-muted-foreground">No available time slots for the selected date. The vehicles are fully booked.</p>
              </div>
            ) : (
                 <div className="p-8 text-center border rounded-lg shadow-sm bg-muted/50">
                    <p className="text-muted-foreground">Please select a date to view availability.</p>
                </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}