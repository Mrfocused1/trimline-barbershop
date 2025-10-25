import Link from 'next/link';
import { Scissors, Mail } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {/* Brand */}
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Scissors className="h-5 w-5" />
              <span className="text-lg font-bold">Trimline</span>
            </div>
            <p className="text-sm text-black">
              Premium barber services.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-3 text-sm font-semibold">Quick Links</h3>
            <ul className="space-y-1.5 text-sm">
              <li>
                <Link
                  href="/booking"
                  className="text-black hover:text-gray-600 transition-colors"
                >
                  Book Appointment
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-black hover:text-gray-600 transition-colors"
                >
                  Services
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-3 text-sm font-semibold">Contact</h3>
            <ul className="space-y-1.5 text-sm text-black">
              <li className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>logosbola@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-6 border-t pt-6 text-center text-sm text-black">
          <p>&copy; {currentYear} Trimline. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
