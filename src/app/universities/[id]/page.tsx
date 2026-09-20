'use client';

import React, { useState } from 'react';
import { notFound, useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getUniversityById, UNIVERSITIES } from '@/lib/data';
import { VerificationBadge } from '@/components/ui/VerificationBadge';
import { useCompare } from '@/context/CompareContext';
import { useAuth } from '@/context/AuthContext';
import {
  MapPin,
  Globe,
  ExternalLink,
  Phone,
  Mail,
  Calendar,
  Award,
  Home,
  CheckCircle,
  HelpCircle,
  Scale,
  Bookmark,
  Building,
  GraduationCap,
  BookOpen,
  DollarSign,
  ArrowLeft,
  FileCheck,
  Clock,
  ShieldCheck,
} from 'lucide-react';

type TabKey =
  | 'general'
  | 'majors'
  | 'admission'
  | 'threshold'
  | 'tuition'
  | 'scholarships'
  | 'dormitory'
  | 'news'
  | 'contact';

export default function UniversityDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const university = getUniversityById(id);

  const { addUniversity, removeUniversity, isComparing } = useCompare();
  const { toggleSaveUniversity, isSavedUniversity } = useAuth();

  const [activeTab, setActiveTab] = useState<TabKey>('general');

  if (!university) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold mb-4">Их сургууль олдсонгүй</h1>
        <p className="text-gray-500 mb-6">Хайсан их сургуулийн мэдээлэл манай системд олдсонгүй.</p>
        <Link
          href="/universities"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gold text-navy-900 font-bold"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Сургуулиудын жагсаалт руу буцах</span>
        </Link>
      </div>
    );
  }

  const comparing = isComparing(university.id);
  const saved = isSavedUniversity(university.id);

  const tabs: { key: TabKey; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { key: 'general', label: '1. Ерөнхий мэдээлэл', icon: Building },
    { key: 'majors', label: '2. Мэргэжил', icon: BookOpen },
    { key: 'admission', label: '3. Элсэлт', icon: FileCheck },
    { key: 'threshold', label: '4. Босго оноо', icon: GraduationCap },
    { key: 'tuition', label: '5. Төлбөр', icon: DollarSign },
    { key: 'scholarships', label: '6. Тэтгэлэг', icon: Award },
    { key: 'dormitory', label: '7. Дотуур байр', icon: Home },
    { key: 'news', label: '8. Мэдээ & Асуултууд', icon: HelpCircle },
    { key: 'contact', label: '9. Холбоо барих', icon: Phone },
  ];

  return (
    <div className="bg-surface-light-subtle dark:bg-navy-950 min-h-screen pb-16 transition-colors">
      {/* Top Banner / Cover */}
      <div className="relative h-48 sm:h-64 lg:h-80 w-full bg-navy-900 overflow-hidden">
        {university.coverImage ? (
          <Image
            src={university.coverImage}
            alt={university.name}
            fill
            className="object-cover opacity-60"
            priority
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-900 to-navy-950" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-950/40 to-transparent" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-end pb-6 relative z-10">
          <Link
            href="/universities"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-navy-900/80 text-gray-200 hover:text-white text-xs backdrop-blur font-medium mb-auto mt-4 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Бүх их сургууль руу буцах</span>
          </Link>
        </div>
      </div>

      {/* Header Profile Info Card */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-20">
        <div className="clay-card p-6 sm:p-8">
          <div className="flex flex-col lg:flex-row items-start justify-between gap-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-3xl overflow-hidden bg-white dark:bg-navy-950 border-2 border-gold/40 shadow-[inset_0_2px_4px_rgba(255,255,255,0.6),0_6px_12px_rgba(0,0,0,0.1)] shrink-0 p-2 flex items-center justify-center">
                <div className="relative w-full h-full rounded-2xl overflow-hidden">
                  <Image
                    src={university.logo}
                    alt={university.name}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="px-3.5 py-1 rounded-full text-xs font-extrabold bg-navy-900 text-white dark:bg-gold dark:text-navy-950 shadow-sm">
                    {university.type} өмчит
                  </span>
                  <VerificationBadge verification={university.verification} size="md" />
                  {university.rankingText && (
                    <span className="text-xs text-gold-700 dark:text-gold font-bold">
                      ★ {university.rankingText}
                    </span>
                  )}
                </div>

                <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-navy-900 dark:text-white leading-tight">
                  {university.name} ({university.shortName})
                </h1>
                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1 font-medium">
                  {university.englishName}
                </p>

                <div className="flex flex-wrap items-center gap-4 mt-3 text-xs text-gray-600 dark:text-gray-300 font-medium">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-gold shrink-0" />
                    <span>{university.location}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Globe className="w-4 h-4 text-gold shrink-0" />
                    <a
                      href={university.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline flex items-center gap-0.5 text-gold font-semibold"
                    >
                      <span>Албан ёсны вэб</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 self-stretch sm:self-auto shrink-0">
              <button
                type="button"
                onClick={() => {
                  if (comparing) removeUniversity(university.id);
                  else addUniversity(university.id);
                }}
                className={`flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl text-xs font-bold transition-all ${
                  comparing
                    ? 'clay-btn-gold text-navy-950'
                    : 'clay-btn-surface text-navy-900 dark:text-white'
                }`}
              >
                <Scale className="w-4 h-4" />
                <span>{comparing ? 'Харьцуулалтад орсон' : 'Харьцуулах'}</span>
              </button>

              <button
                type="button"
                onClick={() => toggleSaveUniversity(university.id)}
                className={`p-3 rounded-2xl transition-all ${
                  saved
                    ? 'clay-btn-gold text-navy-950'
                    : 'clay-btn-surface text-gray-400 hover:text-navy-900 dark:hover:text-white'
                }`}
                title={saved ? 'Хадгалсан' : 'Хадгалах'}
              >
                <Bookmark className={`w-4 h-4 ${saved ? 'fill-current' : ''}`} />
              </button>

              <a
                href={university.admissionWebsite}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-6 py-3 rounded-2xl clay-btn-gold text-navy-950 text-xs font-extrabold"
              >
                <span>Элсэлтийн систем</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Quick Metrics Ticker */}
          <div className="clay-recessed grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 p-4 rounded-2xl text-center">
            <div className="p-3 bg-white/60 dark:bg-navy-900/60 rounded-xl">
              <span className="text-[10px] text-gray-400 block uppercase font-medium">Үүсгэн байгуулагдсан</span>
              <span className="text-base font-extrabold text-navy-900 dark:text-white">
                {university.foundedYear} он
              </span>
            </div>
            <div className="p-3 bg-white/60 dark:bg-navy-900/60 rounded-xl">
              <span className="text-[10px] text-gray-400 block uppercase font-medium">Нийт оюутан</span>
              <span className="text-base font-extrabold text-navy-900 dark:text-white">
                {university.studentCount.toLocaleString()}+
              </span>
            </div>
            <div className="p-3 bg-white/60 dark:bg-navy-900/60 rounded-xl">
              <span className="text-[10px] text-gray-400 block uppercase font-medium">Хөтөлбөр (Бакалавр)</span>
              <span className="text-base font-extrabold text-navy-900 dark:text-white">
                {university.programCount}
              </span>
            </div>
            <div className="p-3 bg-white/60 dark:bg-navy-900/60 rounded-xl">
              <span className="text-[10px] text-gray-400 block uppercase font-medium">ЭЕШ босго оноо</span>
              <span className="text-base font-extrabold text-gold">
                {university.highlightScores.minScore}+
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Tabs Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="flex items-center gap-2 overflow-x-auto pb-3 pt-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all shrink-0 ${
                  isActive
                    ? 'clay-pill bg-navy-900 text-white dark:bg-gold dark:text-navy-950 font-extrabold shadow-sm'
                    : 'clay-btn-surface text-gray-700 dark:text-gray-300 font-semibold'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Contents Area */}
        <div className="mt-6">
          {/* 1. Ерөнхий мэдээлэл */}
          {activeTab === 'general' && (
            <div className="space-y-6">
              <div className="clay-card p-6 sm:p-8">
                <h2 className="text-lg font-bold text-navy-900 dark:text-white mb-3 flex items-center gap-2">
                  <Building className="w-5 h-5 text-gold" />
                  <span>Их сургуулийн танилцуулга</span>
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                  {university.description}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 pt-6 border-t border-gray-100 dark:border-navy-800 text-xs">
                  <div>
                    <span className="font-semibold text-gray-500 block mb-1">Магадлан итгэмжлэл:</span>
                    <p className="font-medium text-navy-900 dark:text-white">{university.accreditation}</p>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-500 block mb-1">Салбар сургуулиуд:</span>
                    <p className="font-medium text-navy-900 dark:text-white">{university.facultyCount} салбар сургууль</p>
                  </div>
                </div>
              </div>

              {/* Faculties list */}
              <div className="clay-card p-6 sm:p-8">
                <h3 className="text-base font-bold text-navy-900 dark:text-white mb-4">
                  Салбар сургууль ба тэнхимүүд
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {university.faculties.map((fac) => (
                    <div
                      key={fac.id}
                      className="p-3.5 bg-surface-light-subtle dark:bg-navy-950 rounded-xl border border-gray-100 dark:border-navy-800"
                    >
                      <h4 className="font-bold text-xs text-navy-900 dark:text-white mb-1">
                        {fac.name}
                      </h4>
                      <span className="text-[11px] text-gray-500">{fac.majorsCount} мэргэжлийн хөтөлбөр</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 2. Мэргэжил */}
          {activeTab === 'majors' && (
            <div className="clay-card p-6 sm:p-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-navy-900 dark:text-white flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-gold" />
                  <span>Бакалаврын мэргэжлийн хөтөлбөрүүд</span>
                </h2>
                <span className="text-xs text-gray-400">Нийт {university.majors.length} хөтөлбөр</span>
              </div>

              <div className="space-y-4">
                {university.majors.map((major) => (
                  <div
                    key={major.id}
                    className="p-4 bg-surface-light-subtle dark:bg-navy-950 rounded-xl border border-gray-200/80 dark:border-navy-800"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                      <div>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-gold/10 text-gold-700 dark:text-gold mr-2">
                          {major.facultyName}
                        </span>
                        <h3 className="inline font-bold text-sm text-navy-900 dark:text-white">
                          {major.name}
                        </h3>
                      </div>
                      <div className="flex items-center gap-2 text-xs">
                        <span className="font-semibold text-navy-900 dark:text-gray-200">
                          Босго: <strong>{major.thresholdScore}+</strong>
                        </span>
                        <span className="text-gray-400">•</span>
                        <span className="font-bold text-gold">{major.creditPrice.toLocaleString()}₮/кр</span>
                      </div>
                    </div>

                    <div className="text-xs text-gray-500 dark:text-gray-400 space-y-1">
                      <div>
                        <strong>Шалгалтын хичээл:</strong> {major.examSubjects.join(', ')}
                      </div>
                      {major.notes && <div><strong>Тайлбар:</strong> {major.notes}</div>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 3. Элсэлт */}
          {activeTab === 'admission' && (
            <div className="space-y-6">
              <div className="clay-card p-6 sm:p-8">
                <h2 className="text-lg font-bold text-navy-900 dark:text-white mb-4 flex items-center gap-2">
                  <FileCheck className="w-5 h-5 text-gold" />
                  <span>Элсэлтийн ерөнхий шаардлага ба хуваарь</span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                      Тавигдах шаардлага
                    </h3>
                    <ul className="space-y-2 text-xs text-gray-600 dark:text-gray-300">
                      {university.admission.requirements.map((req, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                      Бүрдүүлэх бичиг баримт
                    </h3>
                    <ul className="space-y-2 text-xs text-gray-600 dark:text-gray-300">
                      {university.admission.requiredDocuments.map((doc, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                          <span>{doc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-100 dark:border-navy-800">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">
                    Элсэлтийн хуанли
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    {university.admission.applicationDates.map((dt, i) => (
                      <div
                        key={i}
                        className="p-3 bg-surface-light-subtle dark:bg-navy-950 rounded-xl border border-gray-100 dark:border-navy-800 text-xs"
                      >
                        <span className="text-gold font-bold block mb-0.5">{dt.date}</span>
                        <span className="font-semibold text-navy-900 dark:text-white">{dt.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 4. Босго оноо */}
          {activeTab === 'threshold' && (
            <div className="clay-card p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                <div>
                  <h2 className="text-lg font-bold text-navy-900 dark:text-white flex items-center gap-2">
                    <GraduationCap className="w-5 h-5 text-gold" />
                    <span>Мэргэжил тус бүрийн ЭЕШ-ын босго онооны хүснэгт</span>
                  </h2>
                  <p className="text-xs text-gray-500">
                    Эх сурвалж: {university.verification.sourceName} ({university.verification.lastUpdated})
                  </p>
                </div>
                <VerificationBadge verification={university.verification} size="sm" />
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm border-collapse">
                  <thead>
                    <tr className="bg-surface-light-subtle dark:bg-navy-950 border-b border-gray-200 dark:border-navy-800 text-gray-500 dark:text-gray-400 font-bold">
                      <th className="p-3">Мэргэжил</th>
                      <th className="p-3">Салбар</th>
                      <th className="p-3">Шалгалтын хичээл</th>
                      <th className="p-3">Босго оноо</th>
                      <th className="p-3">Тайлбар</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-navy-800 text-navy-900 dark:text-gray-200">
                    {university.majors.map((m) => (
                      <tr key={m.id} className="hover:bg-gray-50/60 dark:hover:bg-navy-800/40">
                        <td className="p-3 font-bold">{m.name}</td>
                        <td className="p-3 text-gray-500">{m.facultyName}</td>
                        <td className="p-3">{m.examSubjects.join(', ')}</td>
                        <td className="p-3 font-extrabold text-gold">{m.thresholdScore}+</td>
                        <td className="p-3 text-xs text-gray-500">{m.notes || '—'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* 5. Төлбөр */}
          {activeTab === 'tuition' && (
            <div className="clay-card p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                <div>
                  <h2 className="text-lg font-bold text-navy-900 dark:text-white flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-gold" />
                    <span>Сургалтын төлбөр & Нэг багц цагийн тариф</span>
                  </h2>
                  <p className="text-xs text-gray-500">
                    Эх сурвалж: {university.verification.sourceName} ({university.verification.lastUpdated})
                  </p>
                </div>
                <VerificationBadge verification={university.verification} size="sm" />
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm border-collapse">
                  <thead>
                    <tr className="bg-surface-light-subtle dark:bg-navy-950 border-b border-gray-200 dark:border-navy-800 text-gray-500 dark:text-gray-400 font-bold">
                      <th className="p-3">Мэргэжлийн чиглэл</th>
                      <th className="p-3">1 багц цаг (Кредит)</th>
                      <th className="p-3">Жилийн төлбөр (ойролцоогоор)</th>
                      <th className="p-3">Төлөлт хийх боломж</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-navy-800 text-navy-900 dark:text-gray-200">
                    {university.majors.map((m) => (
                      <tr key={m.id} className="hover:bg-gray-50/60 dark:hover:bg-navy-800/40">
                        <td className="p-3 font-bold">{m.name}</td>
                        <td className="p-3 font-bold text-gold">{m.creditPrice.toLocaleString()}₮</td>
                        <td className="p-3 font-extrabold text-navy-900 dark:text-white">
                          {m.annualTuition.toLocaleString()}₮
                        </td>
                        <td className="p-3 text-xs text-gray-500">2-4 хувааж төлөх боломжтой</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* 6. Тэтгэлэг */}
          {activeTab === 'scholarships' && (
            <div className="clay-card p-6 sm:p-8">
              <h2 className="text-lg font-bold text-navy-900 dark:text-white mb-4 flex items-center gap-2">
                <Award className="w-5 h-5 text-gold" />
                <span>Олгогдох тэтгэлэгт хөтөлбөрүүд</span>
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {university.scholarships.map((sch, i) => (
                  <div
                    key={i}
                    className="p-4 bg-surface-light-subtle dark:bg-navy-950 rounded-xl border border-gray-200 dark:border-navy-800"
                  >
                    <h3 className="font-bold text-sm text-navy-900 dark:text-white mb-1">
                      {sch.name}
                    </h3>
                    <p className="text-xs text-gold font-semibold mb-2">{sch.coverage}</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">{sch.eligibility}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 7. Дотуур байр */}
          {activeTab === 'dormitory' && (
            <div className="clay-card p-6 sm:p-8">
              <h2 className="text-lg font-bold text-navy-900 dark:text-white mb-4 flex items-center gap-2">
                <Home className="w-5 h-5 text-gold" />
                <span>Оюутны дотуур байрны мэдээлэл</span>
              </h2>

              {university.dormitory.available ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                  <div className="p-4 bg-surface-light-subtle dark:bg-navy-950 rounded-xl border border-gray-200 dark:border-navy-800">
                    <span className="text-gray-400 block mb-1">Нийт суудал</span>
                    <span className="text-lg font-extrabold text-navy-900 dark:text-white">
                      {university.dormitory.capacity} суудал
                    </span>
                  </div>
                  <div className="p-4 bg-surface-light-subtle dark:bg-navy-950 rounded-xl border border-gray-200 dark:border-navy-800">
                    <span className="text-gray-400 block mb-1">Сар тутмын төлбөр</span>
                    <span className="text-lg font-extrabold text-gold">
                      {university.dormitory.feePerMonth}
                    </span>
                  </div>
                  <div className="p-4 bg-surface-light-subtle dark:bg-navy-950 rounded-xl border border-gray-200 dark:border-navy-800">
                    <span className="text-gray-400 block mb-1">Өргөдөл хүлээн авах</span>
                    <span className="text-lg font-extrabold text-navy-900 dark:text-white">
                      {university.dormitory.applicationDeadline || '8-р сарын 25'}
                    </span>
                  </div>
                  <div className="md:col-span-3 p-4 bg-gray-50 dark:bg-navy-950 rounded-xl border border-gray-100 dark:border-navy-800 text-gray-600 dark:text-gray-300">
                    <strong>Нөхцөл:</strong> {university.dormitory.conditions}
                  </div>
                </div>
              ) : (
                <p className="text-sm text-gray-500">
                  Энэ сургууль нь өөрийн эзэмшлийн дотуур байргүй бөгөөд холбогдох оюутны байранд зуучилдаг.
                </p>
              )}
            </div>
          )}

          {/* 8. Мэдээ & Түгээмэл асуултууд */}
          {activeTab === 'news' && (
            <div className="space-y-6">
              <div className="clay-card p-6 sm:p-8">
                <h2 className="text-lg font-bold text-navy-900 dark:text-white mb-4 flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-gold" />
                  <span>Түгээмэл асуулт хариулт (FAQ)</span>
                </h2>

                <div className="space-y-3">
                  {(university.faqs || [
                    {
                      question: 'Хөдөө орон нутгаас хэрхэн бүртгүүлэх вэ?',
                      answer: 'Сургуулийн албан ёсны элсэлтийн системээр 100% цахимаар бүртгүүлж, онооны дарааллаар хуваарь авна.',
                    },
                    {
                      question: 'Сургалтын төлбөрийг хэрхэн төлөх вэ?',
                      answer: 'Банкны апп болон цахим картаар улирал эсвэл хичээлийн жилээр хуваан төлөх боломжтой.',
                    },
                  ]).map((faq, i) => (
                    <div
                      key={i}
                      className="p-4 bg-surface-light-subtle dark:bg-navy-950 rounded-xl border border-gray-200 dark:border-navy-800"
                    >
                      <h4 className="font-bold text-xs sm:text-sm text-navy-900 dark:text-white mb-1">
                        {faq.question}
                      </h4>
                      <p className="text-xs text-gray-600 dark:text-gray-400">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 9. Холбоо барих */}
          {activeTab === 'contact' && (
            <div className="clay-card p-6 sm:p-8">
              <h2 className="text-lg font-bold text-navy-900 dark:text-white mb-4 flex items-center gap-2">
                <Phone className="w-5 h-5 text-gold" />
                <span>Холбоо барих хаяг & Элсэлтийн алба</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
                <div className="p-4 bg-surface-light-subtle dark:bg-navy-950 rounded-xl border border-gray-200 dark:border-navy-800 space-y-2">
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                    <MapPin className="w-4 h-4 text-gold shrink-0" />
                    <span>{university.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                    <Phone className="w-4 h-4 text-gold shrink-0" />
                    <span>{university.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                    <Mail className="w-4 h-4 text-gold shrink-0" />
                    <span>{university.email}</span>
                  </div>
                </div>

                <div className="p-4 bg-surface-light-subtle dark:bg-navy-950 rounded-xl border border-gray-200 dark:border-navy-800 space-y-2">
                  <span className="font-bold text-navy-900 dark:text-white block mb-1">
                    Цахим холбоосууд
                  </span>
                  <div>
                    <a
                      href={university.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gold font-semibold hover:underline inline-flex items-center gap-1"
                    >
                      <span>Албан ёсны вэб: {university.website}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                  <div>
                    <a
                      href={university.admissionWebsite}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gold font-semibold hover:underline inline-flex items-center gap-1"
                    >
                      <span>Элсэлтийн портал: {university.admissionWebsite}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
