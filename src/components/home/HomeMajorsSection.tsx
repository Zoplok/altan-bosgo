'use client';

import React from 'react';
import Link from 'next/link';
import { MAJORS, getUniversityById } from '@/lib/data';
import { Compass, ArrowRight, CheckCircle, TrendingUp } from 'lucide-react';

export const HomeMajorsSection: React.FC = () => {
  const featuredMajors = MAJORS.slice(0, 4);

  return (
    <section className="py-16 bg-white dark:bg-navy-900 border-t border-gray-100 dark:border-navy-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-gold block mb-1">
              Мэргэжил сонголт
            </span>
            <h2 className="text-3xl font-display font-extrabold text-navy-900 dark:text-white">
              Ирээдүйд эрэлттэй мэргэжлүүд
            </h2>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Ямар хичээлээр ЭЕШ өгөх, ямар их сургуулиудад суралцах боломжтойг нэг дороос судлаарай.
            </p>
          </div>

          <Link
            href="/majors"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-navy-900 dark:text-gold hover:underline shrink-0"
          >
            <span>Бүх мэргэжлийг харах ({MAJORS.length})</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredMajors.map((major) => {
            const universities = major.offeringUniversityIds
              .map((id) => getUniversityById(id))
              .filter(Boolean);

            return (
              <div
                key={major.id}
                className="bg-surface-light-subtle dark:bg-navy-950 rounded-2xl border border-gray-200/80 dark:border-navy-800 p-5 shadow-sm hover:shadow-lg hover:border-gold transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-gold px-2.5 py-0.5 rounded-full bg-gold/10">
                      {major.category}
                    </span>
                    <div className="flex items-center gap-1 text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">
                      <TrendingUp className="w-3.5 h-3.5" />
                      <span>{major.trendScore}% эрэлттэй</span>
                    </div>
                  </div>

                  <h3 className="font-bold text-base text-navy-900 dark:text-white mb-2 line-clamp-1">
                    {major.name}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 leading-relaxed mb-4">
                    {major.description}
                  </p>

                  {/* Required Exams */}
                  <div className="mb-4">
                    <span className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold block mb-1">
                      Шаардлагатай ЭЕШ:
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {major.requiredExams.map((exam, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 rounded-md bg-white dark:bg-navy-900 border border-gray-200 dark:border-navy-700 text-[11px] font-medium text-navy-900 dark:text-gray-200"
                        >
                          {exam}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Offering Universities */}
                  <div>
                    <span className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold block mb-1">
                      Сургадаг их сургуулиуд:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {universities.map((u) => (
                        <span
                          key={u?.id}
                          className="text-[11px] font-semibold text-navy-800 dark:text-gray-300"
                        >
                          {u?.shortName} •
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-3 border-t border-gray-200/60 dark:border-navy-800/80">
                  <Link
                    href={`/majors?select=${major.id}`}
                    className="inline-flex items-center justify-between w-full text-xs font-bold text-navy-900 dark:text-gold hover:underline"
                  >
                    <span>Дэлгэрэнгүй & Сургуулиуд</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
