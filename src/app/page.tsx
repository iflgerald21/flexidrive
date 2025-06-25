import Header from '@/components/header';
import HeroSection from '@/components/hero-section';
import VehicleHighlights from '@/components/vehicle-highlights';
import BookingSection from '@/components/booking-section';
import WhyChooseUs from '@/components/why-choose-us';
import Testimonials from '@/components/testimonials';
import Footer from '@/components/footer';

export default function Home() {
  return (
    <div className="flex flex-col min-h-dvh bg-background text-foreground">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <VehicleHighlights />
        <BookingSection />
        <WhyChooseUs />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
}
