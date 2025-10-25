'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Scissors, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { MagneticButton } from '@/components/shared/MagneticButton';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Live', href: '/live' },
  { name: 'Book', href: '/booking' },
  { name: 'Contact', href: '/about' },
];

export function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <Scissors className="h-6 w-6" />
          <span className="text-xl font-bold">Trimline</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'text-sm font-medium transition-colors hover:text-primary',
                pathname === item.href
                  ? 'text-foreground'
                  : 'text-black'
              )}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Right Side - CTA Button and Mobile Menu Toggle */}
        <div className="flex items-center space-x-4">
          {/* Desktop Book Now Button */}
          <div className="hidden md:block">
            <MagneticButton asChild>
              <Link href="/booking">Book Now</Link>
            </MagneticButton>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-black hover:bg-gray-100 rounded-md transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Menu Drawer */}
      <div
        className={cn(
          'md:hidden fixed top-0 left-0 h-full w-64 bg-white z-50 transform transition-transform duration-300 ease-in-out',
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <nav className="flex flex-col p-6 space-y-6">
          {/* Close Button */}
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="self-end p-2 text-black hover:bg-gray-100 rounded-md transition-colors"
            aria-label="Close menu"
          >
            <X className="h-6 w-6" />
          </button>

          {/* Navigation Links */}
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className={cn(
                'text-lg font-medium transition-colors py-2',
                pathname === item.href
                  ? 'text-black font-bold'
                  : 'text-black hover:text-gray-600'
              )}
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
