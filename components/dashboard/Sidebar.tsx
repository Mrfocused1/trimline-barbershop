'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Calendar,
  Scissors,
  Clock,
  BookOpen,
  Image,
  Settings,
  Home,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navigation = [
  { name: 'Overview', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Bookings', href: '/dashboard/bookings', icon: BookOpen },
  { name: 'Services', href: '/dashboard/services', icon: Scissors },
  { name: 'Availability', href: '/dashboard/availability', icon: Clock },
  { name: 'Gallery', href: '/dashboard/gallery', icon: Image },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 border-r bg-muted/50 p-6 hidden md:block">
      <div className="mb-8">
        <Link
          href="/"
          className="flex items-center space-x-2 text-sm text-black hover:text-foreground transition-colors"
        >
          <Home className="h-4 w-4" />
          <span>Back to Site</span>
        </Link>
      </div>

      <div className="mb-4">
        <h2 className="text-lg font-semibold">Dashboard</h2>
        <p className="text-sm text-black">Manage your business</p>
      </div>

      <nav className="space-y-1">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center space-x-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-primary text-white'
                  : 'hover:bg-accent hover:text-white'
              )}
            >
              <Icon className="h-4 w-4" />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
