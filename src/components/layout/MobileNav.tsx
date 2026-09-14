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
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-navy-950/95 backdrop-blur-lg border-t border-gray-200 dark:border-navy-800 px-3 py-1.5 shadow-lg">
      <nav className="flex items-center justify-around">
        {items.map((item, idx) => {
          const Icon = item.icon;
          const isActive = item.exact ? pathname === item.href : pathname.startsWith(item.href) && item.href !== '/';
          return (
            <Link
              key={idx}
              href={item.href}
              className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-lg transition-colors ${
                isActive
                  ? 'text-gold dark:text-gold font-bold'
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
