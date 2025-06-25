"use client";

import { useState } from 'react';
import dynamic from 'next/dynamic';
import VehicleHighlights from '@/components/vehicle-highlights';
import BookingSection from '@/components/booking-section';
import WhyChooseUs from '@/components/why-choose-us';
import Testimonials from '@/components/testimonials';

const HeroSection = dynamic(() => import('@/components/hero-section'), { 
  ssr: false,
  loading: () => <div className="h-[60vh] md:h-[80vh] w-full bg-muted animate-pulse" />
});

export default function Home() {
  const [vehicleToBook, setVehicleToBook] = useState('');

  return (
    <>
      <HeroSection />
      <VehicleHighlights onBookNow={setVehicleToBook} />
      <BookingSection vehicleToBook={vehicleToBook} />
      <WhyChooseUs />
      <Testimonials />
    </>
  );
}
