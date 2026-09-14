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
          <span className="font-semibold text-gray-500 dark:text-gray-400 mr-1 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" /> Ангилал:
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full transition-colors font-semibold ${
                selectedCategory === cat
                  ? 'bg-navy-900 text-white dark:bg-gold dark:text-navy-900 font-bold'
                  : 'bg-white dark:bg-navy-900 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-navy-800 hover:bg-gray-50'
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
                className={`absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full border-2 border-white dark:border-navy-900 ${
                  evt.status === 'ACTIVE'
                    ? 'bg-emerald-500 ring-4 ring-emerald-500/20 animate-pulse'
                    : 'bg-gold ring-4 ring-gold/20'
                }`}
              />

              <div className="bg-white dark:bg-navy-900 rounded-2xl border border-gray-200 dark:border-navy-800 p-5 shadow-sm hover:shadow-md hover:border-gold transition-all">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm font-extrabold text-gold">
                      {evt.startDate} {evt.endDate ? `— ${evt.endDate}` : ''}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-gray-100 dark:bg-navy-800 text-gray-600 dark:text-gray-300">
                      {evt.category}
                    </span>
                  </div>

                  <span
                    className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full self-start sm:self-auto ${
                      evt.status === 'ACTIVE'
                        ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                        : 'bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300'
                    }`}
                  >
                    {evt.status === 'ACTIVE' ? '● Идэвхтэй явагдаж байна' : 'Хүлээгдэж буй'}
                  </span>
                </div>

                <h3 className="text-base font-bold text-navy-900 dark:text-white mb-2">
                  {evt.title}
                </h3>

                <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed mb-3">
                  {evt.description}
                </p>

                {evt.officialUrl && (
                  <div className="pt-2 border-t border-gray-100 dark:border-navy-800">
                    <a
                      href={evt.officialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-gold hover:underline"
                    >
                      <span>Албан ёсны портал руу очих</span>
                      <ExternalLink className="w-3 h-3" />
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
