'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldCheck, CalendarCheck, Link2, CheckCircle } from 'lucide-react';

export const TrustSection: React.FC = () => {
  return (
    <section className="py-14 bg-gradient-to-r from-navy-950 via-navy-900 to-navy-950 text-white border-y border-navy-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold mb-3">
              <ShieldCheck className="w-4 h-4" />
              <span>Баталгаатай өгөгдлийн стандарт</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-white">
              Мэдээллийн найдвартай байдал
            </h2>
            <p className="mt-2 text-sm text-gray-300 leading-relaxed">
              Алтан босго нь боловсролын байгууллагуудын албан ёсны эх сурвалжид тулгуурлан мэдээллийг цуглуулж, тогтмол шинэчлэх зорилготой. Бид сургалтын төлбөр, элсэлтийн босго оноо зэрэг тоон үзүүлэлтүүдийг зохиож нийтэлдэггүй.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full lg:w-auto shrink-0">
            <div className="flex items-center gap-3 p-4 bg-navy-900/90 rounded-2xl border border-navy-700/80 shadow-[inset_-2px_-2px_6px_rgba(255,255,255,0.05),inset_2px_2px_6px_rgba(0,0,0,0.5),0_8px_16px_rgba(0,0,0,0.25)]">
              <div className="w-10 h-10 rounded-xl bg-gold/20 flex items-center justify-center shrink-0 border border-gold/40">
                <Link2 className="w-5 h-5 text-gold" />
              </div>
              <div>
                <span className="text-xs font-bold text-white block">✓ Эх сурвалжтай</span>
                <span className="text-[10px] text-gray-400">Шууд холбоос дагалдана</span>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-navy-900/90 rounded-2xl border border-navy-700/80 shadow-[inset_-2px_-2px_6px_rgba(255,255,255,0.05),inset_2px_2px_6px_rgba(0,0,0,0.5),0_8px_16px_rgba(0,0,0,0.25)]">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center shrink-0 border border-emerald-500/40">
                <CalendarCheck className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <span className="text-xs font-bold text-white block">✓ Шинэчлэгдсэн</span>
                <span className="text-[10px] text-gray-400">Огноог ил тод харуулна</span>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-navy-900/90 rounded-2xl border border-navy-700/80 shadow-[inset_-2px_-2px_6px_rgba(255,255,255,0.05),inset_2px_2px_6px_rgba(0,0,0,0.5),0_8px_16px_rgba(0,0,0,0.25)]">
              <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center shrink-0 border border-blue-500/40">
                <CheckCircle className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <span className="text-xs font-bold text-white block">✓ Баталгаажуулалт</span>
                <span className="text-[10px] text-gray-400">3 түвшний шалгалттай</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
