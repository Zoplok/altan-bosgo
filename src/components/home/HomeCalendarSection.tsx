'use client';

import React from 'react';
import Link from 'next/link';
import { CALENDAR_EVENTS } from '@/lib/data';
import { Calendar, Clock, ArrowRight, ExternalLink } from 'lucide-react';

export const HomeCalendarSection: React.FC = () => {
  const events = CALENDAR_EVENTS.slice(0, 4);

  return (
    <section className="py-16 bg-surface-light-subtle dark:bg-navy-950 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-gold block mb-1">
              Цаг тооны бичиг
            </span>
            <h2 className="text-3xl font-display font-extrabold text-navy-900 dark:text-white">
              Элсэлтийн календарь & Чухал товууд
            </h2>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              ЭЕШ шалгалт, их сургуулийн цахим бүртгэл болон хуваарь сонголтын гол хугацаанууд.
            </p>
          </div>

          <Link
            href="/calendar"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-navy-900 dark:text-gold hover:underline shrink-0"
          >
            <span>Бүх хуанли харах ({CALENDAR_EVENTS.length})</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {events.map((evt) => (
            <div
              key={evt.id}
              className="bg-white dark:bg-navy-900 rounded-2xl border border-gray-200/80 dark:border-navy-800 p-5 shadow-sm hover:shadow-md hover:border-gold transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      evt.status === 'ACTIVE'
                        ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400'
                        : 'bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-400'
                    }`}
                  >
                    {evt.status === 'ACTIVE' ? '● Идэвхтэй явагдаж байна' : 'Хүлээгдэж буй'}
                  </span>
                  <span className="text-[10px] font-semibold text-gray-400">{evt.category}</span>
                </div>

                <div className="flex items-center gap-1.5 text-gold-700 dark:text-gold text-xs font-extrabold mb-1.5">
                  <Calendar className="w-4 h-4" />
                  <span>
                    {evt.startDate} {evt.endDate ? `- ${evt.endDate}` : ''}
                  </span>
                </div>

                <h3 className="font-bold text-sm text-navy-900 dark:text-white mb-2 line-clamp-2">
                  {evt.title}
                </h3>

                <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-3 leading-relaxed">
                  {evt.description}
                </p>
              </div>

              {evt.officialUrl && (
                <div className="mt-4 pt-3 border-t border-gray-100 dark:border-navy-800">
                  <a
                    href={evt.officialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-gray-600 dark:text-gray-300 hover:text-gold"
                  >
                    <span>Албан ёсны систем</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
