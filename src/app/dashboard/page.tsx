'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/context/AuthContext';
import {
  getUniversityById,
  getMajorById,
  getScholarshipById,
  UNIVERSITIES,
  MAJORS,
  CALENDAR_EVENTS,
  NEWS_ARTICLES,
} from '@/lib/data';
import {
  Bookmark,
  Compass,
  Calendar,
  Award,
  Bell,
  LogOut,
  GraduationCap,
  ArrowRight,
  Sliders,
  CheckCircle2,
  Trash2,
} from 'lucide-react';

export default function DashboardPage() {
  const {
    user,
    logout,
    toggleSaveUniversity,
    toggleSaveMajor,
    toggleSaveScholarship,
    guestSavedUnis,
    guestSavedMajors,
    guestSavedScholarships,
  } = useAuth();

  const [eyshScore, setEyshScore] = useState<number>(580);

  const activeUnisList = user?.savedUniversities || guestSavedUnis;
  const activeMajorsList = user?.savedMajors || guestSavedMajors;
  const activeSchList = user?.savedScholarships || guestSavedScholarships;

  const savedUnis = activeUnisList
    .map((id) => getUniversityById(id))
    .filter(Boolean);

  const savedMajors = activeMajorsList
    .map((id) => getMajorById(id))
    .filter(Boolean);

  const savedSch = activeSchList
    .map((id) => getScholarshipById(id))
    .filter(Boolean);

  // Universities matching the EYSh score
  const matchingUnis = UNIVERSITIES.filter(
    (u) => u.highlightScores.minScore <= eyshScore
  );

  return (
    <div className="bg-surface-light-subtle dark:bg-navy-950 min-h-screen py-10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome Banner */}
        <div className="clay-card p-6 sm:p-8 mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-3xl bg-gold/20 text-gold-700 dark:text-gold flex items-center justify-center font-bold text-2xl clay-pill border border-gold/40">
              {user ? user.displayName.charAt(0).toUpperCase() : 'С'}
            </div>
            <div>
              <span className="text-xs font-extrabold text-gold uppercase tracking-wider block mb-0.5">
                Суралцагчийн булан
              </span>
              <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-navy-900 dark:text-white">
                Сайн байна уу, {user?.displayName || 'Зочин суралцагч'}?
              </h1>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 font-medium">
                Боловсролын түвшин: {user?.educationLevel || '12-р анги'} • {user ? user.role : 'Зочин (Төхөөрөмж дээр хадгалагдсан)'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {user ? (
              <button
                onClick={logout}
                className="clay-btn-surface inline-flex items-center gap-1.5 px-4 py-2.5 rounded-2xl text-xs font-bold text-gray-700 dark:text-gray-200 hover:text-red-500 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Гарах</span>
              </button>
            ) : (
              <Link
                href="/auth/login"
                className="clay-btn-gold px-5 py-2.5 rounded-2xl text-navy-950 font-bold text-xs"
              >
                Бүртгэлээ холбох / Нэвтрэх
              </Link>
            )}
          </div>
        </div>

        {/* Interactive EYSh Score Matcher Widget */}
        <div className="clay-card p-6 sm:p-8 mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-gold uppercase tracking-wider mb-1">
                <Sliders className="w-4 h-4" />
                <span>Интерактив тохируулагч</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-display font-extrabold text-navy-900 dark:text-white">
                ЭЕШ-ын оноогоор тэнцэх сургуулиуд
              </h2>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                Өөрийн таамаглаж буй эсвэл авсан ЭЕШ оноогоо оруулан босго оноо хангаж буй сургуулиудыг шалгана уу.
              </p>
            </div>

            <div className="flex items-center gap-3 self-stretch sm:self-auto shrink-0 bg-white/60 dark:bg-navy-900/60 p-2 rounded-2xl clay-recessed">
              <span className="text-xs font-bold text-gray-500 dark:text-gray-400 pl-2">Таны оноо:</span>
              <input
                type="number"
                min={400}
                max={800}
                value={eyshScore}
                onChange={(e) => setEyshScore(Number(e.target.value) || 0)}
                className="w-20 px-3 py-1.5 rounded-xl clay-input text-base font-extrabold text-gold text-center focus:outline-none"
              />
            </div>
          </div>

          <div className="mb-4">
            <input
              type="range"
              min={400}
              max={800}
              step={10}
              value={eyshScore}
              onChange={(e) => setEyshScore(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 dark:bg-navy-800 rounded-lg appearance-none cursor-pointer accent-gold"
            />
            <div className="flex justify-between text-[11px] text-gray-400 font-bold mt-1">
              <span>400 оноо</span>
              <span>500</span>
              <span>600</span>
              <span>700</span>
              <span>800 оноо</span>
            </div>
          </div>

          <div className="pt-4 border-t border-gray-100 dark:border-navy-800/80">
            <div className="flex items-center justify-between text-xs font-bold mb-3">
              <span className="text-navy-900 dark:text-white">
                Таны {eyshScore} оноонд тохирох <span className="text-gold">{matchingUnis.length}</span> их сургууль байна:
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {matchingUnis.map((uni) => (
                <Link
                  key={uni.id}
                  href={`/universities/${uni.id}`}
                  className="clay-btn-surface p-3 rounded-2xl flex flex-col items-center text-center group"
                >
                  <div className="relative w-8 h-8 rounded-xl overflow-hidden mb-1.5">
                    <Image src={uni.logo} alt={uni.name} fill className="object-cover" />
                  </div>
                  <span className="text-xs font-bold text-navy-900 dark:text-white group-hover:text-gold transition-colors truncate w-full">
                    {uni.shortName}
                  </span>
                  <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-extrabold mt-0.5">
                    Босго: {uni.highlightScores.minScore}+
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Dashboard Grid Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left 2 Cols: Saved Schools, Majors, Scholarships */}
          <div className="lg:col-span-2 space-y-8">
            {/* 1. Миний хадгалсан сургуулиуд */}
            <div className="clay-card p-6 sm:p-7">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Bookmark className="w-5 h-5 text-gold" />
                  <h2 className="text-lg font-bold text-navy-900 dark:text-white font-display">
                    Миний хадгалсан сургуулиуд ({savedUnis.length})
                  </h2>
                </div>
                <Link
                  href="/universities"
                  className="text-xs font-bold text-gold hover:underline flex items-center gap-1"
                >
                  <span>Нэмж хайх</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>

              {savedUnis.length === 0 ? (
                <div className="text-center py-6 clay-recessed rounded-2xl">
                  <GraduationCap className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-xs text-gray-500 font-medium">Танд хадгалсан сургууль одоогоор байхгүй байна.</p>
                  <Link
                    href="/universities"
                    className="mt-3 inline-block clay-btn-gold px-4 py-2 rounded-xl text-navy-950 text-xs font-bold"
                  >
                    Сургуулиуд үзэх
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {savedUnis.map((uni) => (
                    <div
                      key={uni?.id}
                      className="clay-recessed p-4 rounded-2xl flex items-start justify-between gap-3"
                    >
                      <div className="flex items-start gap-3">
                        <div className="relative w-10 h-10 rounded-xl overflow-hidden bg-white shrink-0 border border-gray-200 dark:border-navy-800 shadow-sm">
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
                        className="text-gray-400 hover:text-red-500 p-1.5 transition-colors"
                        title="Хасах"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* 2. Миний сонирхож буй мэргэжил */}
            <div className="clay-card p-6 sm:p-7">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Compass className="w-5 h-5 text-gold" />
                  <h2 className="text-lg font-bold text-navy-900 dark:text-white font-display">
                    Миний сонирхож буй мэргэжил ({savedMajors.length})
                  </h2>
                </div>
                <Link
                  href="/majors"
                  className="text-xs font-bold text-gold hover:underline flex items-center gap-1"
                >
                  <span>Бүх мэргэжил</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>

              {savedMajors.length === 0 ? (
                <div className="text-center py-6 clay-recessed rounded-2xl">
                  <Compass className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-xs text-gray-500 font-medium">Хадгалсан мэргэжил одоогоор байхгүй байна.</p>
                  <Link
                    href="/majors"
                    className="mt-3 inline-block clay-btn-gold px-4 py-2 rounded-xl text-navy-950 text-xs font-bold"
                  >
                    Мэргэжил сонголт үзэх
                  </Link>
                </div>
              ) : (
                <div className="space-y-3">
                  {savedMajors.map((m) => (
                    <div
                      key={m?.id}
                      className="clay-recessed p-4 rounded-2xl flex items-center justify-between gap-3"
                    >
                      <div>
                        <span className="text-[10px] font-bold text-gold uppercase">{m?.category}</span>
                        <h4 className="font-bold text-sm text-navy-900 dark:text-white">{m?.name}</h4>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          ЭЕШ: {m?.requiredExams.join(', ')}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/universities?search=${encodeURIComponent(m!.name)}`}
                          className="clay-btn-surface px-3 py-1.5 rounded-xl text-xs font-bold text-navy-900 dark:text-white hover:text-gold"
                        >
                          Сургуулиуд
                        </Link>
                        <button
                          onClick={() => toggleSaveMajor(m!.id)}
                          className="text-gray-400 hover:text-red-500 p-1.5 transition-colors"
                          title="Хасах"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* 3. Тэтгэлэг */}
            <div className="clay-card p-6 sm:p-7">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-gold" />
                  <h2 className="text-lg font-bold text-navy-900 dark:text-white font-display">
                    Хадгалсан тэтгэлэг ({savedSch.length})
                  </h2>
                </div>
                <Link
                  href="/scholarships"
                  className="text-xs font-bold text-gold hover:underline flex items-center gap-1"
                >
                  <span>Тэтгэлгүүд</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>

              {savedSch.length === 0 ? (
                <div className="text-center py-6 clay-recessed rounded-2xl">
                  <Award className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-xs text-gray-500 font-medium">Хадгалсан тэтгэлэг байхгүй байна.</p>
                  <Link
                    href="/scholarships"
                    className="mt-3 inline-block clay-btn-gold px-4 py-2 rounded-xl text-navy-950 text-xs font-bold"
                  >
                    Тэтгэлэг үзэх
                  </Link>
                </div>
              ) : (
                <div className="space-y-3">
                  {savedSch.map((s) => (
                    <div
                      key={s?.id}
                      className="clay-recessed p-4 rounded-2xl flex items-center justify-between gap-3"
                    >
                      <div>
                        <h4 className="font-bold text-sm text-navy-900 dark:text-white">{s?.title}</h4>
                        <span className="text-xs text-gray-500 dark:text-gray-400">{s?.organization}</span>
                        <span className="block text-xs text-gold font-bold mt-0.5">
                          Хугацаа: {s?.deadline}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <a
                          href={s?.applyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="clay-btn-gold px-3.5 py-1.5 rounded-xl text-navy-950 font-bold text-xs"
                        >
                          Илгээх
                        </a>
                        <button
                          onClick={() => toggleSaveScholarship(s!.id)}
                          className="text-gray-400 hover:text-red-500 p-1.5 transition-colors"
                          title="Хасах"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Deadlines, Notifications & Latest News */}
          <div className="space-y-8">
            {/* 4. Элсэлтийн хугацаа (Deadlines timeline) */}
            <div className="clay-card p-6">
              <div className="flex items-center gap-2 mb-4">
                <Calendar className="w-5 h-5 text-gold" />
                <h2 className="text-base font-bold text-navy-900 dark:text-white font-display">
                  Ойрын хугацааны товууд
                </h2>
              </div>

              <div className="space-y-3">
                {CALENDAR_EVENTS.slice(0, 3).map((evt) => (
                  <div
                    key={evt.id}
                    className="clay-recessed p-3.5 rounded-2xl text-xs"
                  >
                    <span className="font-extrabold text-gold block mb-0.5">{evt.startDate}</span>
                    <h4 className="font-bold text-navy-900 dark:text-white">{evt.title}</h4>
                    <span className="text-[11px] text-gray-400 mt-1 block line-clamp-1 font-medium">
                      {evt.description}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* 5. Мэдэгдэл (Notifications) */}
            <div className="clay-card p-6">
              <div className="flex items-center gap-2 mb-4">
                <Bell className="w-5 h-5 text-gold" />
                <h2 className="text-base font-bold text-navy-900 dark:text-white font-display">Мэдэгдэл</h2>
              </div>

              <div className="space-y-3 text-xs">
                <div className="p-3.5 bg-gold/15 rounded-2xl border border-gold/40 text-navy-900 dark:text-gray-200 shadow-sm">
                  <span className="font-bold block mb-1">🎉 2026 ЭЕШ-ын бүртгэл</span>
                  <span>eyesh.eec.mn системд 5-р сарын 15 хүртэл бүртгэлээ баталгаажуулна уу.</span>
                </div>
                <div className="clay-recessed p-3.5 rounded-2xl text-gray-600 dark:text-gray-300">
                  <span className="font-bold block mb-1 text-navy-900 dark:text-white">
                    Шинэчлэгдсэн босго оноо
                  </span>
                  <span>МУИС болон ШУТИС-ийн 2026 оны албан ёсны босго оноо системд шинэчлэгдлээ.</span>
                </div>
              </div>
            </div>

            {/* 6. Шинэ мэдээ (News widget) */}
            <div className="clay-card p-6">
              <h2 className="text-base font-bold text-navy-900 dark:text-white mb-4 font-display">Шинэ мэдээ</h2>
              <div className="space-y-3">
                {NEWS_ARTICLES.slice(0, 2).map((n) => (
                  <Link
                    key={n.id}
                    href={`/news?id=${n.id}`}
                    className="block clay-btn-surface p-3.5 rounded-2xl text-xs"
                  >
                    <span className="text-[10px] text-gray-400 block mb-1 font-medium">{n.date}</span>
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
