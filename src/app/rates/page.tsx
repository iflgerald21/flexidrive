import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableCaption } from "@/components/ui/table";
import { CheckCircle } from "lucide-react";

export const metadata = {
  title: "Rental Rates | FlexiDrive Rentals",
  description: "Check out our competitive rental rates for our fleet of vehicles.",
};

const vehicles = [
  {
    name: "MG5 CVT Core",
    type: "Sedan",
    price12h: "1,500",
    price24h: "2,500",
  },
  {
    name: "Toyota Raize",
    type: "SUV",
    price12h: "1,800",
    price24h: "3,000",
  },
  {
    name: "Honda Brio",
    type: "Hatchback",
    price12h: "1,200",
    price24h: "2,000",
  },
];

const inclusions = [
    "Comprehensive Insurance",
    "24/7 Roadside Assistance",
    "Basic Maintenance",
    "Unlimited Mileage (within travel area)"
]

export default function RatesPage() {
  return (
    <section className="py-12 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold font-headline text-center mb-4">
            Our Rental Rates
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Transparent pricing for our entire fleet. Find the perfect car for your budget and needs.
            </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-2">
                <Card className="bg-transparent shadow-none">
                    <CardHeader>
                        <CardTitle className="text-2xl font-headline">Vehicle Pricing</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                        <Table>
                            <TableCaption>Rates are subject to change without prior notice.</TableCaption>
                            <TableHeader>
                                <TableRow>
                                <TableHead>Vehicle</TableHead>
                                <TableHead>Type</TableHead>
                                <TableHead className="text-right">12-Hour Rate</TableHead>
                                <TableHead className="text-right">24-Hour Rate</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {vehicles.map((vehicle) => (
                                <TableRow key={vehicle.name}>
                                    <TableCell className="font-medium">{vehicle.name}</TableCell>
                                    <TableCell>{vehicle.type}</TableCell>
                                    <TableCell className="text-right font-semibold text-primary">₱{vehicle.price12h}</TableCell>
                                    <TableCell className="text-right font-semibold text-primary">₱{vehicle.price24h}</TableCell>
                                </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
            <div className="lg:col-span-1">
                 <Card className="sticky top-24 shadow-lg border-primary/20">
                    <CardHeader>
                        <CardTitle className="text-2xl font-headline">Standard Inclusions</CardTitle>
                        <CardDescription>What comes with every rental.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-3">
                            {inclusions.map((item) => (
                                <li key={item} className="flex items-center gap-3">
                                    <CheckCircle className="h-5 w-5 text-primary shrink-0" />
                                    <span className="text-muted-foreground">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>
            </div>
        </div>
      </div>
    </section>
  );
}
