'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { UNIVERSITIES } from '@/lib/data';
import { VerificationBadge } from '@/components/ui/VerificationBadge';
import { useCompare } from '@/context/CompareContext';
import { useAuth } from '@/context/AuthContext';
import { MapPin, BookOpen, Scale, ArrowRight, Bookmark, Check } from 'lucide-react';

export const PopularUnis: React.FC = () => {
  const { addUniversity, removeUniversity, isComparing } = useCompare();
  const { toggleSaveUniversity, isSavedUniversity } = useAuth();

  const featured = UNIVERSITIES.slice(0, 6);

  return (
    <section className="py-16 bg-white dark:bg-navy-900 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-gold block mb-1">
              Тэргүүлэх их сургуулиуд
            </span>
            <h2 className="text-3xl font-display font-extrabold text-navy-900 dark:text-white">
              Монголын эрэлттэй их, дээд сургуулиуд
            </h2>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Албан ёсны магадлан итгэмжлэгдсэн, элсэлтийн босго оноо болон төлбөрийн баталгаажсан мэдээлэл.
            </p>
          </div>

          <Link
            href="/universities"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-navy-900 dark:text-gold hover:underline shrink-0"
          >
            <span>Бүх их сургуулийг харах ({UNIVERSITIES.length})</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* University Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((uni) => {
            const comparing = isComparing(uni.id);
            const saved = isSavedUniversity(uni.id);

            return (
              <div
                key={uni.id}
                className="bg-surface-light-subtle dark:bg-navy-950 rounded-2xl border border-gray-200/80 dark:border-navy-800 p-5 shadow-sm hover:shadow-xl hover:border-gold/60 dark:hover:border-gold/60 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Top Bar: Type, Verification & Bookmark */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span
                      className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                        uni.type === 'Төрийн'
                          ? 'bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300'
                          : uni.type === 'Хамтарсан'
                          ? 'bg-purple-50 text-purple-700 dark:bg-purple-950 dark:text-purple-300'
                          : 'bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300'
                      }`}
                    >
                      {uni.type} өмчит
                    </span>

                    <div className="flex items-center gap-1.5">
                      <VerificationBadge verification={uni.verification} size="sm" />
                      <button
                        onClick={() => toggleSaveUniversity(uni.id)}
                        className={`p-1.5 rounded-lg border transition-colors ${
                          saved
                            ? 'bg-gold/10 border-gold text-gold-700 dark:text-gold'
                            : 'border-gray-200 dark:border-navy-700 text-gray-400 hover:text-navy-900 dark:hover:text-white'
                        }`}
                        title={saved ? 'Хадгалсан жагсаалтаас хасах' : 'Хадгалах'}
                      >
                        <Bookmark className={`w-3.5 h-3.5 ${saved ? 'fill-current' : ''}`} />
                      </button>
                    </div>
                  </div>

                  {/* Header: Logo & Title */}
                  <Link href={`/universities/${uni.id}`} className="flex items-start gap-3.5 group mb-3">
                    <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-white dark:bg-navy-900 border border-gray-100 dark:border-navy-800 shrink-0 shadow-sm">
                      <Image
                        src={uni.logo}
                        alt={uni.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <div>
                      <h3 className="font-bold text-base text-navy-900 dark:text-white group-hover:text-gold transition-colors line-clamp-1">
                        {uni.shortName}
                      </h3>
                      <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-1">
                        {uni.name}
                      </p>
                      <div className="flex items-center gap-1 text-[11px] text-gray-500 mt-1">
                        <MapPin className="w-3 h-3 text-gray-400 shrink-0" />
                        <span className="truncate">{uni.location}</span>
                      </div>
                    </div>
                  </Link>

                  {/* Metrics Grid */}
                  <div className="grid grid-cols-3 gap-2 py-3 px-3 bg-white dark:bg-navy-900 rounded-xl border border-gray-100 dark:border-navy-800 text-center my-3">
                    <div>
                      <span className="text-[10px] text-gray-400 block">Босго оноо</span>
                      <span className="text-xs font-bold text-navy-900 dark:text-white">
                        {uni.highlightScores.minScore}+
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] text-gray-400 block">1 кредит</span>
                      <span className="text-xs font-bold text-gold">
                        {(uni.tuitionSummary.creditPrice / 1000).toFixed(0)}k₮
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] text-gray-400 block">Хөтөлбөр</span>
                      <span className="text-xs font-bold text-navy-900 dark:text-white">
                        {uni.programCount}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 leading-relaxed">
                    {uni.description}
                  </p>
                </div>

                {/* Bottom Actions: Compare & Details */}
                <div className="mt-5 pt-3 border-t border-gray-200/60 dark:border-navy-800/80 flex items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      if (comparing) {
                        removeUniversity(uni.id);
                      } else {
                        addUniversity(uni.id);
                      }
                    }}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                      comparing
                        ? 'bg-navy-900 text-white dark:bg-gold dark:text-navy-900'
                        : 'bg-gray-100 dark:bg-navy-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-navy-700'
                    }`}
                  >
                    {comparing ? <Check className="w-3.5 h-3.5" /> : <Scale className="w-3.5 h-3.5" />}
                    <span>{comparing ? 'Сонгогдсон' : 'Харьцуулах'}</span>
                  </button>

                  <Link
                    href={`/universities/${uni.id}`}
                    className="inline-flex items-center gap-1 text-xs font-bold text-navy-900 dark:text-white hover:text-gold dark:hover:text-gold"
                  >
                    <span>Дэлгэрэнгүй</span>
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
