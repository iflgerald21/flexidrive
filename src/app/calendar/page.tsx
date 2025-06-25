'use client';

import React from 'react';
import { Car } from 'lucide-react';
import { addDays, isSameDay, startOfDay } from 'date-fns';
import type { DayContentProps } from 'react-day-picker';

import { Calendar } from '@/components/ui/calendar';

// --- Mock Data ---
const bookings = [
  { vehicle: 'MG5 CVT Core', startDate: addDays(new Date(), 2), endDate: addDays(new Date(), 4) },
  { vehicle: 'Toyota Raize', startDate: addDays(new Date(), 10), endDate: addDays(new Date(), 10) },
  { vehicle: 'Honda Brio', startDate: addDays(new Date(), -5), endDate: addDays(new Date(), -3) },
  { vehicle: 'Honda Brio', startDate: addDays(new Date(), 15), endDate: addDays(new Date(), 18) },
];

// --- Helper Functions ---
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
  
  const bookedModifier = { booked: bookedDates };

  return (
    <section className="py-12 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-bold font-headline text-center mb-4">
          Booking Calendar
        </h1>
        <p className="text-lg text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
          Check vehicle availability. Dates with bookings are marked with a car icon.
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
      </div>
    </section>
  );
}
