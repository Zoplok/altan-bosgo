'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/context/AuthContext';
import { getUniversityById, getMajorById, getScholarshipById, CALENDAR_EVENTS, NEWS_ARTICLES } from '@/lib/data';
import {
  User,
  Bookmark,
  Compass,
  Calendar,
  Award,
  Bell,
  LogOut,
  GraduationCap,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

export default function DashboardPage() {
  const { user, logout, toggleSaveUniversity } = useAuth();

  const savedUnis = (user?.savedUniversities || ['num', 'must'])
    .map((id) => getUniversityById(id))
    .filter(Boolean);

  const savedMajors = (user?.savedMajors || ['major-se', 'major-ai'])
    .map((id) => getMajorById(id))
    .filter(Boolean);

  const savedSch = (user?.savedScholarships || ['sch-ilgeelt-2100'])
    .map((id) => getScholarshipById(id))
    .filter(Boolean);

  return (
    <div className="bg-surface-light-subtle dark:bg-navy-950 min-h-screen py-10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome Banner */}
        <div className="bg-white dark:bg-navy-900 rounded-3xl border border-gray-200 dark:border-navy-800 p-6 sm:p-8 shadow-sm mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gold/20 text-gold-700 dark:text-gold flex items-center justify-center font-bold text-2xl shadow-sm">
              {user ? user.displayName.charAt(0).toUpperCase() : 'С'}
            </div>
            <div>
              <span className="text-xs font-bold text-gold uppercase tracking-wider block mb-0.5">
                Суралцагчийн булан
              </span>
              <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-navy-900 dark:text-white">
                Сайн байна уу, {user?.displayName || 'Суралцагч'}?
              </h1>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Боловсролын түвшин: {user?.educationLevel || '12-р анги'} • {user?.role || 'Сурагч'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {user ? (
              <button
                onClick={logout}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-gray-200 dark:border-navy-700 text-xs font-semibold text-gray-600 dark:text-gray-300 hover:text-red-500 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Гарах</span>
              </button>
            ) : (
              <Link
                href="/auth/login"
                className="px-5 py-2.5 rounded-xl bg-gold text-navy-900 font-bold text-xs"
              >
                Нэвтрэх / Бүртгүүлэх
              </Link>
            )}
          </div>
        </div>

        {/* Dashboard Grid Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left 2 Cols: Saved Schools, Majors, Scholarships */}
          <div className="lg:col-span-2 space-y-8">
            {/* 1. Миний хадгалсан сургуулиуд */}
            <div className="bg-white dark:bg-navy-900 rounded-3xl border border-gray-200 dark:border-navy-800 p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Bookmark className="w-5 h-5 text-gold" />
                  <h2 className="text-lg font-bold text-navy-900 dark:text-white">
                    Миний хадгалсан сургуулиуд ({savedUnis.length})
                  </h2>
                </div>
                <Link
                  href="/universities"
                  className="text-xs font-semibold text-gold hover:underline flex items-center gap-1"
                >
                  <span>Нэмж хайх</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>

              {savedUnis.length === 0 ? (
                <p className="text-xs text-gray-500 py-4 text-center">Танд хадгалсан сургууль одоогоор байхгүй байна.</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {savedUnis.map((uni) => (
                    <div
                      key={uni?.id}
                      className="p-4 bg-surface-light-subtle dark:bg-navy-950 rounded-2xl border border-gray-100 dark:border-navy-800 flex items-start justify-between gap-3"
                    >
                      <div className="flex items-start gap-3">
                        <div className="relative w-10 h-10 rounded-xl overflow-hidden bg-white shrink-0 border border-gray-100 dark:border-navy-800">
                          <Image src={uni!.logo} alt={uni!.name} fill className="object-cover" />
                        </div>
                        <div>
                          <Link
                            href={`/universities/${uni!.id}`}
                            className="font-bold text-sm text-navy-900 dark:text-white hover:text-gold block"
                          >
                            {uni!.shortName}
                          </Link>
                          <span className="text-[11px] text-gray-400 block line-clamp-1">{uni!.name}</span>
                          <span className="text-xs font-bold text-gold mt-1 block">
                            Босго: {uni!.highlightScores.minScore}+
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => toggleSaveUniversity(uni!.id)}
                        className="text-gray-400 hover:text-red-500 text-xs"
                        title="Хасах"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* 2. Миний сонирхож буй мэргэжил */}
            <div className="bg-white dark:bg-navy-900 rounded-3xl border border-gray-200 dark:border-navy-800 p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Compass className="w-5 h-5 text-gold" />
                  <h2 className="text-lg font-bold text-navy-900 dark:text-white">
                    Миний сонирхож буй мэргэжил ({savedMajors.length})
                  </h2>
                </div>
                <Link
                  href="/majors"
                  className="text-xs font-semibold text-gold hover:underline flex items-center gap-1"
                >
                  <span>Бүх мэргэжил</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>

              <div className="space-y-3">
                {savedMajors.map((m) => (
                  <div
                    key={m?.id}
                    className="p-4 bg-surface-light-subtle dark:bg-navy-950 rounded-2xl border border-gray-100 dark:border-navy-800 flex items-center justify-between gap-3"
                  >
                    <div>
                      <span className="text-[10px] font-bold text-gold uppercase">{m?.category}</span>
                      <h4 className="font-bold text-sm text-navy-900 dark:text-white">{m?.name}</h4>
                      <span className="text-xs text-gray-500">
                        ЭЕШ: {m?.requiredExams.join(', ')}
                      </span>
                    </div>
                    <Link
                      href={`/majors?select=${m?.id}`}
                      className="px-3 py-1.5 rounded-xl bg-gray-100 dark:bg-navy-800 text-xs font-semibold text-navy-900 dark:text-white hover:bg-gold hover:text-navy-900 transition-colors"
                    >
                      Үзэх
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            {/* 3. Тэтгэлэг */}
            <div className="bg-white dark:bg-navy-900 rounded-3xl border border-gray-200 dark:border-navy-800 p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-gold" />
                  <h2 className="text-lg font-bold text-navy-900 dark:text-white">
                    Хадгалсан тэтгэлэг ({savedSch.length})
                  </h2>
                </div>
                <Link
                  href="/scholarships"
                  className="text-xs font-semibold text-gold hover:underline flex items-center gap-1"
                >
                  <span>Тэтгэлгүүд</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>

              <div className="space-y-3">
                {savedSch.map((s) => (
                  <div
                    key={s?.id}
                    className="p-4 bg-surface-light-subtle dark:bg-navy-950 rounded-2xl border border-gray-100 dark:border-navy-800 flex items-center justify-between gap-3"
                  >
                    <div>
                      <h4 className="font-bold text-sm text-navy-900 dark:text-white">{s?.title}</h4>
                      <span className="text-xs text-gray-500">{s?.organization}</span>
                      <span className="block text-xs text-gold font-semibold mt-1">
                        Хугацаа: {s?.deadline}
                      </span>
                    </div>
                    <a
                      href={s?.applyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-1.5 rounded-xl bg-gold text-navy-900 font-bold text-xs shadow-sm hover:bg-gold-400"
                    >
                      Илгээх
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Deadlines, Notifications & Latest News */}
          <div className="space-y-8">
            {/* 4. Элсэлтийн хугацаа (Deadlines timeline) */}
            <div className="bg-white dark:bg-navy-900 rounded-3xl border border-gray-200 dark:border-navy-800 p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <Calendar className="w-5 h-5 text-gold" />
                <h2 className="text-base font-bold text-navy-900 dark:text-white">
                  Ойрын хугацааны товууд
                </h2>
              </div>

              <div className="space-y-4">
                {CALENDAR_EVENTS.slice(0, 3).map((evt) => (
                  <div
                    key={evt.id}
                    className="p-3 bg-surface-light-subtle dark:bg-navy-950 rounded-xl border border-gray-100 dark:border-navy-800 text-xs"
                  >
                    <span className="font-extrabold text-gold block mb-0.5">{evt.startDate}</span>
                    <h4 className="font-bold text-navy-900 dark:text-white">{evt.title}</h4>
                    <span className="text-[11px] text-gray-400 mt-1 block line-clamp-1">
                      {evt.description}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* 5. Мэдэгдэл (Notifications) */}
            <div className="bg-white dark:bg-navy-900 rounded-3xl border border-gray-200 dark:border-navy-800 p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <Bell className="w-5 h-5 text-gold" />
                <h2 className="text-base font-bold text-navy-900 dark:text-white">Мэдэгдэл</h2>
              </div>

              <div className="space-y-3 text-xs">
                <div className="p-3 bg-gold/10 rounded-xl border border-gold/30 text-navy-900 dark:text-gray-200">
                  <span className="font-bold block mb-1">🎉 2026 ЭЕШ-ын бүртгэл</span>
                  <span>eyesh.eec.mn системд 5-р сарын 15 хүртэл бүртгэлээ баталгаажуулна уу.</span>
                </div>
                <div className="p-3 bg-surface-light-subtle dark:bg-navy-950 rounded-xl border border-gray-100 dark:border-navy-800 text-gray-600 dark:text-gray-300">
                  <span className="font-bold block mb-1 text-navy-900 dark:text-white">
                    Шинэчлэгдсэн босго оноо
                  </span>
                  <span>МУИС болон ШУТИС-ийн 2026 оны албан ёсны босго оноо системд шинэчлэгдлээ.</span>
                </div>
              </div>
            </div>

            {/* 6. Шинэ мэдээ (News widget) */}
            <div className="bg-white dark:bg-navy-900 rounded-3xl border border-gray-200 dark:border-navy-800 p-6 shadow-sm">
              <h2 className="text-base font-bold text-navy-900 dark:text-white mb-4">Шинэ мэдээ</h2>
              <div className="space-y-3">
                {NEWS_ARTICLES.slice(0, 2).map((n) => (
                  <Link
                    key={n.id}
                    href={`/news#${n.id}`}
                    className="block p-3 bg-surface-light-subtle dark:bg-navy-950 rounded-xl border border-gray-100 dark:border-navy-800 hover:border-gold transition-colors text-xs"
                  >
                    <span className="text-[10px] text-gray-400 block mb-1">{n.date}</span>
                    <h4 className="font-bold text-navy-900 dark:text-white line-clamp-2">{n.title}</h4>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
