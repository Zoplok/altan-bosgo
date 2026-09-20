'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCompare } from '@/context/CompareContext';
import { UNIVERSITIES, getUniversityById } from '@/lib/data';
import { VerificationBadge } from '@/components/ui/VerificationBadge';
import {
  Scale,
  Plus,
  X,
  MapPin,
  GraduationCap,
  DollarSign,
  Home,
  Award,
  Calendar,
  CheckCircle2,
  ExternalLink,
  ArrowRight,
} from 'lucide-react';

export default function ComparePage() {
  const { compareIds, removeUniversity, addUniversity, clearComparison } = useCompare();
  const [selectorOpen, setSelectorOpen] = useState(false);

  const selectedUnis = compareIds
    .map((id) => getUniversityById(id))
    .filter(Boolean);

  const availableUnis = UNIVERSITIES.filter((u) => !compareIds.includes(u.id));

  return (
    <div className="bg-surface-light-subtle dark:bg-navy-950 min-h-screen py-10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-gold uppercase tracking-wider mb-1">
              <Scale className="w-4 h-4" />
              <span>Зэрэгцүүлэн шинжлэх систем</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-navy-900 dark:text-white tracking-tight">
              Их сургууль харьцуулалт
            </h1>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Дээд тал нь 3 их сургуулийг нэг матрицаар байршил, босго оноо, сургалтын төлбөр, дотуур байр, тэтгэлэг зэргээр нь харьцуулаарай.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {compareIds.length > 0 && (
              <button
                onClick={clearComparison}
                className="clay-btn-surface px-4 py-2 rounded-2xl text-xs font-semibold text-gray-700 dark:text-gray-200 hover:text-red-500 transition-colors"
              >
                Бүгдийг цэвэрлэх
              </button>
            )}

            {compareIds.length < 3 && (
              <div className="relative">
                <button
                  onClick={() => setSelectorOpen(!selectorOpen)}
                  className="clay-btn-gold px-4 py-2.5 rounded-2xl text-navy-950 font-bold text-xs inline-flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>Сургууль нэмэх ({compareIds.length}/3)</span>
                </button>

                {selectorOpen && (
                  <div className="absolute right-0 top-full mt-2 w-72 clay-card p-3 z-30 space-y-1 animate-in fade-in-50">
                    <span className="text-[11px] font-bold text-gray-400 block px-2 mb-1">
                      Сонгох их сургууль:
                    </span>
                    {availableUnis.map((uni) => (
                      <button
                        key={uni.id}
                        onClick={() => {
                          addUniversity(uni.id);
                          setSelectorOpen(false);
                        }}
                        className="w-full text-left px-2.5 py-2 rounded-xl text-xs font-semibold text-navy-900 dark:text-white hover:bg-gold/15 dark:hover:bg-navy-800 transition-colors flex items-center justify-between"
                      >
                        <span className="truncate">{uni.name} ({uni.shortName})</span>
                        <span className="text-gold text-[10px] font-bold">Нэмэх +</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* If no universities selected */}
        {selectedUnis.length === 0 ? (
          <div className="clay-card p-12 text-center max-w-xl mx-auto">
            <Scale className="w-16 h-16 text-gold mx-auto mb-4" />
            <h2 className="text-xl font-bold text-navy-900 dark:text-white mb-2">
              Харьцуулах сургууль сонгогдоогүй байна
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
              Их сургуулиудын жагсаалтаас сонирхсон сургуулиудынхаа &ldquo;Харьцуулах&rdquo; товчийг дарж энэхүү матрицад оруулаарай.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <button
                onClick={() => {
                  addUniversity('num');
                  addUniversity('must');
                  addUniversity('mnums');
                }}
                className="clay-btn-gold px-4 py-2.5 rounded-2xl text-navy-950 font-bold text-xs"
              >
                Жишээ 3 сургууль оруулах (МУИС, ШУТИС, АШУҮИС)
              </button>
              <Link
                href="/universities"
                className="clay-btn-surface px-4 py-2.5 rounded-2xl text-navy-900 dark:text-white font-semibold text-xs"
              >
                Сургуулиуд үзэх
              </Link>
            </div>
          </div>
        ) : (
          /* Comparison Matrix Table */
          <div className="clay-card overflow-hidden p-1">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-surface-light-subtle dark:bg-navy-950 border-b border-gray-200 dark:border-navy-800">
                    <th className="p-5 font-bold text-gray-500 dark:text-gray-400 w-1/4 text-xs uppercase tracking-wider">
                      Үзүүлэлтүүд
                    </th>
                    {selectedUnis.map((uni) => {
                      if (!uni) return null;
                      return (
                        <th key={uni.id} className="p-5 w-1/4 align-top">
                          <div className="flex items-start justify-between gap-2 mb-3">
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-gray-200 dark:bg-navy-800 text-gray-700 dark:text-gray-300">
                              {uni.type}
                            </span>
                            <button
                              onClick={() => removeUniversity(uni.id)}
                              className="text-gray-400 hover:text-red-500 p-1"
                              title="Харьцуулалтаас хасах"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>

                          <div className="flex items-center gap-3 mb-2">
                            <div className="relative w-10 h-10 rounded-xl overflow-hidden bg-white border border-gray-100 dark:border-navy-800 shrink-0">
                              <Image src={uni.logo} alt={uni.name} fill className="object-cover" />
                            </div>
                            <div>
                              <h3 className="font-extrabold text-base text-navy-900 dark:text-white leading-tight">
                                {uni.shortName}
                              </h3>
                              <span className="text-[11px] text-gray-500 line-clamp-1">{uni.name}</span>
                            </div>
                          </div>

                          <Link
                            href={`/universities/${uni.id}`}
                            className="inline-flex items-center gap-1 text-xs font-bold text-gold hover:underline mt-1"
                          >
                            <span>Дэлгэрэнгүй үзэх</span>
                            <ArrowRight className="w-3 h-3" />
                          </Link>
                        </th>
                      );
                    })}
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100 dark:divide-navy-800 text-xs sm:text-sm text-navy-900 dark:text-gray-200">
                  {/* Row: Location */}
                  <tr className="hover:bg-gray-50/50 dark:hover:bg-navy-800/30">
                    <td className="p-4 sm:p-5 font-bold text-gray-500 dark:text-gray-400 flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-gold" />
                      <span>Байршил</span>
                    </td>
                    {selectedUnis.map((u) => (
                      <td key={u?.id} className="p-4 sm:p-5">
                        <span className="font-semibold block">{u?.city}</span>
                        <span className="text-xs text-gray-400">{u?.location}</span>
                      </td>
                    ))}
                  </tr>

                  {/* Row: Programs count */}
                  <tr className="hover:bg-gray-50/50 dark:hover:bg-navy-800/30">
                    <td className="p-4 sm:p-5 font-bold text-gray-500 dark:text-gray-400 flex items-center gap-1.5">
                      <GraduationCap className="w-4 h-4 text-gold" />
                      <span>Мэргэжлийн тоо</span>
                    </td>
                    {selectedUnis.map((u) => (
                      <td key={u?.id} className="p-4 sm:p-5">
                        <span className="font-extrabold text-base">{u?.programCount}</span> хөтөлбөр
                        <span className="block text-xs text-gray-400">{u?.facultyCount} салбар сургууль</span>
                      </td>
                    ))}
                  </tr>

                  {/* Row: Threshold score */}
                  <tr className="hover:bg-gray-50/50 dark:hover:bg-navy-800/30 bg-gold/5 dark:bg-gold/5">
                    <td className="p-4 sm:p-5 font-bold text-navy-900 dark:text-gold flex items-center gap-1.5">
                      <Award className="w-4 h-4 text-gold" />
                      <span>ЭЕШ Босго оноо</span>
                    </td>
                    {selectedUnis.map((u) => (
                      <td key={u?.id} className="p-4 sm:p-5">
                        <span className="text-base font-extrabold text-gold">{u?.highlightScores.minScore}+</span>
                        <span className="block text-xs text-gray-500">Дундаж оноо: {u?.highlightScores.avgScore}</span>
                      </td>
                    ))}
                  </tr>

                  {/* Row: Tuition */}
                  <tr className="hover:bg-gray-50/50 dark:hover:bg-navy-800/30">
                    <td className="p-4 sm:p-5 font-bold text-gray-500 dark:text-gray-400 flex items-center gap-1.5">
                      <DollarSign className="w-4 h-4 text-gold" />
                      <span>Сургалтын төлбөр</span>
                    </td>
                    {selectedUnis.map((u) => (
                      <td key={u?.id} className="p-4 sm:p-5">
                        <span className="font-bold text-gold">{u?.tuitionSummary.creditPrice.toLocaleString()}₮ / кр</span>
                        <span className="block text-xs text-gray-500 mt-0.5">
                          Жилд: {(u!.tuitionSummary.annualTuitionFrom / 1000000).toFixed(1)} - {(u!.tuitionSummary.annualTuitionTo / 1000000).toFixed(1)} сая₮
                        </span>
                      </td>
                    ))}
                  </tr>

                  {/* Row: Scholarships */}
                  <tr className="hover:bg-gray-50/50 dark:hover:bg-navy-800/30">
                    <td className="p-4 sm:p-5 font-bold text-gray-500 dark:text-gray-400 flex items-center gap-1.5">
                      <Award className="w-4 h-4 text-gold" />
                      <span>Тэтгэлэг</span>
                    </td>
                    {selectedUnis.map((u) => (
                      <td key={u?.id} className="p-4 sm:p-5">
                        <span className="font-bold">{u?.scholarships.length} тэтгэлэгт хөтөлбөр</span>
                        <ul className="mt-1 space-y-0.5 text-xs text-gray-500">
                          {u?.scholarships.slice(0, 2).map((s, i) => (
                            <li key={i}>• {s.name}</li>
                          ))}
                        </ul>
                      </td>
                    ))}
                  </tr>

                  {/* Row: Dormitory */}
                  <tr className="hover:bg-gray-50/50 dark:hover:bg-navy-800/30">
                    <td className="p-4 sm:p-5 font-bold text-gray-500 dark:text-gray-400 flex items-center gap-1.5">
                      <Home className="w-4 h-4 text-gold" />
                      <span>Дотуур байр</span>
                    </td>
                    {selectedUnis.map((u) => (
                      <td key={u?.id} className="p-4 sm:p-5">
                        {u?.dormitory.available ? (
                          <>
                            <span className="text-emerald-600 dark:text-emerald-400 font-bold block">
                              ✓ Байртай ({u.dormitory.capacity} суудал)
                            </span>
                            <span className="text-xs text-gray-400">{u.dormitory.feePerMonth}</span>
                          </>
                        ) : (
                          <span className="text-gray-400">Байргүй</span>
                        )}
                      </td>
                    ))}
                  </tr>

                  {/* Row: Admission Period */}
                  <tr className="hover:bg-gray-50/50 dark:hover:bg-navy-800/30">
                    <td className="p-4 sm:p-5 font-bold text-gray-500 dark:text-gray-400 flex items-center gap-1.5">
                      <Calendar className="w-4 h-4 text-gold" />
                      <span>Элсэлтийн хугацаа</span>
                    </td>
                    {selectedUnis.map((u) => (
                      <td key={u?.id} className="p-4 sm:p-5">
                        <span className="font-bold block">
                          {u?.admission.applicationDates[0]?.date || '6-р сарын 22'}
                        </span>
                        <span className="text-xs text-gray-400">
                          {u?.admission.applicationDates[0]?.label || 'Цахим бүртгэл'}
                        </span>
                      </td>
                    ))}
                  </tr>

                  {/* Row: Verification */}
                  <tr className="hover:bg-gray-50/50 dark:hover:bg-navy-800/30">
                    <td className="p-4 sm:p-5 font-bold text-gray-500 dark:text-gray-400">
                      Мэдээллийн эх сурвалж
                    </td>
                    {selectedUnis.map((u) => (
                      <td key={u?.id} className="p-4 sm:p-5">
                        <VerificationBadge verification={u!.verification} size="sm" showDetails />
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
