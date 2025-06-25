
"use client";

import { useState } from "react";
import Image from "next/image";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Fuel, Gauge, Users, Car } from "lucide-react";

const vehicles = [
  {
    name: "MG5 CVT Core",
    image: "https://placehold.co/600x400.png",
    hint: "sedan car",
    transmission: "Automatic",
    fuel: "Gasoline",
    price12h: "1,500",
    price24h: "2,500",
    description: "A stylish and feature-packed sedan, the MG5 Core offers a premium driving experience with its comfortable interior and modern technology. Perfect for city driving and long trips.",
    capacity: 5,
    type: "Sedan",
  },
];

type Vehicle = (typeof vehicles)[0];

export default function VehicleHighlights({ onBookNow }: { onBookNow: (vehicleName: string) => void }) {
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);

  const handleBookNow = (vehicleName: string) => {
    onBookNow(vehicleName);
    setSelectedVehicle(null);
    setTimeout(() => {
      document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  }

  return (
    <>
      <section id="vehicles" className="py-12 md:py-24 bg-secondary">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold font-headline text-center mb-12">
            Our Featured Vehicles
          </h2>
          <div className="flex justify-center">
            {vehicles.map((vehicle) => (
              <Card key={vehicle.name} className="overflow-hidden shadow-lg hover:shadow-primary/20 transition-shadow duration-300 flex flex-col w-full max-w-sm">
                <div className="relative h-64 w-full">
                  <Image
                    src={vehicle.image}
                    alt={vehicle.name}
                    data-ai-hint={vehicle.hint}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-2xl font-headline">{vehicle.name}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <div className="flex justify-around text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Gauge className="h-5 w-5 text-primary" />
                      <span>{vehicle.transmission}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Fuel className="h-5 w-5 text-primary" />
                      <span>{vehicle.fuel}</span>
                    </div>
                     <div className="flex items-center gap-2">
                      <Users className="h-5 w-5 text-primary" />
                      <span>{vehicle.capacity} seats</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between items-center bg-background/50 p-4">
                  <div>
                    <span className="text-2xl font-bold text-primary">₱{vehicle.price12h}</span>
                    <span className="text-muted-foreground">/12hrs</span>
                  </div>
                  <Button 
                    variant="outline" 
                    className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                    onClick={() => setSelectedVehicle(vehicle)}
                  >
                    View Details
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {selectedVehicle && (
        <Dialog open={!!selectedVehicle} onOpenChange={(isOpen) => !isOpen && setSelectedVehicle(null)}>
          <DialogContent className="sm:max-w-[625px]">
            <DialogHeader>
              <DialogTitle className="text-3xl font-headline">{selectedVehicle.name}</DialogTitle>
              <DialogDescription>
                {selectedVehicle.description}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
                <div className="relative h-80 w-full rounded-md overflow-hidden">
                    <Image
                        src={selectedVehicle.image}
                        alt={selectedVehicle.name}
                        data-ai-hint={selectedVehicle.hint}
                        fill
                        className="object-cover"
                    />
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2 p-3 bg-muted rounded-md">
                        <Gauge className="h-5 w-5 text-primary" />
                        <strong>Transmission:</strong> {selectedVehicle.transmission}
                    </div>
                    <div className="flex items-center gap-2 p-3 bg-muted rounded-md">
                        <Fuel className="h-5 w-5 text-primary" />
                        <strong>Fuel:</strong> {selectedVehicle.fuel}
                    </div>
                    <div className="flex items-center gap-2 p-3 bg-muted rounded-md">
                        <Users className="h-5 w-5 text-primary" />
                        <strong>Capacity:</strong> {selectedVehicle.capacity} seats
                    </div>
                    <div className="flex items-center gap-2 p-3 bg-muted rounded-md">
                        <Car className="h-5 w-5 text-primary" />
                        <strong>Type:</strong> {selectedVehicle.type}
                    </div>
                </div>
            </div>
            <DialogFooter className="flex-col-reverse sm:flex-row sm:justify-between items-center gap-4">
                <div className="text-2xl font-bold text-primary text-center sm:text-left">
                    ₱{selectedVehicle.price12h}
                    <span className="text-sm font-normal text-muted-foreground">/12hrs</span>
                </div>
                <Button onClick={() => handleBookNow(selectedVehicle.name)} size="lg" className="bg-primary hover:bg-accent text-primary-foreground font-bold w-full sm:w-auto">Book Now</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
