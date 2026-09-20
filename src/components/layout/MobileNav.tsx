'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Home, Search, GraduationCap, Bookmark, User } from 'lucide-react';

export const MobileNav: React.FC = () => {
  const pathname = usePathname();
  const { user } = useAuth();

  const items = [
    { href: '/', label: 'Нүүр', icon: Home, exact: true },
    { href: '/#search-section', label: 'Хайх', icon: Search },
    { href: '/universities', label: 'Сургууль', icon: GraduationCap },
    { href: user ? '/dashboard' : '/auth/login', label: 'Хадгалсан', icon: Bookmark },
    { href: user ? '/dashboard' : '/auth/login', label: 'Профайл', icon: User },
  ];

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-navy-950/95 backdrop-blur-md border-t border-gray-200/80 dark:border-navy-800/80 px-3 py-2 shadow-[0_-8px_20px_-4px_rgba(15,23,42,0.08)] dark:shadow-[0_-8px_25px_-4px_rgba(0,0,0,0.6)]">
      <nav className="flex items-center justify-around">
        {items.map((item, idx) => {
          const Icon = item.icon;
          const isActive = item.exact ? pathname === item.href : pathname.startsWith(item.href) && item.href !== '/';
          return (
            <Link
              key={idx}
              href={item.href}
              className={`flex flex-col items-center justify-center py-1.5 px-3 rounded-2xl transition-all ${
                isActive
                  ? 'clay-pill bg-gold/15 text-gold-700 dark:text-gold font-bold border border-gold/40'
                  : 'text-gray-500 dark:text-gray-400 hover:text-navy-900 dark:hover:text-white'
              }`}
            >
              <Icon className="w-5 h-5 mb-0.5" />
              <span className="text-[10px] tracking-tight">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};
