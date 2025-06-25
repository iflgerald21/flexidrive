import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import Header from '@/components/header';
import Footer from '@/components/footer';
import PageTransition from '@/components/page-transition';

export const metadata: Metadata = {
  title: 'FlexiDrive Rentals',
  description: 'Experience Smart Driving with FlexiDrive Car Rentals',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <div className="flex flex-col min-h-dvh bg-background text-foreground">
          <Header />
          <PageTransition>
            {children}
          </PageTransition>
          <Footer />
        </div>
        <Toaster />
      </body>
    </html>
  );
}
