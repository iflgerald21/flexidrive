"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const heroImages = [
  {
    src: "https://placehold.co/1920x1080.png",
    alt: "Sleek red MG5 Core sedan parked on a city street at dusk",
    hint: "red sedan city",
  },
  {
    src: "https://placehold.co/1920x1080.png",
    alt: "Interior view of the MG5 Core with its modern dashboard and tech features",
    hint: "car interior dashboard",
  },
  {
    src: "https://placehold.co/1920x1080.png",
    alt: "Close-up of the MG5 Core's distinctive front grille and LED headlights",
    hint: "car headlight grille",
  },
];

export default function HeroSection() {
  return (
    <section className="relative h-[60vh] md:h-[80vh] w-full text-white">
      <Swiper
        spaceBetween={0}
        centeredSlides={true}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="h-full w-full"
        loop={true}
      >
        {heroImages.map((image, index) => (
          <SwiperSlide key={index}>
            <div className="h-full w-full relative">
              <Image
                src={image.src}
                alt={image.alt}
                data-ai-hint={image.hint}
                fill
                className="object-cover"
                priority={index === 0}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center p-4">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-headline tracking-tight text-shadow-lg">
          Experience Smart Driving with the MG5 Core
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-neutral-200 text-shadow">
          Rent now starting at ₱2,500/day
        </p>
        <Link href="#booking" passHref>
          <Button size="lg" className="mt-8 bg-primary hover:bg-accent text-primary-foreground font-bold text-lg px-8 py-6 rounded-full transition-transform hover:scale-105">
            Book Now
          </Button>
        </Link>
      </div>
    </section>
  );
}
