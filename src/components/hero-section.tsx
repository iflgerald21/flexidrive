"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const heroImage = {
    src: "/image.png",
    alt: "Side view of a red MG5 CVT Core",
    hint: "red car side",
};

export default function HeroSection() {
  return (
    <section className="relative h-[60vh] md:h-[80vh] w-full text-white">
      <div className="h-full w-full relative">
        <Image
          src={heroImage.src}
          alt={heroImage.alt}
          data-ai-hint={heroImage.hint}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
      </div>
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
