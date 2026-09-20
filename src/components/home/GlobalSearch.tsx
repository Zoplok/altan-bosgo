'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { globalSearch } from '@/lib/data';
import { VerificationBadge } from '@/components/ui/VerificationBadge';
import {
  Search,
  GraduationCap,
  School as SchoolIcon,
  Compass,
  Award,
  Newspaper,
  ArrowRight,
  Sparkles,
  X,
} from 'lucide-react';

type SearchCategory = 'all' | 'university' | 'school' | 'major' | 'scholarship' | 'news';

export const GlobalSearch: React.FC = () => {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<SearchCategory>('all');

  const exampleKeywords = ['МУИС', 'ШУТИС', 'АШУҮИС', 'МУБИС', 'Эмч', 'Програм хангамж', 'Тэтгэлэг'];

  const results = useMemo(() => {
    return globalSearch(query);
  }, [query]);

  const hasQuery = query.trim().length > 0;
  const totalMatches =
    results.universities.length +
    results.schools.length +
    results.majors.length +
    results.scholarships.length +
    results.news.length;

  return (
    <section id="search-section" className="py-12 bg-white dark:bg-navy-900 border-y border-gray-100 dark:border-navy-800 transition-colors">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6">
          <span className="text-xs font-bold uppercase tracking-wider text-gold-600 dark:text-gold block mb-1">
            Нэгдсэн хайлтын систем
          </span>
          <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-navy-900 dark:text-white">
            Монголын бүх боловсролын мэдээллийг нэг дороос хайх
          </h2>
        </div>

        {/* Search Input Box */}
        <div className="relative max-w-3xl mx-auto">
          <div className="relative flex items-center">
            <Search className="absolute left-4 w-6 h-6 text-gray-400 pointer-events-none" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Сургууль, их сургууль, мэргэжил хайх... (жнь: МУИС, ШУТИС, Эмч)"
              className="w-full pl-12 pr-12 py-4 rounded-3xl clay-input text-navy-900 dark:text-white placeholder-gray-400 focus:outline-none text-base sm:text-lg transition-all"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="absolute right-4 p-1.5 rounded-full clay-btn-surface text-gray-400 hover:text-navy-900 dark:hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Keyword Examples */}
          <div className="flex flex-wrap items-center gap-2 mt-3 text-xs text-gray-500 dark:text-gray-400">
            <span className="font-bold text-gray-600 dark:text-gray-300 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-gold" />
              Түгээмэл:
            </span>
            {exampleKeywords.map((kw) => (
              <button
                key={kw}
                type="button"
                onClick={() => setQuery(kw)}
                className="px-3 py-1 rounded-full clay-pill bg-white dark:bg-navy-900 hover:bg-gold/20 text-navy-900 dark:text-gray-200 transition-colors font-semibold"
              >
                {kw}
              </button>
            ))}
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-5">
            {[
              { id: 'all', label: 'Бүгд' },
              { id: 'university', label: 'Их сургууль' },
              { id: 'school', label: 'ЕБС Сургууль' },
              { id: 'major', label: 'Мэргэжил' },
              { id: 'scholarship', label: 'Тэтгэлэг' },
              { id: 'news', label: 'Мэдээ' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id as SearchCategory)}
                className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all ${
                  activeCategory === cat.id
                    ? 'clay-btn-gold shadow-md'
                    : 'clay-btn-surface text-gray-600 dark:text-gray-300'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Live Search Results Dropdown/Card Panel */}
        {hasQuery && (
          <div className="mt-8 max-w-4xl mx-auto clay-card p-6 animate-in fade-in-50 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-navy-800 text-xs text-gray-500 dark:text-gray-400 mb-5">
              <span>Хайлтын илэрц: <strong className="text-gold font-bold">{totalMatches}</strong></span>
              <button onClick={() => setQuery('')} className="px-2.5 py-1 rounded-lg clay-btn-surface text-xs font-semibold text-gray-500 hover:text-red-500">
                Хаах
              </button>
            </div>

            {totalMatches === 0 ? (
              <div className="text-center py-8 text-gray-500">
                &ldquo;{query}&rdquo; түлхүүр үгээр илэрц олдсонгүй. Өөр үгээр хайна уу.
              </div>
            ) : (
              <div className="space-y-6">
                {/* Universities Result */}
                {(activeCategory === 'all' || activeCategory === 'university') && results.universities.length > 0 && (
                  <div>
                    <div className="flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-navy-900 dark:text-white mb-3">
                      <GraduationCap className="w-4 h-4 text-gold" />
                      <span>Их, дээд сургуулиуд ({results.universities.length})</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {results.universities.map((uni) => (
                        <Link
                          key={uni.id}
                          href={`/universities/${uni.id}`}
                          className="p-3.5 clay-card clay-card-hover flex items-start justify-between gap-3 group"
                        >
                          <div>
                            <span className="font-bold text-sm text-navy-900 dark:text-white group-hover:text-gold transition-colors block">
                              {uni.name} ({uni.shortName})
                            </span>
                            <p className="text-xs text-gray-500 line-clamp-1 mt-0.5">{uni.location}</p>
                            <div className="flex items-center gap-2 mt-2 text-[11px]">
                              <span className="font-semibold text-navy-900 dark:text-gray-200">Босго: {uni.highlightScores.minScore}+</span>
                              <span className="text-gray-400">•</span>
                              <span className="text-gold font-bold">{uni.tuitionSummary.creditPrice.toLocaleString()}₮/кр</span>
                            </div>
                          </div>
                          <VerificationBadge verification={uni.verification} size="sm" />
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* Schools Result */}
                {(activeCategory === 'all' || activeCategory === 'school') && results.schools.length > 0 && (
                  <div>
                    <div className="flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-navy-900 dark:text-white mb-3">
                      <SchoolIcon className="w-4 h-4 text-gold" />
                      <span>ЕБС Сургуулиуд ({results.schools.length})</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {results.schools.map((school) => (
                        <Link
                          key={school.id}
                          href="/schools"
                          className="p-3.5 clay-card clay-card-hover flex items-start justify-between gap-3 group"
                        >
                          <div>
                            <span className="font-bold text-sm text-navy-900 dark:text-white group-hover:text-gold transition-colors block">
                              {school.name}
                            </span>
                            <p className="text-xs text-gray-500 line-clamp-1 mt-0.5">{school.address}</p>
                            <span className="inline-block mt-2 px-2.5 py-0.5 rounded-full clay-pill text-[10px] font-bold text-gray-700 dark:text-gray-300">
                              {school.type}
                            </span>
                          </div>
                          <VerificationBadge verification={school.verification} size="sm" />
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* Majors Result */}
                {(activeCategory === 'all' || activeCategory === 'major') && results.majors.length > 0 && (
                  <div>
                    <div className="flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-navy-900 dark:text-white mb-3">
                      <Compass className="w-4 h-4 text-gold" />
                      <span>Мэргэжил сонголт ({results.majors.length})</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {results.majors.map((major) => (
                        <Link
                          key={major.id}
                          href="/majors"
                          className="p-3.5 clay-card clay-card-hover block group"
                        >
                          <span className="font-bold text-sm text-navy-900 dark:text-white group-hover:text-gold transition-colors block">
                            {major.name}
                          </span>
                          <p className="text-xs text-gray-500 line-clamp-1 mt-0.5">{major.description}</p>
                          <div className="flex items-center gap-2 mt-2 text-[11px] text-gray-600 dark:text-gray-300">
                            <span>ЭЕШ: {major.requiredExams.join(', ')}</span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* Scholarships Result */}
                {(activeCategory === 'all' || activeCategory === 'scholarship') && results.scholarships.length > 0 && (
                  <div>
                    <div className="flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-navy-900 dark:text-white mb-3">
                      <Award className="w-4 h-4 text-gold" />
                      <span>Тэтгэлэгт хөтөлбөрүүд ({results.scholarships.length})</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {results.scholarships.map((sch) => (
                        <Link
                          key={sch.id}
                          href="/scholarships"
                          className="p-3.5 clay-card clay-card-hover flex items-start justify-between gap-3 group"
                        >
                          <div>
                            <span className="font-bold text-sm text-navy-900 dark:text-white group-hover:text-gold transition-colors block">
                              {sch.title}
                            </span>
                            <p className="text-xs text-gray-500 line-clamp-1 mt-0.5">{sch.organization}</p>
                            <span className="inline-block mt-2 text-gold-700 dark:text-gold text-[11px] font-bold">
                              Хугацаа: {sch.deadline}
                            </span>
                          </div>
                          <VerificationBadge verification={sch.verification} size="sm" />
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};
