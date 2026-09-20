'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { NEWS_ARTICLES } from '@/lib/data';
import { Newspaper, Calendar, ArrowRight } from 'lucide-react';

export const HomeNewsSection: React.FC = () => {
  const featured = NEWS_ARTICLES.slice(0, 3);

  return (
    <section className="py-16 bg-white dark:bg-navy-900 border-t border-gray-100 dark:border-navy-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-gold block mb-1">
              Цаг үеийн мэдээлэл
            </span>
            <h2 className="text-3xl font-display font-extrabold text-navy-900 dark:text-white">
              Боловсролын сүүлийн үеийн мэдээ
            </h2>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              ЭЕШ, сургуулийн элсэлт, тэтгэлэг болон шалгалтын албан ёсны шинэ мэдээллүүд.
            </p>
          </div>

          <Link
            href="/news"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-navy-900 dark:text-gold hover:underline shrink-0"
          >
            <span>Бүх мэдээг үзэх ({NEWS_ARTICLES.length})</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featured.map((article) => (
            <Link
              key={article.id}
              href={`/news?id=${article.id}`}
              className="group clay-card clay-card-hover overflow-hidden flex flex-col justify-between"
            >
              <div>
                <div className="relative h-48 w-full bg-gray-100 dark:bg-navy-800">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-3 py-1 rounded-full text-xs font-bold clay-pill bg-white/90 dark:bg-navy-900/90 text-navy-900 dark:text-white backdrop-blur shadow-sm">
                      {article.category}
                    </span>
                  </div>
                </div>

                <div className="p-5">
                  <div className="flex items-center gap-2 text-xs text-gray-400 mb-2">
                    <Calendar className="w-3.5 h-3.5 text-gold" />
                    <span>{article.date}</span>
                    <span>•</span>
                    <span className="truncate">{article.author}</span>
                  </div>

                  <h3 className="font-bold text-base text-navy-900 dark:text-white group-hover:text-gold transition-colors line-clamp-2 mb-2 leading-snug">
                    {article.title}
                  </h3>

                  <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-3 leading-relaxed">
                    {article.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0">
                <span className="text-xs font-bold text-gold group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                  Дэлгэрэнгүй унших <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
