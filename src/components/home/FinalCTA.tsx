'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, GraduationCap, ArrowRight } from 'lucide-react';

export const FinalCTA: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-surface-light-subtle dark:from-navy-900 dark:to-navy-950 relative overflow-hidden transition-colors">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <div className="relative w-16 h-16 rounded-2xl overflow-hidden shadow-md ring-2 ring-gold/40 mx-auto mb-6">
          <Image
            src="/images/logo.png"
            alt="Алтан босго"
            fill
            className="object-cover"
          />
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-navy-900 dark:text-white tracking-tight mb-4 leading-tight">
          Ирээдүйн боловсролын зөв сонголтоо <br />
          <span className="text-gold">АЛТАН БОСГО</span> системээр эхлүүлээрэй.
        </h2>

        <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8 font-normal">
          Монголын бүх их, дээд сургууль, ЕБС сургуулиудын элсэлтийн босго оноо, сургалтын төлбөр, тэтгэлэг болон мэргэжлийн мэдээлэл нэг дороос.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3.5">
          <Link
            href="/universities"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-gold hover:bg-gold-400 text-navy-900 font-bold text-base shadow-lg transition-all hover:scale-105"
          >
            <GraduationCap className="w-5 h-5" />
            <span>Их сургуулиудтай танилцах</span>
          </Link>

          <Link
            href="/auth/register"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-navy-900 hover:bg-navy-800 text-white font-semibold text-base shadow-md transition-all hover:scale-105 dark:bg-white dark:text-navy-900 dark:hover:bg-gray-100"
          >
            <span>Оюутан / Сурагчаар бүртгүүлэх</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};
