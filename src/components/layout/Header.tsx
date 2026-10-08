'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Search, Menu, X } from 'lucide-react';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const isHome = pathname === '/';
  const aboutHref = isHome ? '#about' : '/#about';

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-20 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2" onClick={() => setIsMobileMenuOpen(false)}>
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-accent-foreground">
              <Home size={24} strokeWidth={2.5} />
            </div>
            <span className="font-heading text-xl font-bold tracking-tight text-primary">
              Propgent
            </span>
          </Link>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-sm font-semibold text-primary hover:text-accent-foreground transition-colors">
            Home
          </Link>
          <Link href="/properties" className="text-sm font-semibold text-primary hover:text-accent-foreground transition-colors">
            Properties
          </Link>
          <Link href={aboutHref} className="text-sm font-semibold text-primary hover:text-accent-foreground transition-colors">
            About
          </Link>
          <Link href="/contact" className="text-sm font-semibold text-primary hover:text-accent-foreground transition-colors">
            Contact
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <Link 
            href="/properties" 
            className="hidden md:flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 active:scale-95 transition-all duration-200 shadow-sm hover:shadow-md"
          >
            <Search size={18} />
            Find Property
          </Link>
          
          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden flex items-center justify-center rounded-md p-2 text-primary hover:bg-muted active:scale-95 transition-transform"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-background border-b border-border shadow-lg py-4 px-6 flex flex-col gap-4 animate-in slide-in-from-top-2">
          <Link href="/" className="text-lg font-semibold text-primary hover:text-accent-foreground transition-colors py-2 border-b border-gray-100" onClick={() => setIsMobileMenuOpen(false)}>
            Home
          </Link>
          <Link href="/properties" className="text-lg font-semibold text-primary hover:text-accent-foreground transition-colors py-2 border-b border-gray-100" onClick={() => setIsMobileMenuOpen(false)}>
            Properties
          </Link>
          <Link href={aboutHref} className="text-lg font-semibold text-primary hover:text-accent-foreground transition-colors py-2 border-b border-gray-100" onClick={() => setIsMobileMenuOpen(false)}>
            About
          </Link>
          <Link href="/contact" className="text-lg font-semibold text-primary hover:text-accent-foreground transition-colors py-2 border-b border-gray-100" onClick={() => setIsMobileMenuOpen(false)}>
            Contact
          </Link>
          <Link 
            href="/properties" 
            className="flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 mt-2 text-base font-semibold text-primary-foreground hover:bg-primary/90 active:scale-95 transition-all shadow-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <Search size={18} />
            Find Property
          </Link>
        </div>
      )}
    </header>
  );
}
