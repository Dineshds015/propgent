import Link from 'next/link';
import { Home, Mail, Phone, MapPin, Globe } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground pt-16 pb-8 mt-auto">
      <div className="container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
        <div className="space-y-4">
          <Link href="/" className="flex items-center gap-2 mb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-accent-foreground">
              <Home size={24} strokeWidth={2.5} />
            </div>
            <span className="font-heading text-xl font-bold tracking-tight text-white">
              Propgent
            </span>
          </Link>
          <p className="text-primary-foreground/80 text-sm leading-relaxed">
            We help you find your propgent. Explore the best properties in the most desirable locations with our expert guidance.
          </p>
          <div className="flex items-center gap-4 pt-2">
            <a href="#" className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-colors">
              <Globe size={18} />
            </a>
            <a href="#" className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-colors">
              <Globe size={18} />
            </a>
            <a href="#" className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-colors">
              <Globe size={18} />
            </a>
            <a href="#" className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-colors">
              <Globe size={18} />
            </a>
          </div>
        </div>

        <div>
          <h4 className="text-lg font-bold mb-6 text-white">Quick Links</h4>
          <ul className="space-y-3 text-sm text-primary-foreground/80">
            <li><Link href="/" className="hover:text-accent transition-colors">Home</Link></li>
            <li><Link href="/properties" className="hover:text-accent transition-colors">Properties</Link></li>
            <li><Link href="/#about" className="hover:text-accent transition-colors">About Us</Link></li>
            <li><Link href="/#services" className="hover:text-accent transition-colors">Services</Link></li>
            <li><Link href="/#contact" className="hover:text-accent transition-colors">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-bold mb-6 text-white">Property Types</h4>
          <ul className="space-y-3 text-sm text-primary-foreground/80">
            <li><Link href="/properties?propertyType=Apartment" className="hover:text-accent transition-colors">Apartments</Link></li>
            <li><Link href="/properties?propertyType=Villa" className="hover:text-accent transition-colors">Villas</Link></li>
            <li><Link href="/properties?propertyType=House" className="hover:text-accent transition-colors">Independent Houses</Link></li>
            <li><Link href="/properties?propertyType=Commercial" className="hover:text-accent transition-colors">Commercial Spaces</Link></li>
            <li><Link href="/properties?listingType=Rent" className="hover:text-accent transition-colors">Properties for Rent</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-bold mb-6 text-white">Contact Info</h4>
          <ul className="space-y-4 text-sm text-primary-foreground/80">
            <li className="flex items-start gap-3">
              <MapPin size={18} className="text-accent shrink-0 mt-0.5" />
              <span>123 Real Estate Avenue, Business District, Jaipur, RJ 302001</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone size={18} className="text-accent shrink-0" />
              <span>+91 98765 43210</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail size={18} className="text-accent shrink-0" />
              <span>info@propgent.com</span>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="container">
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-primary-foreground/60">
          <p>© 2026 Propgent Real Estate. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
