'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { useAuth } from '@/context/AuthContext';
import { useCompare } from '@/context/CompareContext';
import {
  Search,
  Menu,
  X,
  User,
  Scale,
  GraduationCap,
  School as SchoolIcon,
  Compass,
  Award,
  Newspaper,
  Info,
  Calendar,
  ShieldCheck,
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const { user } = useAuth();
  const { compareIds } = useCompare();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);

  const navLinks = [
    { href: '/', label: 'Нүүр' },
    { href: '/universities', label: 'Их, дээд сургууль' },
    { href: '/schools', label: 'ЕБС' },
    { href: '/majors', label: 'Мэргэжил' },
    { href: '/scholarships', label: 'Тэтгэлэг' },
    { href: '/calendar', label: 'Календарь' },
    { href: '/news', label: 'Мэдээ' },
    { href: '/about', label: 'Бидний тухай' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 dark:bg-navy-900/95 backdrop-blur-md border-b border-gray-100 dark:border-navy-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Brand Logo & Name */}
        <Link href="/" className="flex items-center gap-3 group shrink-0">
          <div className="relative w-11 h-11 rounded-xl overflow-hidden shadow-sm ring-1 ring-gold/30 group-hover:ring-gold transition-all duration-300">
            <Image
              src="/images/logo.png"
              alt="Алтан босго лого"
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="flex flex-col">
            <span className="font-display font-bold text-xl tracking-tight text-navy-900 dark:text-white leading-none group-hover:text-gold transition-colors">
              АЛТАН БОСГО
            </span>
            <span className="text-[11px] font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mt-1">
              Боловсролын нэгдсэн сан
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? 'text-navy-900 dark:text-gold font-semibold bg-gray-50 dark:bg-navy-800/80 shadow-sm'
                    : 'text-gray-600 dark:text-gray-300 hover:text-navy-900 dark:hover:text-white hover:bg-gray-50/80 dark:hover:bg-navy-800/50'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Action Icons */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick Search Button */}
          <Link
            href="/#search-section"
            className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:text-navy-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-navy-800 transition-colors"
            title="Хайлт хийх"
          >
            <Search className="w-5 h-5" />
          </Link>

          {/* Theme Toggle */}
          <ThemeToggle />

          {/* Compare Shortcut Badge */}
          {compareIds.length > 0 && (
            <Link
              href="/compare"
              className="relative p-2 rounded-lg text-gold-600 dark:text-gold hover:bg-gold-50 dark:hover:bg-navy-800 transition-colors"
              title="Харьцуулах сургуулиуд"
            >
              <Scale className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 bg-gold text-navy-900 text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-sm">
                {compareIds.length}
              </span>
            </Link>
          )}

          {/* User Auth CTA */}
          {user ? (
            <Link
              href="/dashboard"
              className="hidden sm:inline-flex items-center gap-2 pl-2 pr-3.5 py-1.5 rounded-lg bg-gray-50 dark:bg-navy-800 border border-gray-200 dark:border-navy-700 text-xs font-semibold text-navy-900 dark:text-white hover:border-gold transition-colors"
            >
              <div className="w-6 h-6 rounded-full bg-gold/20 text-gold-700 dark:text-gold flex items-center justify-center font-bold text-xs">
                {user.displayName.charAt(0).toUpperCase()}
              </div>
              <span>{user.displayName}</span>
            </Link>
          ) : (
            <Link
              href="/auth/login"
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-gold text-navy-900 font-semibold text-sm shadow-sm hover:bg-gold-400 transition-all hover:-translate-y-0.5"
            >
              <User className="w-4 h-4" />
              <span>Нэвтрэх</span>
            </Link>
          )}

          {/* Mobile Hamburger Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-navy-800 transition-colors"
            aria-label="Цэс нээх"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Slideout Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-gray-100 dark:border-navy-800 bg-white dark:bg-navy-950 px-4 pt-3 pb-6 shadow-xl animate-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-gold/10 text-gold-700 dark:text-gold font-bold'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-navy-900'
                  }`}
                >
                  <span>{link.label}</span>
                </Link>
              );
            })}

            <div className="pt-3 mt-2 border-t border-gray-100 dark:border-navy-800 flex flex-col gap-2">
              {user ? (
                <Link
                  href="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg bg-navy-900 dark:bg-navy-800 text-white font-medium text-sm"
                >
                  <User className="w-4 h-4 text-gold" />
                  <span>Миний хуудас ({user.displayName})</span>
                </Link>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  <Link
                    href="/auth/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-center py-2.5 rounded-lg border border-gray-300 dark:border-navy-700 text-gray-800 dark:text-gray-200 text-sm font-medium"
                  >
                    Нэвтрэх
                  </Link>
                  <Link
                    href="/auth/register"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-center py-2.5 rounded-lg bg-gold text-navy-900 text-sm font-bold shadow-sm"
                  >
                    Бүртгүүлэх
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
