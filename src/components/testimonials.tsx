import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "John Doe",
    avatar: "JD",
    image: "https://placehold.co/100x100.png",
    rating: 5,
    quote: "FlexiDrive was a breeze to use. The car was clean, and the booking process was incredibly simple. Highly recommended!",
  },
  {
    name: "Jane Smith",
    avatar: "JS",
    image: "https://placehold.co/100x100.png",
    rating: 5,
    quote: "Affordable rates and excellent customer service. The 24/7 support team was very helpful. I'll definitely be renting again.",
  },
  {
    name: "Samuel Green",
    avatar: "SG",
    image: "https://placehold.co/100x100.png",
    rating: 4,
    quote: "The fleet is well-maintained, and I got the exact car I booked. The entire experience was smooth and hassle-free.",
  },
];

const Testimonials = () => {
  return (
    <section className="py-12 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold font-headline text-center mb-12">
          What Our Clients Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.name} className="flex flex-col justify-between shadow-lg border-primary/20 hover:border-primary transition-all duration-300 transform hover:-translate-y-1">
              <CardHeader className="flex-row items-center gap-4">
                <Avatar>
                  <AvatarImage src={testimonial.image} alt={testimonial.name} data-ai-hint="person portrait" />
                  <AvatarFallback>{testimonial.avatar}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold">{testimonial.name}</h3>
                  <div className="flex items-center">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < testimonial.rating
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-muted-foreground"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground italic">"{testimonial.quote}"</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
