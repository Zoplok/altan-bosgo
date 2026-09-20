'use client';

import React from 'react';
import Link from 'next/link';
import { UNIVERSITIES } from '@/lib/data';
import { Scale, ArrowRight, CheckCircle2, ShieldCheck } from 'lucide-react';

export const ComparePromo: React.FC = () => {
  const sampleUnis = [
    UNIVERSITIES.find((u) => u.id === 'num')!,
    UNIVERSITIES.find((u) => u.id === 'must')!,
    UNIVERSITIES.find((u) => u.id === 'mnums')!,
  ].filter(Boolean);

  return (
    <section className="py-16 bg-surface-light-subtle dark:bg-navy-950 border-t border-gray-100 dark:border-navy-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-gold block mb-1">
              Ухаалаг шийдвэр гаргалт
            </span>
            <h2 className="text-3xl font-display font-extrabold text-navy-900 dark:text-white">
              Их сургуулиудыг нэг матрицын дагуу харьцуулах
            </h2>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Хамгийн ихдээ 3 их сургуулийг сонгон төлбөр, босго оноо, байр, тэтгэлэг зэрэг 8 үзүүлэлтээр харьцуулаарай.
            </p>
          </div>

          <Link
            href="/compare"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl clay-btn-gold text-sm shadow transition-all shrink-0"
          >
            <Scale className="w-4 h-4" />
            <span>Шууд харьцуулах</span>
          </Link>
        </div>

        {/* Live Comparison Table Preview */}
        <div className="clay-card overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm border-collapse">
            <thead>
              <tr className="bg-gray-50/90 dark:bg-navy-950 border-b border-gray-200/80 dark:border-navy-800">
                <th className="p-4 font-bold text-gray-500 dark:text-gray-400 w-1/4">Үзүүлэлт</th>
                {sampleUnis.map((uni) => (
                  <th key={uni.id} className="p-4 font-bold text-navy-900 dark:text-white w-1/4">
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-sm sm:text-base text-navy-900 dark:text-gold">
                        {uni.shortName}
                      </span>
                      <span className="text-[10px] px-2.5 py-0.5 rounded-full clay-pill bg-gray-200 dark:bg-navy-800 text-gray-700 dark:text-gray-300 font-bold">
                        {uni.type}
                      </span>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-navy-800 text-navy-900 dark:text-gray-200">
              <tr>
                <td className="p-4 font-semibold text-gray-500 dark:text-gray-400">Байршил</td>
                {sampleUnis.map((u) => (
                  <td key={u.id} className="p-4 text-xs sm:text-sm">
                    {u.city}, {u.district} дүүрэг
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-4 font-semibold text-gray-500 dark:text-gray-400">Хөтөлбөрийн тоо</td>
                {sampleUnis.map((u) => (
                  <td key={u.id} className="p-4 font-bold">
                    {u.programCount} хөтөлбөр ({u.facultyCount} сургууль)
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-4 font-semibold text-gray-500 dark:text-gray-400">ЭЕШ Босго оноо</td>
                {sampleUnis.map((u) => (
                  <td key={u.id} className="p-4 font-extrabold text-gold">
                    {u.highlightScores.minScore}+ (Дундаж: {u.highlightScores.avgScore})
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-4 font-semibold text-gray-500 dark:text-gray-400">1 кредит / Төлбөр</td>
                {sampleUnis.map((u) => (
                  <td key={u.id} className="p-4">
                    <span className="font-bold">{u.tuitionSummary.creditPrice.toLocaleString()}₮</span>
                    <span className="block text-xs text-gray-400">
                      Жилд: {(u.tuitionSummary.annualTuitionFrom / 1000000).toFixed(1)} - {(u.tuitionSummary.annualTuitionTo / 1000000).toFixed(1)} сая₮
                    </span>
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-4 font-semibold text-gray-500 dark:text-gray-400">Дотуур байр</td>
                {sampleUnis.map((u) => (
                  <td key={u.id} className="p-4 text-xs">
                    {u.dormitory.available ? (
                      <span className="text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Байртай ({u.dormitory.capacity} суудал)
                      </span>
                    ) : (
                      <span className="text-gray-400">Байргүй</span>
                    )}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-4 font-semibold text-gray-500 dark:text-gray-400">Баталгаажуулалт</td>
                {sampleUnis.map((u) => (
                  <td key={u.id} className="p-4 text-xs">
                    <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                      ✓ Баталгаатай
                    </span>
                    <span className="block text-[11px] text-gray-400 mt-0.5">
                      {u.verification.lastUpdated}
                    </span>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};
