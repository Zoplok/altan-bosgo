import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/context/ThemeContext';
import { AuthProvider } from '@/context/AuthContext';
import { CompareProvider } from '@/context/CompareContext';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { MobileNav } from '@/components/layout/MobileNav';
import { CompareDrawer } from '@/components/comparison/CompareDrawer';

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-plus-jakarta',
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-inter',
  weight: ['400', '500', '600'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'АЛТАН БОСГО — Монголын Боловсролын Нэгдсэн Платформ',
  description:
    'Монголын их, дээд сургуулиуд, ЕБС сургууль, ЭЕШ босго оноо, сургалтын төлбөр, тэтгэлэг болон мэргэжил сонголтын нэгдсэн систем. Боловсролын бүх мэдээлэл — нэг дор.',
  keywords: [
    'Алтан босго',
    'Монголын их сургуулиуд',
    'Их сургуулийн элсэлт',
    'Их сургуулийн босго оноо',
    'Их сургуулийн төлбөр',
    'Монголын их дээд сургуулиуд',
    'Мэргэжил сонголт',
    'Тэтгэлэг',
    'ЕБС сургуулиуд',
    'ЭЕШ 2026',
  ],
  authors: [{ name: 'Алтан босго' }],
  icons: {
    icon: '/images/logo.png',
    apple: '/images/logo.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="mn" suppressHydrationWarning className={`${plusJakartaSans.variable} ${inter.variable}`}>
      <body className="min-h-screen flex flex-col font-body antialiased bg-white dark:bg-navy-950 text-navy-900 dark:text-gray-100 transition-colors">
        <ThemeProvider>
          <AuthProvider>
            <CompareProvider>
              <Navbar />
              <main className="flex-1 pb-16 lg:pb-0">{children}</main>
              <CompareDrawer />
              <MobileNav />
              <Footer />
            </CompareProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
