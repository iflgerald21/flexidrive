import Image from "next/image";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Fuel, Gauge, Users } from "lucide-react";

const vehicles = [
  {
    name: "MG5 CVT Core",
    image: "https://placehold.co/600x400.png",
    hint: "sedan car",
    transmission: "Automatic",
    fuel: "Gasoline",
    rate: "2,500",
  },
  {
    name: "Toyota Fortuner",
    image: "https://placehold.co/600x400.png",
    hint: "suv car",
    transmission: "Automatic",
    fuel: "Diesel",
    rate: "4,000",
  },
  {
    name: "Honda Brio",
    image: "https://placehold.co/600x400.png",
    hint: "hatchback car",
    transmission: "Automatic",
    fuel: "Gasoline",
    rate: "2,200",
  },
];

export default function VehicleHighlights() {
  return (
    <section id="vehicles" className="py-12 md:py-24 bg-card">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold font-headline text-center mb-12">
          Our Featured Vehicles
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {vehicles.map((vehicle) => (
            <Card key={vehicle.name} className="overflow-hidden shadow-lg hover:shadow-primary/20 transition-shadow duration-300 flex flex-col">
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
                </div>
              </CardContent>
              <CardFooter className="flex justify-between items-center bg-background/50 p-4">
                <div>
                  <span className="text-2xl font-bold text-primary">₱{vehicle.rate}</span>
                  <span className="text-muted-foreground">/day</span>
                </div>
                <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">View Details</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
