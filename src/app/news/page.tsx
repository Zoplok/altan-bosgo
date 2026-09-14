'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { NEWS_ARTICLES } from '@/lib/data';
import { Newspaper, Calendar, ExternalLink, Filter, Search } from 'lucide-react';

export default function NewsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeArticle, setActiveArticle] = useState<any>(null);

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
        <div className="bg-white dark:bg-navy-900 rounded-2xl border border-gray-200 dark:border-navy-800 p-5 shadow-sm mb-8 space-y-4">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Мэдээний гарчиг, түлхүүр үгээр хайх..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-gray-50 dark:bg-navy-950 border border-gray-200 dark:border-navy-700 text-sm text-navy-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-gold"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-gray-100 dark:border-navy-800 text-xs">
            <span className="font-semibold text-gray-500 dark:text-gray-400 mr-1 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" /> Ангилал:
            </span>
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
              className="bg-white dark:bg-navy-900 rounded-2xl border border-gray-200/80 dark:border-navy-800 overflow-hidden shadow-sm hover:shadow-xl hover:border-gold transition-all duration-300 flex flex-col justify-between"
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
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-navy-900/90 text-white backdrop-blur shadow">
                      {article.category}
                    </span>
                  </div>
                </div>

                <div className="p-5">
                  <div className="flex items-center gap-2 text-xs text-gray-400 mb-2">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{article.date}</span>
                    <span>•</span>
                    <span className="truncate">{article.author}</span>
                  </div>

                  <h3 className="font-bold text-base text-navy-900 dark:text-white line-clamp-2 mb-2 leading-snug">
                    {article.title}
                  </h3>

                  <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-3 leading-relaxed">
                    {article.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0">
                <button
                  onClick={() => setActiveArticle(article)}
                  className="w-full py-2.5 rounded-xl bg-gray-50 dark:bg-navy-800 hover:bg-gold hover:text-navy-900 text-navy-900 dark:text-white text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-1"
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
            <div className="bg-white dark:bg-navy-900 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl border border-gold/30">
              <div className="flex items-start justify-between gap-4 mb-3">
                <span className="text-xs font-bold text-gold uppercase tracking-wider">
                  {activeArticle.category} • {activeArticle.date}
                </span>
                <button
                  onClick={() => setActiveArticle(null)}
                  className="text-gray-400 hover:text-navy-900 dark:hover:text-white text-lg font-bold"
                >
                  ✕
                </button>
              </div>

              <h2 className="text-xl sm:text-2xl font-bold text-navy-900 dark:text-white mb-4">
                {activeArticle.title}
              </h2>

              <div className="relative h-60 w-full rounded-2xl overflow-hidden mb-6 bg-gray-100">
                <Image
                  src={activeArticle.image}
                  alt={activeArticle.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-line leading-relaxed mb-6">
                {activeArticle.content}
              </div>

              <div className="p-4 bg-surface-light-subtle dark:bg-navy-950 rounded-2xl border border-gray-100 dark:border-navy-800 flex items-center justify-between text-xs">
                <span>
                  <strong>Эх сурвалж:</strong> {activeArticle.sourceName}
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
