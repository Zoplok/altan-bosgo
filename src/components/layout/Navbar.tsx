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
    <header className="sticky top-0 z-40 w-full bg-white/95 dark:bg-navy-900/95 backdrop-blur-md border-b border-gray-100 dark:border-navy-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Brand Logo & Name */}
        <Link href="/" className="flex items-center gap-3 group shrink-0">
          <div className="relative w-11 h-11 rounded-2xl overflow-hidden shadow-clay-btn dark:shadow-clay-card-dark ring-2 ring-gold/40 group-hover:ring-gold transition-all duration-300 transform group-hover:scale-105">
            <Image
              src="/images/logo.png"
              alt="Алтан босго лого"
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="flex flex-col">
            <span className="font-display font-black text-xl tracking-tight text-navy-900 dark:text-white leading-none group-hover:text-gold transition-colors">
              АЛТАН БОСГО
            </span>
            <span className="text-[11px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mt-1">
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
                className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition-all ${
                  isActive
                    ? 'text-navy-900 dark:text-gold bg-gold/15 dark:bg-gold/15 clay-pill border border-gold/30'
                    : 'text-gray-600 dark:text-gray-300 hover:text-navy-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-navy-800/60'
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
            className="p-2.5 rounded-xl text-gray-600 dark:text-gray-300 hover:text-navy-900 dark:hover:text-white clay-btn-surface transition-all"
            title="Хайлт хийх"
          >
            <Search className="w-4 h-4" />
          </Link>

          {/* Theme Toggle */}
          <ThemeToggle />

          {/* Compare Shortcut Badge */}
          {compareIds.length > 0 && (
            <Link
              href="/compare"
              className="relative p-2.5 rounded-xl text-gold-700 dark:text-gold clay-btn-surface transition-all"
              title="Харьцуулах сургуулиуд"
            >
              <Scale className="w-4 h-4" />
              <span className="absolute -top-1.5 -right-1.5 bg-gold text-navy-900 text-[10px] font-extrabold rounded-full w-5 h-5 flex items-center justify-center shadow-md border border-white dark:border-navy-900">
                {compareIds.length}
              </span>
            </Link>
          )}

          {/* User Auth CTA */}
          {user ? (
            <Link
              href="/dashboard"
              className="hidden sm:inline-flex items-center gap-2 pl-2 pr-3.5 py-1.5 rounded-xl clay-card dark:bg-navy-800 text-xs font-bold text-navy-900 dark:text-white hover:border-gold transition-all"
            >
              <div className="w-6 h-6 rounded-lg bg-gold/20 text-gold-700 dark:text-gold flex items-center justify-center font-black text-xs shadow-inner">
                {user.displayName.charAt(0).toUpperCase()}
              </div>
              <span className="truncate max-w-[120px]">{user.displayName}</span>
            </Link>
          ) : (
            <Link
              href="/auth/login"
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-xl clay-btn-gold text-sm shadow-sm transition-all"
            >
              <User className="w-4 h-4" />
              <span>Нэвтрэх</span>
            </Link>
          )}

          {/* Mobile Hamburger Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2.5 rounded-xl text-gray-700 dark:text-gray-200 clay-btn-surface transition-all"
            aria-label="Цэс нээх"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Slideout Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-gray-100 dark:border-navy-800 bg-white/95 dark:bg-navy-950/95 backdrop-blur-md px-4 pt-3 pb-6 shadow-2xl animate-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col space-y-1.5">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                    isActive
                      ? 'clay-pill bg-gold/15 text-gold-700 dark:text-gold font-bold border border-gold/30'
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
                  className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl clay-btn-navy text-sm"
                >
                  <User className="w-4 h-4 text-gold" />
                  <span>Миний хуудас ({user.displayName})</span>
                </Link>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  <Link
                    href="/auth/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-center py-2.5 rounded-xl clay-btn-surface text-sm font-bold"
                  >
                    Нэвтрэх
                  </Link>
                  <Link
                    href="/auth/register"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-center py-2.5 rounded-xl clay-btn-gold text-sm font-bold"
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
