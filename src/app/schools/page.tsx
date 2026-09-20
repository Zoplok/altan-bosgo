'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { SCHOOLS } from '@/lib/data';
import { VerificationBadge } from '@/components/ui/VerificationBadge';
import {
  Search,
  Filter,
  MapPin,
  School as SchoolIcon,
  Phone,
  Mail,
  Calendar,
  Sparkles,
  ExternalLink,
  Users,
} from 'lucide-react';

export default function SchoolsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('all');
  const [selectedSchoolModal, setSelectedSchoolModal] = useState<any>(null);

  const districts = ['all', 'Сүхбаатар', 'Баянзүрх', 'Хан-Уул', 'Баянгол', 'Чингэлтэй', 'Сонгинохайрхан'];

  const filteredSchools = useMemo(() => {
    let list = [...SCHOOLS];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          (s.shortName && s.shortName.toLowerCase().includes(q)) ||
          s.description.toLowerCase().includes(q)
      );
    }

    if (selectedType !== 'all') {
      list = list.filter((s) => s.type === selectedType);
    }

    if (selectedDistrict !== 'all') {
      list = list.filter((s) => s.district === selectedDistrict);
    }

    if (selectedLevel !== 'all') {
      list = list.filter((s) => s.levels.includes(selectedLevel as any));
    }

    return list;
  }, [searchQuery, selectedType, selectedDistrict, selectedLevel]);

  return (
    <div className="bg-surface-light-subtle dark:bg-navy-950 min-h-screen py-10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-8">
          <div className="flex items-center gap-2 text-xs font-bold text-gold uppercase tracking-wider mb-1">
            <SchoolIcon className="w-4 h-4" />
            <span>Ерөнхий боловсролын нэгдсэн сан</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-navy-900 dark:text-white tracking-tight">
            ЕБС-ийн мэдээлэл
          </h1>
          <p className="mt-2 text-sm sm:text-base text-gray-600 dark:text-gray-300">
            Бага, дунд, ахлах сургуулиуд, олон улсын болон тусгай гүнзгийрүүлсэн сургалттай ерөнхий боловсролын сургуулиудын лавлах, клуб, зарлал, холбогдох мэдээлэл.
          </p>
        </div>

        {/* Filters Toolbar */}
        <div className="clay-card p-5 sm:p-6 mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Сургуулийн нэр, дугаар, онцлогоор хайх..."
                className="w-full pl-10 pr-4 py-2.5 rounded-2xl clay-input text-sm text-navy-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gold/50"
              />
            </div>

            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="px-3.5 py-2.5 rounded-2xl clay-input text-xs sm:text-sm font-semibold text-navy-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-gold/50 cursor-pointer"
            >
              <option value="all">Бүх дүүрэг</option>
              {districts.filter((d) => d !== 'all').map((d) => (
                <option key={d} value={d}>
                  {d} дүүрэг
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-gray-200/60 dark:border-navy-800/80 text-xs">
            <span className="font-bold text-gray-600 dark:text-gray-300 mr-1 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5 text-gold" /> Төрөл:
            </span>
            {[
              { id: 'all', label: 'Бүгд' },
              { id: 'Улсын', label: 'Улсын' },
              { id: 'Хувийн', label: 'Хувийн' },
              { id: 'Гүнзгийрүүлсэн', label: 'Гүнзгийрүүлсэн' },
              { id: 'Олон улсын', label: 'Олон улсын' },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setSelectedType(t.id)}
                className={`px-3.5 py-1.5 rounded-xl transition-all text-xs ${
                  selectedType === t.id
                    ? 'clay-pill bg-navy-900 text-white dark:bg-gold dark:text-navy-950 font-extrabold shadow-sm'
                    : 'clay-btn-surface text-gray-700 dark:text-gray-300 font-semibold'
                }`}
              >
                {t.label}
              </button>
            ))}

            <span className="font-bold text-gray-600 dark:text-gray-300 ml-3 mr-1">Ангилал:</span>
            {['all', 'Бага', 'Дунд', 'Ахлах'].map((lvl) => (
              <button
                key={lvl}
                onClick={() => setSelectedLevel(lvl)}
                className={`px-3.5 py-1.5 rounded-xl transition-all text-xs ${
                  selectedLevel === lvl
                    ? 'clay-pill bg-navy-900 text-white dark:bg-gold dark:text-navy-950 font-extrabold shadow-sm'
                    : 'clay-btn-surface text-gray-700 dark:text-gray-300 font-semibold'
                }`}
              >
                {lvl === 'all' ? 'Бүх шат' : `${lvl} анги`}
              </button>
            ))}
          </div>
        </div>

        {/* Results List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSchools.map((school) => (
            <div
              key={school.id}
              className="clay-card clay-card-hover overflow-hidden flex flex-col justify-between p-0"
            >
              <div>
                <div className="relative h-48 w-full bg-gray-100 dark:bg-navy-800">
                  <Image
                    src={school.image}
                    alt={school.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-3 left-3 flex gap-1.5">
                    <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-navy-950/85 text-white backdrop-blur shadow-md">
                      {school.type}
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/90 dark:bg-navy-800/90 text-navy-900 dark:text-gray-200 backdrop-blur shadow-sm">
                      {school.levels.join(', ')}
                    </span>
                  </div>
                </div>

                <div className="p-5 sm:p-6">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-1 text-[11px] text-gray-400 font-medium">
                      <MapPin className="w-3.5 h-3.5 text-gold" />
                      <span>{school.district} дүүрэг</span>
                    </div>
                    <VerificationBadge verification={school.verification} size="sm" />
                  </div>

                  <h3 className="font-bold text-base text-navy-900 dark:text-white line-clamp-1 mb-1 font-display">
                    {school.name}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 leading-relaxed mb-4 font-medium">
                    {school.description}
                  </p>

                  <div className="space-y-1.5 pt-3 border-t border-gray-100 dark:border-navy-800/80 text-xs text-gray-600 dark:text-gray-300 font-medium">
                    <div className="flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-gold shrink-0" />
                      <span>{school.phone}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-gold shrink-0" />
                      <span>Нийт {school.studentCount} сурагч</span>
                    </div>
                  </div>

                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {school.clubs.slice(0, 3).map((c, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-0.5 rounded-lg clay-recessed text-[10px] font-semibold text-gray-600 dark:text-gray-300"
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-5 sm:p-6 pt-0">
                <button
                  type="button"
                  onClick={() => setSelectedSchoolModal(school)}
                  className="w-full py-2.5 rounded-xl clay-btn-surface text-navy-900 dark:text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 hover:text-gold"
                >
                  <span>Дэлгэрэнгүй үзэх</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Modal Popup for Detailed School View */}
        {selectedSchoolModal && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="clay-card max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl border-gold/40 animate-in zoom-in-95">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <span className="text-xs font-extrabold text-gold uppercase tracking-wider block mb-1">
                    {selectedSchoolModal.type} • {selectedSchoolModal.district} дүүрэг
                  </span>
                  <h2 className="text-xl sm:text-2xl font-bold text-navy-900 dark:text-white font-display">
                    {selectedSchoolModal.name}
                  </h2>
                </div>
                <button
                  onClick={() => setSelectedSchoolModal(null)}
                  className="p-2 rounded-xl clay-btn-surface text-gray-400 hover:text-navy-900 dark:hover:text-white text-sm font-bold"
                >
                  ✕
                </button>
              </div>

              <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                {selectedSchoolModal.description}
              </p>

              <div className="space-y-4 text-xs sm:text-sm">
                <div className="clay-recessed p-4 sm:p-5 rounded-2xl">
                  <h4 className="font-bold text-navy-900 dark:text-white mb-2 font-display">
                    Холбоо барих мэдээлэл
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300">
                    <strong>Хаяг:</strong> {selectedSchoolModal.address}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 mt-1">
                    <strong>Утас:</strong> {selectedSchoolModal.phone} | <strong>И-мэйл:</strong> {selectedSchoolModal.email}
                  </p>
                  {selectedSchoolModal.website && (
                    <a
                      href={selectedSchoolModal.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-flex items-center gap-1 text-gold font-bold hover:underline"
                    >
                      <span>Албан ёсны веб хуудас</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>

                <div className="clay-recessed p-4 sm:p-5 rounded-2xl">
                  <h4 className="font-bold text-navy-900 dark:text-white mb-2 font-display">
                    Сүүлийн үеийн зарлалууд
                  </h4>
                  <ul className="space-y-2 text-xs text-gray-600 dark:text-gray-300">
                    {selectedSchoolModal.announcements.map((ann: any, i: number) => (
                      <li key={i} className="flex items-center justify-between gap-2">
                        <span>• {ann.title}</span>
                        <span className="text-gray-400 shrink-0 font-medium">{ann.date}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-200 dark:border-navy-800/80 flex justify-end">
                <button
                  onClick={() => setSelectedSchoolModal(null)}
                  className="clay-btn-navy px-6 py-2.5 rounded-xl text-white text-xs font-bold"
                >
                  Хаах
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
