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
    <div className="fixed bottom-16 lg:bottom-6 left-1/2 -translate-x-1/2 z-40 w-[95%] max-w-2xl clay-card border-gold/40 p-3 sm:p-4 backdrop-blur-xl animate-in slide-in-from-bottom-5 duration-300">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gold/20 text-gold-700 dark:text-gold flex items-center justify-center shrink-0 border border-gold/30 shadow-inner">
            <Scale className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-bold text-navy-900 dark:text-white flex items-center gap-1.5">
              <span>Харьцуулах сургуулиуд</span>
              <span className="px-2 py-0.5 bg-gold text-navy-950 rounded-full text-[10px] font-extrabold shadow-sm">
                {compareIds.length}/3
              </span>
            </div>
            <div className="text-[11px] text-gray-500 dark:text-gray-400 hidden sm:block">
              Хамгийн ихдээ 3 их сургуулийг зэрэгцүүлэн харьцуулна
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={clearComparison}
            className="text-xs font-semibold text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400 px-2.5 py-1.5 rounded-xl transition-colors"
          >
            Цэвэрлэх
          </button>
          <Link
            href="/compare"
            className="clay-btn-gold px-4 py-2 rounded-xl text-navy-950 text-xs font-extrabold inline-flex items-center gap-1.5"
          >
            <span>Харьцуулах</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Selected Items Row */}
      <div className="flex items-center gap-2 mt-3 overflow-x-auto pb-1 pt-0.5">
        {universities.map((uni) => {
          if (!uni) return null;
          return (
            <div
              key={uni.id}
              className="clay-pill flex items-center gap-2 px-3 py-1 text-xs shrink-0 bg-white/80 dark:bg-navy-800/80"
            >
              <span className="font-bold text-navy-900 dark:text-white truncate max-w-[130px]">
                {uni.shortName || uni.name}
              </span>
              <button
                onClick={() => removeUniversity(uni.id)}
                className="text-gray-400 hover:text-red-500 transition-colors p-0.5"
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
