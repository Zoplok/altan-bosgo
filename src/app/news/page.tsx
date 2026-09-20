'use client';

import React, { useState, useMemo, useEffect, Suspense } from 'react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { NEWS_ARTICLES } from '@/lib/data';
import { Newspaper, Calendar, ExternalLink, Filter, Search } from 'lucide-react';

function NewsContent() {
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeArticle, setActiveArticle] = useState<any>(null);

  useEffect(() => {
    const id = searchParams.get('id');
    if (id) {
      const match = NEWS_ARTICLES.find((a) => a.id === id);
      if (match) setActiveArticle(match);
    }
  }, [searchParams]);

  const categories = [
    'all',
    'Их, дээд сургууль',
    'ЕБС',
    'Элсэлт',
    'Тэтгэлэг',
    'Шалгалт',
    'Уралдаан',
    'Сургалт',
  ];

  const filtered = useMemo(() => {
    let list = [...NEWS_ARTICLES];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (n) =>
          n.title.toLowerCase().includes(q) ||
          n.excerpt.toLowerCase().includes(q) ||
          n.content.toLowerCase().includes(q)
      );
    }

    if (selectedCategory !== 'all') {
      list = list.filter((n) => n.category === selectedCategory);
    }

    return list;
  }, [searchQuery, selectedCategory]);

  return (
    <div className="bg-surface-light-subtle dark:bg-navy-950 min-h-screen py-10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-8">
          <div className="flex items-center gap-2 text-xs font-bold text-gold uppercase tracking-wider mb-1">
            <Newspaper className="w-4 h-4" />
            <span>Боловсролын мэдээний нэгдсэн сан</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-navy-900 dark:text-white tracking-tight">
            Боловсролын мэдээ & Мэдэгдэл
          </h1>
          <p className="mt-2 text-sm sm:text-base text-gray-600 dark:text-gray-300">
            Монгол Улсын ерөнхий боловсрол, их дээд сургуулийн элсэлт, тэтгэлэг болон шалгалтын албан ёсны шинэ мэдээллүүд.
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
              placeholder="Мэдээний гарчиг, түлхүүр үгээр хайх..."
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
                {cat === 'all' ? 'Бүх мэдээ' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filtered.map((article) => (
            <div
              key={article.id}
              className="clay-card clay-card-hover overflow-hidden flex flex-col justify-between p-0"
            >
              <div>
                <div className="relative h-48 w-full bg-gray-100 dark:bg-navy-800">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-navy-950/85 text-white backdrop-blur shadow-md">
                      {article.category}
                    </span>
                  </div>
                </div>

                <div className="p-5 sm:p-6">
                  <div className="flex items-center gap-2 text-xs text-gray-400 mb-2 font-medium">
                    <Calendar className="w-3.5 h-3.5 text-gold" />
                    <span>{article.date}</span>
                    <span>•</span>
                    <span className="truncate">{article.author}</span>
                  </div>

                  <h3 className="font-bold text-base text-navy-900 dark:text-white line-clamp-2 mb-2 leading-snug font-display">
                    {article.title}
                  </h3>

                  <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-3 leading-relaxed font-medium">
                    {article.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-5 sm:p-6 pt-0">
                <button
                  onClick={() => setActiveArticle(article)}
                  className="w-full py-2.5 rounded-xl clay-btn-surface text-navy-900 dark:text-white text-xs font-bold transition-all flex items-center justify-center gap-1 hover:text-gold"
                >
                  <span>Бүрэн эхээр нь унших</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Modal for Reading Full Article */}
        {activeArticle && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="clay-card max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl border-gold/40 animate-in zoom-in-95">
              <div className="flex items-start justify-between gap-4 mb-3">
                <span className="text-xs font-extrabold text-gold uppercase tracking-wider">
                  {activeArticle.category} • {activeArticle.date}
                </span>
                <button
                  onClick={() => setActiveArticle(null)}
                  className="p-2 rounded-xl clay-btn-surface text-gray-400 hover:text-navy-900 dark:hover:text-white text-sm font-bold"
                >
                  ✕
                </button>
              </div>

              <h2 className="text-xl sm:text-2xl font-bold text-navy-900 dark:text-white mb-4 font-display">
                {activeArticle.title}
              </h2>

              <div className="relative h-60 w-full rounded-2xl overflow-hidden mb-6 bg-gray-100 dark:bg-navy-950 shadow-[inset_0_2px_4px_rgba(255,255,255,0.4),0_6px_12px_rgba(0,0,0,0.1)]">
                <Image
                  src={activeArticle.image}
                  alt={activeArticle.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-line leading-relaxed mb-6 font-medium">
                {activeArticle.content}
              </div>

              <div className="clay-recessed p-4 rounded-2xl flex items-center justify-between text-xs">
                <span>
                  <strong className="text-navy-900 dark:text-white">Эх сурвалж:</strong> {activeArticle.sourceName}
                </span>
                {activeArticle.sourceUrl && (
                  <a
                    href={activeArticle.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-gold font-bold hover:underline"
                  >
                    <span>Эх сурвалж үзэх</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function NewsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen py-20 flex items-center justify-center">
        <div className="clay-card p-8 text-center max-w-sm">
          <Newspaper className="w-8 h-8 text-gold mx-auto mb-2 animate-bounce" />
          <span className="text-sm font-bold text-navy-900 dark:text-white">Уншиж байна...</span>
        </div>
      </div>
    }>
      <NewsContent />
    </Suspense>
  );
}
