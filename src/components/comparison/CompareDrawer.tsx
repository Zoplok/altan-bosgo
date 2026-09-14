'use client';

import React from 'react';
import Link from 'next/link';
import { useCompare } from '@/context/CompareContext';
import { getUniversityById } from '@/lib/data';
import { Scale, X, ArrowRight } from 'lucide-react';

export const CompareDrawer: React.FC = () => {
  const { compareIds, removeUniversity, clearComparison } = useCompare();

  if (compareIds.length === 0) return null;

  const universities = compareIds
    .map((id) => getUniversityById(id))
    .filter(Boolean);

  return (
    <div className="fixed bottom-14 lg:bottom-4 left-1/2 -translate-x-1/2 z-30 w-[95%] max-w-2xl bg-white dark:bg-navy-900 border border-gold/40 shadow-2xl rounded-2xl p-3 sm:p-4 backdrop-blur-md animate-in slide-in-from-bottom-5 duration-300">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gold/20 text-gold-700 dark:text-gold flex items-center justify-center shrink-0">
            <Scale className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-bold text-navy-900 dark:text-white flex items-center gap-1.5">
              <span>Харьцуулах сургуулиуд</span>
              <span className="px-1.5 py-0.2 bg-gold text-navy-900 rounded-full text-[10px] font-extrabold">
                {compareIds.length}/3
              </span>
            </div>
            <div className="text-[11px] text-gray-500 dark:text-gray-400 hidden sm:block">
              Хамгийн ихдээ 3 их сургуулийг нэг матрицаар харьцуулна
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={clearComparison}
            className="text-xs text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400 px-2 py-1 transition-colors"
          >
            Цэвэрлэх
          </button>
          <Link
            href="/compare"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-gold hover:bg-gold-400 text-navy-900 text-xs font-bold shadow transition-all hover:scale-105"
          >
            <span>Харьцуулах</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Selected Items Row */}
      <div className="flex items-center gap-2 mt-2.5 overflow-x-auto pb-1 pt-0.5">
        {universities.map((uni) => {
          if (!uni) return null;
          return (
            <div
              key={uni.id}
              className="flex items-center gap-2 bg-gray-50 dark:bg-navy-800 border border-gray-200 dark:border-navy-700 rounded-lg px-2.5 py-1 text-xs shrink-0"
            >
              <span className="font-semibold text-navy-900 dark:text-white truncate max-w-[130px]">
                {uni.shortName || uni.name}
              </span>
              <button
                onClick={() => removeUniversity(uni.id)}
                className="text-gray-400 hover:text-red-500"
                title="Хасах"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
