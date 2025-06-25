import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative h-[60vh] md:h-[80vh] w-full flex items-center justify-center text-white">
      <Image
        src="https://placehold.co/1920x1080.png"
        alt="Red MG5 CVT Core parked in a modern city"
        data-ai-hint="red car"
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
      <div className="relative z-10 text-center p-4">
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
