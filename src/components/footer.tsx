
import Link from "next/link";
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
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

  const socialLinks = [
    { name: "Facebook", icon: Facebook, href: "#" },
    { name: "Instagram", icon: Instagram, href: "#" },
    { name: "Twitter", icon: Twitter, href: "#" },
  ];

  return (
    <footer className="bg-card text-card-foreground border-t">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <h3 className="text-2xl font-headline text-primary">FlexiDrive</h3>
            <p className="mt-2 text-muted-foreground">Your key to smart driving.</p>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="hover:text-primary transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4">Contact Info</h4>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start">
                <MapPin className="w-5 h-5 mr-3 mt-1 shrink-0 text-primary" />
                <span>123 Flexi Drive, Metro City, 12345</span>
              </li>
              <li className="flex items-center">
                <Mail className="w-5 h-5 mr-3 shrink-0 text-primary" />
                <a href="mailto:contact@flexidrive.com" className="hover:text-primary transition-colors">
                    contact@flexidrive.com
                </a>
              </li>
              <li className="flex items-center">
                <Phone className="w-5 h-5 mr-3 shrink-0 text-primary" />
                <a href="tel:+1234567890" className="hover:text-primary transition-colors">
                    +1 (234) 567-890
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <Link key={social.name} href={social.href} className="text-muted-foreground hover:text-primary transition-colors">
                  <social.icon className="w-6 h-6" />
                  <span className="sr-only">{social.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 border-t pt-6 text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} FlexiDrive Rentals. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
