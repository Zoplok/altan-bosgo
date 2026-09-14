'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { MAJORS, getUniversityById } from '@/lib/data';
import {
  Search,
  Compass,
  GraduationCap,
  Briefcase,
  BookOpen,
  ArrowRight,
  TrendingUp,
  Sparkles,
} from 'lucide-react';

export default function MajorsPage() {
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
        <div className="bg-white dark:bg-navy-900 rounded-2xl border border-gray-200 dark:border-navy-800 p-5 shadow-sm mb-8 space-y-4">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Мэргэжлийн нэрээр хайх (жнь: Эмч, Инженер, Программист, Багш, Хуульч)..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-gray-50 dark:bg-navy-950 border border-gray-200 dark:border-navy-700 text-sm text-navy-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-gold"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-gray-100 dark:border-navy-800 text-xs">
            <span className="font-semibold text-gray-500 dark:text-gray-400 mr-1">Чиглэл:</span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-lg transition-colors font-medium ${
                  selectedCategory === cat
                    ? 'bg-navy-900 text-white dark:bg-gold dark:text-navy-900 font-bold'
                    : 'bg-gray-100 dark:bg-navy-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200'
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
            const universities = major.offeringUniversityIds
              .map((id) => getUniversityById(id))
              .filter(Boolean);

            return (
              <div
                key={major.id}
                className="bg-white dark:bg-navy-900 rounded-2xl border border-gray-200/80 dark:border-navy-800 p-6 shadow-sm hover:shadow-xl hover:border-gold transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-gold/15 text-gold-700 dark:text-gold">
                      {major.category}
                    </span>
                    <span className="text-xs text-gray-500 flex items-center gap-1 font-semibold">
                      <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
                      {major.trendScore}% Эрэлттэй
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-navy-900 dark:text-white mb-2">
                    {major.name}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed mb-4">
                    {major.description}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4 text-xs">
                    <div className="p-3 bg-surface-light-subtle dark:bg-navy-950 rounded-xl border border-gray-100 dark:border-navy-800">
                      <span className="font-bold text-gray-500 block mb-1">Шаардагдах ЭЕШ:</span>
                      <div className="flex flex-wrap gap-1">
                        {major.requiredExams.map((ex, i) => (
                          <span
                            key={i}
                            className="px-2 py-0.5 rounded bg-white dark:bg-navy-900 border border-gray-200 dark:border-navy-700 text-[11px] font-semibold text-navy-900 dark:text-white"
                          >
                            {ex}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="p-3 bg-surface-light-subtle dark:bg-navy-950 rounded-xl border border-gray-100 dark:border-navy-800">
                      <span className="font-bold text-gray-500 block mb-1">Суралцах хугацаа:</span>
                      <span className="text-sm font-extrabold text-navy-900 dark:text-white">
                        {major.durationYears} жил (Бакалавр)
                      </span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <span className="text-xs font-bold text-gray-500 block mb-1.5 flex items-center gap-1">
                      <Briefcase className="w-3.5 h-3.5 text-gold" />
                      Ажиллах боломжит чиглэлүүд:
                    </span>
                    <ul className="space-y-1 text-xs text-gray-600 dark:text-gray-300">
                      {major.careerDirections.map((dir, i) => (
                        <li key={i} className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0" />
                          <span>{dir}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <span className="text-xs font-bold text-gray-500 block mb-1.5 flex items-center gap-1">
                      <GraduationCap className="w-3.5 h-3.5 text-gold" />
                      Энэ мэргэжлийг санал болгодог их сургуулиуд:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {universities.map((u) => (
                        <Link
                          key={u?.id}
                          href={`/universities/${u?.id}`}
                          className="px-2.5 py-1 rounded-lg bg-gray-50 dark:bg-navy-800 hover:bg-gold hover:text-navy-900 border border-gray-200 dark:border-navy-700 text-xs font-semibold text-navy-900 dark:text-white transition-colors"
                        >
                          {u?.name} ({u?.shortName})
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-100 dark:border-navy-800 flex justify-end">
                  <Link
                    href={`/universities?search=${encodeURIComponent(major.name)}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-navy-900 dark:text-gold hover:underline"
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
