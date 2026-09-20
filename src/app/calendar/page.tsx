'use client';

import React, { useState } from 'react';
import { CALENDAR_EVENTS } from '@/lib/data';
import { Calendar, Clock, ExternalLink, Filter, CheckCircle } from 'lucide-react';

export default function CalendarPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = ['all', 'ЭЕШ', 'Их сургууль', 'Тэтгэлэг', 'Сургууль'];

  const filtered = selectedCategory === 'all'
    ? CALENDAR_EVENTS
    : CALENDAR_EVENTS.filter((e) => e.category === selectedCategory);

  return (
    <div className="bg-surface-light-subtle dark:bg-navy-950 min-h-screen py-10 transition-colors">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-8">
          <div className="flex items-center gap-2 text-xs font-bold text-gold uppercase tracking-wider mb-1">
            <Calendar className="w-4 h-4" />
            <span>Элсэлтийн цаг тооны бичиг</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-navy-900 dark:text-white tracking-tight">
            Элсэлтийн календарь 2026
          </h1>
          <p className="mt-2 text-sm sm:text-base text-gray-600 dark:text-gray-300">
            ЭЕШ-ын бүртгэл, шалгалт явагдах хугацаа, их сургуулиудын цахим бүртгэл, тэтгэлгийн сонгон шалгаруулалт болон хуваарь сонголтын албан ёсны товууд.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap items-center gap-2 mb-8 text-xs">
          <span className="font-bold text-gray-600 dark:text-gray-300 mr-1 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5 text-gold" /> Ангилал:
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-2xl transition-all text-xs ${
                selectedCategory === cat
                  ? 'clay-pill bg-navy-900 text-white dark:bg-gold dark:text-navy-950 font-extrabold shadow-sm'
                  : 'clay-btn-surface text-gray-700 dark:text-gray-300 font-semibold'
              }`}
            >
              {cat === 'all' ? 'Бүх үйл явдал' : cat}
            </button>
          ))}
        </div>

        {/* Vertical Timeline */}
        <div className="relative border-l-2 border-gold/40 ml-4 sm:ml-6 pl-6 sm:pl-8 space-y-8">
          {filtered.map((evt) => (
            <div key={evt.id} className="relative group">
              {/* Bullet */}
              <div
                className={`absolute -left-[32px] sm:-left-[41px] top-3 w-5 h-5 rounded-full border-2 border-white dark:border-navy-900 shadow-md ${
                  evt.status === 'ACTIVE'
                    ? 'bg-emerald-500 ring-4 ring-emerald-500/30 animate-pulse'
                    : 'bg-gold ring-4 ring-gold/20'
                }`}
              />

              <div className="clay-card clay-card-hover p-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm font-extrabold text-gold-700 dark:text-gold">
                      {evt.startDate} {evt.endDate ? `— ${evt.endDate}` : ''}
                    </span>
                    <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-lg clay-recessed text-gray-600 dark:text-gray-300">
                      {evt.category}
                    </span>
                  </div>

                  <span
                    className={`text-[10px] font-extrabold px-3 py-1 rounded-full shadow-inner self-start sm:self-auto ${
                      evt.status === 'ACTIVE'
                        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700/60'
                        : 'bg-blue-100 text-blue-800 dark:bg-blue-950/80 dark:text-blue-300 border border-blue-300 dark:border-blue-700/60'
                    }`}
                  >
                    {evt.status === 'ACTIVE' ? '● Идэвхтэй явагдаж байна' : 'Хүлээгдэж буй'}
                  </span>
                </div>

                <h3 className="text-base font-bold text-navy-900 dark:text-white mb-2 font-display">
                  {evt.title}
                </h3>

                <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed mb-4 font-medium">
                  {evt.description}
                </p>

                {evt.officialUrl && (
                  <div className="pt-3 border-t border-gray-100 dark:border-navy-800/80">
                    <a
                      href={evt.officialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-navy-900 dark:text-gold hover:text-gold transition-colors"
                    >
                      <span>Албан ёсны портал руу очих</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
