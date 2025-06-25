import { CheckCircle2, ShieldCheck, Clock, ThumbsUp } from "lucide-react";

const features = [
  {
    icon: ShieldCheck,
    title: "Well-Maintained Fleet",
    description: "Our vehicles are regularly serviced and maintained to ensure your safety and comfort.",
  },
  {
    icon: ThumbsUp,
    title: "Affordable Rates",
    description: "We offer competitive pricing and transparent rates with no hidden charges.",
  },
  {
    icon: Clock,
    title: "24/7 Customer Support",
    description: "Our support team is available around the clock to assist you with any inquiries.",
  },
  {
    icon: CheckCircle2,
    title: "Easy Online Booking",
    description: "Book your vehicle in just a few clicks with our simple and secure online system.",
  },
];

const WhyChooseUs = () => {
  return (
    <section id="why-us" className="py-12 md:py-24 bg-secondary">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold font-headline text-center mb-12">
          Why Choose Us?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <div key={feature.title} className="text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-primary/10 p-4 rounded-full">
                    <feature.icon className="h-10 w-10 text-primary" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
