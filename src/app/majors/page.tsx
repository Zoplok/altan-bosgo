'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { MAJORS, getUniversityById } from '@/lib/data';
import { useAuth } from '@/context/AuthContext';
import {
  Search,
  Compass,
  GraduationCap,
  Briefcase,
  ArrowRight,
  TrendingUp,
  Bookmark,
} from 'lucide-react';

export default function MajorsPage() {
  const { toggleSaveMajor, isSavedMajor } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    'all',
    'Мэдээллийн технологи',
    'Эрүүл мэнд, анагаах',
    'Инженерчлэл',
    'Бизнес, эдийн засаг',
    'Хууль, эрх зүй',
    'Боловсрол, багш',
  ];

  const filteredMajors = useMemo(() => {
    let list = [...MAJORS];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (m) =>
          m.name.toLowerCase().includes(q) ||
          m.category.toLowerCase().includes(q) ||
          m.description.toLowerCase().includes(q) ||
          m.careerDirections.some((c) => c.toLowerCase().includes(q))
      );
    }

    if (selectedCategory !== 'all') {
      list = list.filter((m) => m.category === selectedCategory);
    }

    return list;
  }, [searchQuery, selectedCategory]);

  return (
    <div className="bg-surface-light-subtle dark:bg-navy-950 min-h-screen py-10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-8">
          <div className="flex items-center gap-2 text-xs font-bold text-gold uppercase tracking-wider mb-1">
            <Compass className="w-4 h-4" />
            <span>Мэргэжил сонголтын хөтөч</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-navy-900 dark:text-white tracking-tight">
            Мэргэжил сонгох
          </h1>
          <p className="mt-2 text-sm sm:text-base text-gray-600 dark:text-gray-300">
            Ирээдүйд хамгийн их эрэлттэй 100+ мэргэжил, шаардагдах ЭЕШ шалгалтууд, суралцах хугацаа, ажлын байрны чиглэлүүд болон уг мэргэжлээр сургадаг их сургуулиудын нэгдсэн жагсаалт.
          </p>
        </div>

        {/* Search & Category Filter */}
        <div className="clay-card p-5 sm:p-6 mb-8 space-y-4">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Мэргэжлийн нэрээр хайх (жнь: Эмч, Инженер, Программист, Багш, Хуульч)..."
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl clay-input text-sm text-navy-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gold/50"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-gray-200/60 dark:border-navy-800/80 text-xs">
            <span className="font-bold text-gray-600 dark:text-gray-300 mr-1">Чиглэл:</span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl transition-all text-xs ${
                  selectedCategory === cat
                    ? 'clay-pill bg-navy-900 text-white dark:bg-gold dark:text-navy-950 font-extrabold shadow-sm'
                    : 'clay-btn-surface text-gray-700 dark:text-gray-300 font-semibold'
                }`}
              >
                {cat === 'all' ? 'Бүх салбар' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Majors List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredMajors.map((major) => {
            const saved = isSavedMajor(major.id);
            const universities = major.offeringUniversityIds
              .map((id) => getUniversityById(id))
              .filter(Boolean);

            return (
              <div
                key={major.id}
                className="clay-card clay-card-hover p-6 sm:p-7 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-gold/15 text-gold-700 dark:text-gold border border-gold/30 shadow-inner">
                      {major.category}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-emerald-600 dark:text-emerald-400 flex items-center gap-1 font-bold">
                        <TrendingUp className="w-3.5 h-3.5" />
                        {major.trendScore}% Эрэлттэй
                      </span>
                      <button
                        onClick={() => toggleSaveMajor(major.id)}
                        className={`p-2 rounded-xl transition-all ${
                          saved
                            ? 'clay-btn-gold text-navy-950'
                            : 'clay-btn-surface text-gray-400 hover:text-navy-900 dark:hover:text-white'
                        }`}
                        title={saved ? 'Хадгалсан' : 'Хадгалах'}
                      >
                        <Bookmark className={`w-3.5 h-3.5 ${saved ? 'fill-current' : ''}`} />
                      </button>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-navy-900 dark:text-white mb-2 font-display">
                    {major.name}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed mb-4 font-medium">
                    {major.description}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4 text-xs">
                    <div className="clay-recessed p-3.5 rounded-2xl">
                      <span className="font-bold text-gray-500 dark:text-gray-400 block mb-1">Шаардагдах ЭЕШ:</span>
                      <div className="flex flex-wrap gap-1">
                        {major.requiredExams.map((ex, i) => (
                          <span
                            key={i}
                            className="px-2 py-0.5 rounded-lg bg-white dark:bg-navy-900 border border-gray-200 dark:border-navy-700 text-[11px] font-bold text-navy-900 dark:text-white shadow-sm"
                          >
                            {ex}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="clay-recessed p-3.5 rounded-2xl">
                      <span className="font-bold text-gray-500 dark:text-gray-400 block mb-1">Суралцах хугацаа:</span>
                      <span className="text-sm font-extrabold text-navy-900 dark:text-white">
                        {major.durationYears} жил (Бакалавр)
                      </span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <span className="text-xs font-bold text-gray-600 dark:text-gray-300 block mb-1.5 flex items-center gap-1">
                      <Briefcase className="w-3.5 h-3.5 text-gold" />
                      Ажиллах боломжит чиглэлүүд:
                    </span>
                    <ul className="space-y-1 text-xs text-gray-600 dark:text-gray-400">
                      {major.careerDirections.map((dir, i) => (
                        <li key={i} className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0" />
                          <span>{dir}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <span className="text-xs font-bold text-gray-600 dark:text-gray-300 block mb-1.5 flex items-center gap-1">
                      <GraduationCap className="w-3.5 h-3.5 text-gold" />
                      Энэ мэргэжлийг санал болгодог их сургуулиуд:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {universities.map((u) => (
                        <Link
                          key={u?.id}
                          href={`/universities/${u?.id}`}
                          className="px-3 py-1 rounded-xl clay-btn-surface text-xs font-bold text-navy-900 dark:text-white hover:text-gold dark:hover:text-gold"
                        >
                          {u?.name} ({u?.shortName})
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-100 dark:border-navy-800/80 flex justify-end">
                  <Link
                    href={`/universities?search=${encodeURIComponent(major.name)}`}
                    className="clay-btn-surface px-4 py-2 rounded-xl inline-flex items-center gap-1.5 text-xs font-bold text-navy-900 dark:text-gold hover:text-gold"
                  >
                    <span>Энэ мэргэжлийг санал болгодог сургуулиудыг харах</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
