'use client';

import React from 'react';
import { Car } from 'lucide-react';
import { isSameDay, addDays } from 'date-fns';
import type { DayContentProps } from 'react-day-picker';

import { Calendar } from '@/components/ui/calendar';

// Mock data for bookings. In a real app, this would come from an API.
const bookings = [
  { startDate: addDays(new Date(), 2), endDate: addDays(new Date(), 4) },
  { startDate: addDays(new Date(), 10), endDate: addDays(new Date(), 10) },
  { startDate: addDays(new Date(), -5), endDate: addDays(new Date(), -3) },
  { startDate: addDays(new Date(), 15), endDate: addDays(new Date(), 18) },
];

// Generate a flat list of all booked dates from the booking ranges
const bookedDates = bookings.flatMap(booking => {
  const dates = [];
  let currentDate = new Date(booking.startDate);
  // Set time to 0 to ensure correct date comparisons
  currentDate.setHours(0, 0, 0, 0);
  const lastDate = new Date(booking.endDate);
  lastDate.setHours(0, 0, 0, 0);

  while (currentDate <= lastDate) {
    dates.push(new Date(currentDate));
    currentDate = addDays(currentDate, 1);
  }
  return dates;
});

function CustomDayContent(props: DayContentProps) {
    // isSameDay function correctly compares dates without time
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

  const bookedModifier = { booked: bookedDates };

  return (
    <section className="py-12 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-bold font-headline text-center mb-4">
          Booking Calendar
        </h1>
        <p className="text-lg text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
          Check vehicle availability. Dates marked with a car icon have bookings.
        </p>
        <div className="flex flex-col items-center">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            showOutsideDays
            modifiers={bookedModifier}
            modifiersClassNames={{
              booked: "bg-primary/10",
            }}
            className="rounded-md border p-4"
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
      </div>
    </section>
  );
}
