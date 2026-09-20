'use client';

import React, { useState, useMemo } from 'react';
import { SCHOLARSHIPS } from '@/lib/data';
import { VerificationBadge } from '@/components/ui/VerificationBadge';
import { useAuth } from '@/context/AuthContext';
import { Award, Calendar, CheckCircle2, ExternalLink, Filter, Search, Bookmark } from 'lucide-react';

export default function ScholarshipsPage() {
  const { toggleSaveScholarship, isSavedScholarship } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = ['all', 'Дотоод', 'Гадаад', 'Их сургуулийн', 'Ахлах ангийн', 'Оюутны'];

  const filtered = useMemo(() => {
    let list = [...SCHOLARSHIPS];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (s) =>
          s.title.toLowerCase().includes(q) ||
          s.organization.toLowerCase().includes(q) ||
          s.targetAudience.toLowerCase().includes(q)
      );
    }

    if (selectedCategory !== 'all') {
      list = list.filter((s) => s.category === selectedCategory);
    }

    return list;
  }, [searchQuery, selectedCategory]);

  return (
    <div className="bg-surface-light-subtle dark:bg-navy-950 min-h-screen py-10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-8">
          <div className="flex items-center gap-2 text-xs font-bold text-gold uppercase tracking-wider mb-1">
            <Award className="w-4 h-4" />
            <span>Санхүүгийн дэмжлэг & Тэтгэлэг</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-navy-900 dark:text-white tracking-tight">
            Тэтгэлэг ба боломж
          </h1>
          <p className="mt-2 text-sm sm:text-base text-gray-600 dark:text-gray-300">
            Монгол Улсын Засгийн газар, Ерөнхийлөгчийн тэтгэлэг, олон улсын байгууллага, их сургуулиудын нэрэмжит тэтгэлэгт хөтөлбөрүүдийн шалгуур, өргөдөл хүлээн авах хугацаа.
          </p>
        </div>

        {/* Toolbar */}
        <div className="clay-card p-5 sm:p-6 mb-8 space-y-4">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Тэтгэлгийн нэр, байгууллагаар хайх..."
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl clay-input text-sm text-navy-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gold/50"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-gray-200/60 dark:border-navy-800/80 text-xs">
            <span className="font-bold text-gray-600 dark:text-gray-300 mr-1 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5 text-gold" /> Ангилал:
            </span>
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
                {cat === 'all' ? 'Бүх тэтгэлэг' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map((sch) => {
            const saved = isSavedScholarship(sch.id);

            return (
              <div
                key={sch.id}
                className="clay-card clay-card-hover p-6 sm:p-7 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-purple-100 text-purple-900 dark:bg-purple-950/80 dark:text-purple-300 border border-purple-200 dark:border-purple-800 shadow-sm">
                      {sch.category}
                    </span>
                    <div className="flex items-center gap-2">
                      <VerificationBadge verification={sch.verification} size="sm" />
                      <button
                        onClick={() => toggleSaveScholarship(sch.id)}
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

                  <h3 className="font-bold text-lg text-navy-900 dark:text-white mb-1 font-display">
                    {sch.title}
                  </h3>
                  <p className="text-xs text-gray-400 mb-4 font-medium">{sch.organization}</p>

                  <div className="clay-recessed p-4 rounded-2xl mb-4 text-xs">
                    <span className="font-extrabold text-gold block mb-1">Тэтгэлгийн хэмжээ:</span>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed font-medium">{sch.coverage}</p>
                  </div>

                  <div className="space-y-2 text-xs text-gray-600 dark:text-gray-300 mb-4">
                    <div>
                      <span className="font-bold text-navy-900 dark:text-white">Хэн хамрагдах:</span>{' '}
                      {sch.targetAudience}
                    </div>
                    <div>
                      <span className="font-bold text-navy-900 dark:text-white block mb-1">
                        Тавигдах шаардлага:
                      </span>
                      <ul className="space-y-1.5 pl-1">
                        {sch.requirements.map((req, i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                            <span>{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100 dark:border-navy-800/80 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs text-gold-700 dark:text-gold font-extrabold">
                    <Calendar className="w-4 h-4" />
                    <span>Дуусах хугацаа: {sch.deadline}</span>
                  </div>

                  <a
                    href={sch.applyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="clay-btn-gold px-4 py-2 rounded-xl text-navy-950 font-bold text-xs inline-flex items-center gap-1.5"
                  >
                    <span>Материал илгээх</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
