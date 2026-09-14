'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { UNIVERSITIES } from '@/lib/data';
import { VerificationBadge } from '@/components/ui/VerificationBadge';
import { useCompare } from '@/context/CompareContext';
import { useAuth } from '@/context/AuthContext';
import {
  Search,
  Filter,
  MapPin,
  GraduationCap,
  Scale,
  ArrowRight,
  Bookmark,
  Check,
  SlidersHorizontal,
  RotateCcw,
} from 'lucide-react';

export default function UniversitiesPage() {
  const { addUniversity, removeUniversity, isComparing } = useCompare();
  const { toggleSaveUniversity, isSavedUniversity } = useAuth();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedCity, setSelectedCity] = useState<string>('all');
  const [selectedScore, setSelectedScore] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('popular');

  const filteredUniversities = useMemo(() => {
    let list = [...UNIVERSITIES];

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (u) =>
          u.name.toLowerCase().includes(q) ||
          u.shortName.toLowerCase().includes(q) ||
          u.englishName.toLowerCase().includes(q) ||
          u.majors.some((m) => m.name.toLowerCase().includes(q))
      );
    }

    // Type filter
    if (selectedType !== 'all') {
      list = list.filter((u) => u.type === selectedType);
    }

    // City filter
    if (selectedCity !== 'all') {
      list = list.filter((u) => u.city === selectedCity);
    }

    // Score filter
    if (selectedScore !== 'all') {
      const min = parseInt(selectedScore, 10);
      list = list.filter((u) => u.highlightScores.minScore >= min);
    }

    // Sorting
    if (sortBy === 'name') {
      list.sort((a, b) => a.shortName.localeCompare(b.shortName));
    } else if (sortBy === 'score-desc') {
      list.sort((a, b) => b.highlightScores.minScore - a.highlightScores.minScore);
    } else if (sortBy === 'tuition-asc') {
      list.sort((a, b) => a.tuitionSummary.creditPrice - b.tuitionSummary.creditPrice);
    } else if (sortBy === 'tuition-desc') {
      list.sort((a, b) => b.tuitionSummary.creditPrice - a.tuitionSummary.creditPrice);
    } else if (sortBy === 'programs-desc') {
      list.sort((a, b) => b.programCount - a.programCount);
    }

    return list;
  }, [searchQuery, selectedType, selectedCity, selectedScore, sortBy]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedType('all');
    setSelectedCity('all');
    setSelectedScore('all');
    setSortBy('popular');
  };

  return (
    <div className="bg-surface-light-subtle dark:bg-navy-950 min-h-screen py-10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="max-w-3xl mb-8">
          <div className="flex items-center gap-2 text-xs font-bold text-gold uppercase tracking-wider mb-1">
            <GraduationCap className="w-4 h-4" />
            <span>Их, дээд сургуулийн нэгдсэн сан</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-navy-900 dark:text-white tracking-tight">
            Монголын их, дээд сургуулиуд
          </h1>
          <p className="mt-2 text-sm sm:text-base text-gray-600 dark:text-gray-300">
            Монгол Улсад үйл ажиллагаа явуулж буй магадлан итгэмжлэгдсэн их, дээд сургуулиудын албан ёсны босго оноо, сургалтын төлбөр, хөтөлбөрийн дэлгэрэнгүй лавлах.
          </p>
        </div>

        {/* Filters & Search Toolbar */}
        <div className="bg-white dark:bg-navy-900 rounded-2xl border border-gray-200 dark:border-navy-800 p-4 sm:p-5 shadow-sm mb-8 space-y-4">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Сургуулийн нэр, товчлол эсвэл мэргэжлээр хайх..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-gray-50 dark:bg-navy-950 border border-gray-200 dark:border-navy-700 text-sm text-navy-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-gold"
              />
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 hidden sm:inline">
                Эрэмбэлэх:
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2.5 rounded-xl bg-gray-50 dark:bg-navy-950 border border-gray-200 dark:border-navy-700 text-xs sm:text-sm font-medium text-navy-900 dark:text-white focus:outline-none focus:border-gold"
              >
                <option value="popular">Алдартай / Эрэмбээр</option>
                <option value="score-desc">Босго оноогоор (Өндөр нь эхэнд)</option>
                <option value="tuition-asc">Төлбөрөөр (Бага нь эхэнд)</option>
                <option value="tuition-desc">Төлбөрөөр (Их нь эхэнд)</option>
                <option value="name">Нэрээр (А-Я)</option>
                <option value="programs-desc">Хөтөлбөрийн тоогоор</option>
              </select>

              {(searchQuery || selectedType !== 'all' || selectedScore !== 'all') && (
                <button
                  onClick={resetFilters}
                  className="p-2.5 rounded-xl border border-gray-200 dark:border-navy-700 text-gray-500 hover:text-red-500 transition-colors"
                  title="Шүүлтүүрийг цэвэрлэх"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Quick Filter Buttons */}
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-gray-100 dark:border-navy-800 text-xs">
            <span className="font-semibold text-gray-500 dark:text-gray-400 mr-1 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" />
              Өмчийн төрөл:
            </span>
            {[
              { id: 'all', label: 'Бүгд' },
              { id: 'Төрийн', label: 'Төрийн өмчит' },
              { id: 'Хувийн', label: 'Хувийн өмчит' },
              { id: 'Хамтарсан', label: 'Хамтарсан олон улсын' },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setSelectedType(t.id)}
                className={`px-3 py-1 rounded-lg transition-colors font-medium ${
                  selectedType === t.id
                    ? 'bg-navy-900 text-white dark:bg-gold dark:text-navy-900 font-bold'
                    : 'bg-gray-100 dark:bg-navy-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200'
                }`}
              >
                {t.label}
              </button>
            ))}

            <span className="font-semibold text-gray-500 dark:text-gray-400 ml-3 mr-1">
              Босго оноо:
            </span>
            {[
              { id: 'all', label: 'Бүгд' },
              { id: '500', label: '500+' },
              { id: '600', label: '600+' },
              { id: '650', label: '650+' },
            ].map((s) => (
              <button
                key={s.id}
                onClick={() => setSelectedScore(s.id)}
                className={`px-3 py-1 rounded-lg transition-colors font-medium ${
                  selectedScore === s.id
                    ? 'bg-navy-900 text-white dark:bg-gold dark:text-navy-900 font-bold'
                    : 'bg-gray-100 dark:bg-navy-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* Results Count Bar */}
        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-6">
          <span>Нийт олдсон: <strong>{filteredUniversities.length}</strong> их сургууль</span>
          <span>Мэдээлэл бүр албан ёсны эх сурвалжтай баталгаажсан</span>
        </div>

        {/* Grid of University Cards */}
        {filteredUniversities.length === 0 ? (
          <div className="bg-white dark:bg-navy-900 rounded-2xl border border-gray-200 dark:border-navy-800 p-12 text-center">
            <GraduationCap className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-navy-900 dark:text-white">Сургууль олдсонгүй</h3>
            <p className="text-sm text-gray-500 mt-1">Та шүүлтүүрээ өөрчлөх эсвэл цэвэрлээд дахин хайна уу.</p>
            <button
              onClick={resetFilters}
              className="mt-4 px-4 py-2 rounded-xl bg-gold text-navy-900 font-bold text-xs"
            >
              Шүүлтүүрүүдийг цэвэрлэх
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredUniversities.map((uni) => {
              const comparing = isComparing(uni.id);
              const saved = isSavedUniversity(uni.id);

              return (
                <div
                  key={uni.id}
                  className="bg-white dark:bg-navy-900 rounded-2xl border border-gray-200/80 dark:border-navy-800 p-5 shadow-sm hover:shadow-xl hover:border-gold/60 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    {/* Top Row: Type, Status & Save */}
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
                          title={saved ? 'Хадгалсан' : 'Хадгалах'}
                        >
                          <Bookmark className={`w-3.5 h-3.5 ${saved ? 'fill-current' : ''}`} />
                        </button>
                      </div>
                    </div>

                    {/* Header: Logo, Name */}
                    <Link href={`/universities/${uni.id}`} className="flex items-start gap-3.5 group mb-3">
                      <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-gray-50 dark:bg-navy-950 border border-gray-100 dark:border-navy-800 shrink-0 shadow-sm">
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
                        <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1">
                          {uni.name}
                        </p>
                        <div className="flex items-center gap-1 text-[11px] text-gray-400 mt-1">
                          <MapPin className="w-3 h-3 text-gray-400 shrink-0" />
                          <span className="truncate">{uni.location}</span>
                        </div>
                      </div>
                    </Link>

                    {/* Metrics Box */}
                    <div className="grid grid-cols-3 gap-2 py-2.5 px-3 bg-gray-50 dark:bg-navy-950 rounded-xl border border-gray-100 dark:border-navy-800 text-center my-3">
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

                  {/* Bottom Action Buttons */}
                  <div className="mt-5 pt-3 border-t border-gray-100 dark:border-navy-800 flex items-center justify-between gap-2">
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
        )}
      </div>
    </div>
  );
}
