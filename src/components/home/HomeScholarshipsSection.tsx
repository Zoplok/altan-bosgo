'use client';

import React from 'react';
import Link from 'next/link';
import { SCHOLARSHIPS } from '@/lib/data';
import { VerificationBadge } from '@/components/ui/VerificationBadge';
import { Award, ArrowRight, Calendar, ExternalLink } from 'lucide-react';

export const HomeScholarshipsSection: React.FC = () => {
  const featured = SCHOLARSHIPS.slice(0, 3);

  return (
    <section className="py-16 bg-surface-light-subtle dark:bg-navy-950 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-gold block mb-1">
              Санхүүгийн дэмжлэг
            </span>
            <h2 className="text-3xl font-display font-extrabold text-navy-900 dark:text-white">
              Тэтгэлэг ба боломжууд
            </h2>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Монгол Улсын Засгийн газар, Ерөнхийлөгчийн тэтгэлэг болон дотоод, гадаадын тэтгэлэгт хөтөлбөрүүд.
            </p>
          </div>

          <Link
            href="/scholarships"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-navy-900 dark:text-gold hover:underline shrink-0"
          >
            <span>Бүх тэтгэлгийг үзэх ({SCHOLARSHIPS.length})</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featured.map((sch) => (
            <div
              key={sch.id}
              className="bg-white dark:bg-navy-900 rounded-2xl border border-gray-200/80 dark:border-navy-800 p-6 shadow-sm hover:shadow-xl hover:border-gold transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-purple-50 text-purple-700 dark:bg-purple-950 dark:text-purple-300">
                    {sch.category}
                  </span>
                  <VerificationBadge verification={sch.verification} size="sm" />
                </div>

                <h3 className="font-bold text-base text-navy-900 dark:text-white mb-1.5 line-clamp-2">
                  {sch.title}
                </h3>
                <p className="text-xs text-gray-400 mb-3">{sch.organization}</p>

                <div className="p-3 bg-gray-50 dark:bg-navy-950 rounded-xl border border-gray-100 dark:border-navy-800/80 mb-4 text-xs">
                  <span className="font-semibold text-gold block mb-1">Хамрах хүрээ:</span>
                  <p className="text-gray-600 dark:text-gray-300 line-clamp-2 leading-relaxed">
                    {sch.coverage}
                  </p>
                </div>

                <div className="text-xs text-gray-500 dark:text-gray-400 space-y-1">
                  <div>
                    <span className="font-semibold text-navy-900 dark:text-gray-200">Хэн хамрагдах:</span>{' '}
                    {sch.targetAudience}
                  </div>
                  <div className="flex items-center gap-1 text-gold-700 dark:text-gold font-medium pt-1">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Эцсийн хугацаа: {sch.deadline}</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-100 dark:border-navy-800 flex items-center justify-between">
                <Link
                  href="/scholarships"
                  className="text-xs font-bold text-navy-900 dark:text-white hover:text-gold"
                >
                  Шаардлага үзэх
                </Link>
                <a
                  href={sch.applyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-bold text-gold hover:underline"
                >
                  <span>Материал илгээх</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
