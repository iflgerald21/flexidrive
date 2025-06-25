"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, Car } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";

export default function Header() {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "#" },
    { name: "Vehicles", href: "#vehicles" },
    { name: "Rates", href: "#" },
    { name: "Booking", href: "#booking" },
    { name: "About Us", href: "#why-us" },
    { name: "Contact", href: "#" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <Link href="#" className="flex items-center gap-2">
          <Car className="h-8 w-8 text-primary" />
          <span className="text-2xl font-bold font-headline">FlexiDrive</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col gap-6 p-6">
                <Link href="#" className="flex items-center gap-2 mb-4" onClick={() => setIsSheetOpen(false)}>
                  <Car className="h-8 w-8 text-primary" />
                  <span className="text-2xl font-bold font-headline">FlexiDrive</span>
                </Link>
                {navLinks.map((link) => (
                  <SheetClose key={link.name} asChild>
                    <Link
                      href={link.href}
                      className="text-lg font-medium text-foreground transition-colors hover:text-primary"
                    >
                      {link.name}
                    </Link>
                  </SheetClose>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
