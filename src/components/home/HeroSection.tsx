'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, GraduationCap, Scale, ShieldCheck, Sparkles, Award, ArrowUpRight } from 'lucide-react';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-surface-light-subtle via-white to-surface-light-subtle dark:from-navy-950 dark:via-navy-900 dark:to-navy-950 pt-10 pb-20 transition-colors">
      {/* Subtle Background Glows */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-tr from-gold/15 via-gold/5 to-transparent blur-3xl rounded-full pointer-events-none" />
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-blue-500/5 blur-3xl rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Trust Capsule */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white dark:bg-navy-800 border border-gold/30 shadow-sm text-xs font-medium text-navy-900 dark:text-gray-200">
            <span className="flex h-2 w-2 rounded-full bg-gold animate-pulse" />
            <span className="font-semibold text-gold-700 dark:text-gold">Албан ёсны нэгдсэн сан</span>
            <span className="text-gray-400">|</span>
            <span>Монголын сурагч, оюутан бүрт зориулсан</span>
          </div>
        </div>

        {/* Headline & Subtitle */}
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-navy-900 dark:text-white leading-[1.15] mb-5">
            Боловсролын бүх мэдээлэл — <br className="hidden sm:inline" />
            <span className="relative inline-block text-gold">
              нэг дор.
              <svg
                className="absolute -bottom-2 left-0 w-full h-2 text-gold/40"
                viewBox="0 0 100 8"
                preserveAspectRatio="none"
              >
                <path d="M0,5 Q50,0 100,5" fill="none" stroke="currentColor" strokeWidth="3" />
              </svg>
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto font-normal leading-relaxed mb-8">
            Бага, дунд, ахлах ангиас эхлээд их, дээд сургууль хүртэл. Танд хэрэгтэй боловсролын мэдээллийг нэг платформоос хайж, харьцуулж, ирээдүйн зөв сонголтоо хийгээрэй.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3.5 mb-6">
            <a
              href="#search-section"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gold hover:bg-gold-400 text-navy-900 font-bold text-base shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5"
            >
              <Search className="w-5 h-5" />
              <span>Сургууль хайх</span>
            </a>

            <Link
              href="/universities"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-navy-900 hover:bg-navy-800 text-white font-semibold text-base shadow-sm hover:shadow transition-all transform hover:-translate-y-0.5 dark:bg-white dark:text-navy-900 dark:hover:bg-gray-100"
            >
              <GraduationCap className="w-5 h-5 text-gold" />
              <span>Их, дээд сургуулиуд үзэх</span>
            </Link>

            <Link
              href="/compare"
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-white dark:bg-navy-800 border border-gray-200 dark:border-navy-700 hover:border-gold text-navy-900 dark:text-gray-200 font-semibold text-base transition-colors"
            >
              <Scale className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              <span>Харьцуулах систем</span>
            </Link>
          </div>

          <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center justify-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>Зөв мэдээлэл. Зөв сонголт. Таны ирээдүй.</span>
          </div>
        </div>

        {/* Hero Interactive Dashboard Mockup */}
        <div className="mt-14 max-w-5xl mx-auto">
          <div className="relative rounded-2xl bg-white dark:bg-navy-800/90 border border-gray-200/80 dark:border-navy-700 shadow-2xl overflow-hidden backdrop-blur">
            {/* Window Top Controls */}
            <div className="flex items-center justify-between px-4 py-3 bg-gray-50/80 dark:bg-navy-900/80 border-b border-gray-200/60 dark:border-navy-700/80">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-400 inline-block" />
                <span className="w-3 h-3 rounded-full bg-amber-400 inline-block" />
                <span className="w-3 h-3 rounded-full bg-emerald-400 inline-block" />
              </div>
              <div className="flex items-center gap-2 px-3 py-1 rounded-md bg-white dark:bg-navy-950 border border-gray-200 dark:border-navy-800 text-xs text-gray-500 font-mono">
                <span className="text-gold">https://</span>altanbosgo.mn/universities
              </div>
              <div className="flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Verified Data</span>
              </div>
            </div>

            {/* Dashboard Content Mockup */}
            <div className="p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
              {/* Left Column: Quick Search Card & Filters */}
              <div className="bg-surface-light-subtle dark:bg-navy-950/60 rounded-xl p-4 border border-gray-100 dark:border-navy-800">
                <div className="flex items-center gap-2 mb-3">
                  <div className="relative w-7 h-7 rounded-md overflow-hidden ring-1 ring-gold/40">
                    <Image src="/images/logo.png" alt="Logo" fill className="object-cover" />
                  </div>
                  <div>
                    <span className="font-bold text-xs text-navy-900 dark:text-white block leading-none">
                      АЛТАН БОСГО
                    </span>
                    <span className="text-[10px] text-gray-400">Шүүлтүүр & Лавлах</span>
                  </div>
                </div>

                <div className="space-y-2.5 text-xs">
                  <div className="p-2 bg-white dark:bg-navy-900 rounded-lg border border-gray-200 dark:border-navy-700 flex justify-between items-center">
                    <span className="text-gray-500">Байршил</span>
                    <span className="font-semibold text-navy-900 dark:text-white">Улаанбаатар</span>
                  </div>
                  <div className="p-2 bg-white dark:bg-navy-900 rounded-lg border border-gray-200 dark:border-navy-700 flex justify-between items-center">
                    <span className="text-gray-500">Төрөл</span>
                    <span className="font-semibold text-navy-900 dark:text-white">Төрийн & Хувийн</span>
                  </div>
                  <div className="p-2 bg-white dark:bg-navy-900 rounded-lg border border-gray-200 dark:border-navy-700 flex justify-between items-center">
                    <span className="text-gray-500">ЭЕШ босго</span>
                    <span className="font-bold text-gold">480 - 650+</span>
                  </div>
                  <div className="p-2.5 bg-gold/10 rounded-lg border border-gold/30 text-navy-900 dark:text-gold flex items-center justify-between font-bold">
                    <span>Илэрц</span>
                    <span>12 Их сургууль, 138 Мэргэжил</span>
                  </div>
                </div>
              </div>

              {/* Middle & Right Column: Top University Live Comparison Tiles */}
              <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {/* Tile 1: МУИС */}
                <div className="bg-white dark:bg-navy-900 rounded-xl p-4 border border-gray-200 dark:border-navy-700 shadow-sm hover:border-gold transition-colors">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <span className="inline-block text-[10px] font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300 mb-1">
                        Төрийн өмчит
                      </span>
                      <h4 className="font-bold text-sm text-navy-900 dark:text-white">МУИС</h4>
                      <p className="text-[11px] text-gray-500">Монгол Улсын Их Сургууль</p>
                    </div>
                    <span className="text-emerald-600 dark:text-emerald-400 text-xs font-semibold">
                      ✓ Баталгаатай
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 my-3 pt-2 border-t border-gray-100 dark:border-navy-800 text-xs">
                    <div>
                      <span className="text-[10px] text-gray-400 block">Босго оноо:</span>
                      <span className="font-extrabold text-navy-900 dark:text-white text-sm">620+</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-gray-400 block">1 кредит:</span>
                      <span className="font-extrabold text-gold text-sm">118,400₮</span>
                    </div>
                  </div>

                  <div className="text-[11px] text-gray-500 dark:text-gray-400 flex items-center justify-between">
                    <span>138 хөтөлбөр</span>
                    <span className="text-gold font-semibold flex items-center">
                      Дэлгэрэнгүй <ArrowUpRight className="w-3 h-3 ml-0.5" />
                    </span>
                  </div>
                </div>

                {/* Tile 2: ШУТИС */}
                <div className="bg-white dark:bg-navy-900 rounded-xl p-4 border border-gray-200 dark:border-navy-700 shadow-sm hover:border-gold transition-colors">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <span className="inline-block text-[10px] font-bold px-2 py-0.5 rounded bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300 mb-1">
                        Инженер технологи
                      </span>
                      <h4 className="font-bold text-sm text-navy-900 dark:text-white">ШУТИС</h4>
                      <p className="text-[11px] text-gray-500">Шинжлэх Ухаан Технологи</p>
                    </div>
                    <span className="text-emerald-600 dark:text-emerald-400 text-xs font-semibold">
                      ✓ Баталгаатай
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 my-3 pt-2 border-t border-gray-100 dark:border-navy-800 text-xs">
                    <div>
                      <span className="text-[10px] text-gray-400 block">Босго оноо:</span>
                      <span className="font-extrabold text-navy-900 dark:text-white text-sm">560 - 600+</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-gray-400 block">1 кредит:</span>
                      <span className="font-extrabold text-gold text-sm">104,500₮</span>
                    </div>
                  </div>

                  <div className="text-[11px] text-gray-500 dark:text-gray-400 flex items-center justify-between">
                    <span>112 хөтөлбөр</span>
                    <span className="text-gold font-semibold flex items-center">
                      Дэлгэрэнгүй <ArrowUpRight className="w-3 h-3 ml-0.5" />
                    </span>
                  </div>
                </div>

                {/* Bottom Banner inside Mockup: News & Calendar ticker */}
                <div className="sm:col-span-2 bg-gradient-to-r from-gold/10 via-gold/5 to-transparent p-3 rounded-xl border border-gold/30 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 text-navy-900 dark:text-gray-200">
                    <Sparkles className="w-4 h-4 text-gold shrink-0" />
                    <span className="font-medium">
                      <strong>2026 ЭЕШ-ын бүртгэл</strong> 04.15 - 05.15 хооронд явагдаж байна.
                    </span>
                  </div>
                  <Link href="/calendar" className="text-gold-700 dark:text-gold font-bold hover:underline shrink-0">
                    Календарь харах →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
