"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, Car } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

export default function Header() {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Vehicles", href: "/#vehicles" },
    { name: "Rates", href: "/rates" },
    { name: "Booking", href: "/#booking" },
    { name: "Calendar", href: "/calendar" },
    { name: "About Us", href: "/#why-us" },
    { name: "Blogs", href: "/blogs" },
    { name: "Contact", href: "#" },
  ];

  return (
    <header className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled ? "bg-background/90 backdrop-blur-sm border-b" : "bg-primary"
    )}>
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <Car className={cn(
              "h-8 w-8 transition-colors",
              scrolled ? "text-primary" : "text-primary-foreground"
          )} />
          <span className={cn(
              "text-2xl font-bold font-headline transition-colors",
               scrolled ? "text-foreground" : "text-primary-foreground"
          )}>
            FlexiDrive
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={cn(
                  "text-sm font-medium transition-colors",
                  scrolled
                    ? "text-muted-foreground hover:text-foreground"
                    : "text-primary-foreground/80 hover:text-primary-foreground"
              )}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                    "transition-colors",
                    scrolled
                      ? "text-foreground hover:bg-accent"
                      : "text-primary-foreground hover:bg-white/20"
                )}
              >
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col gap-6 p-6">
                <Link
                  href="/"
                  className="flex items-center gap-2 mb-4"
                  onClick={() => setIsSheetOpen(false)}
                >
                  <Car className="h-8 w-8 text-primary" />
                  <span className="text-2xl font-bold font-headline">
                    FlexiDrive
                  </span>
                </Link>
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsSheetOpen(false)}
                    className="text-lg font-medium text-foreground transition-colors hover:text-primary"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
