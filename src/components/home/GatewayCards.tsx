'use client';

import React from 'react';
import Link from 'next/link';
import { GraduationCap, School as SchoolIcon, Compass, Award, ArrowUpRight } from 'lucide-react';

export const GatewayCards: React.FC = () => {
  const cards = [
    {
      title: 'Их сургууль хайх',
      subtitle: 'Монгол Улсын төрийн болон хувийн их, дээд сургуулиудын нэгдсэн жагсаалт, босго оноо, сургалтын төлбөр.',
      href: '/universities',
      icon: GraduationCap,
      count: '12+ Их сургууль',
      badge: 'ЭЕШ босго оноо',
      gradient: 'from-blue-500/10 to-indigo-500/10 dark:from-blue-900/20 dark:to-indigo-900/20',
      accentColor: 'text-blue-600 dark:text-blue-400',
    },
    {
      title: 'Сургууль хайх (ЕБС)',
      subtitle: 'Бага, дунд, ахлах анги, гүнзгийрүүлсэн болон олон улсын ерөнхий боловсролын сургуулиудын лавлах.',
      href: '/schools',
      icon: SchoolIcon,
      count: '1-12-р анги',
      badge: 'Улсын & Хувийн',
      gradient: 'from-emerald-500/10 to-teal-500/10 dark:from-emerald-900/20 dark:to-teal-900/20',
      accentColor: 'text-emerald-600 dark:text-emerald-400',
    },
    {
      title: 'Мэргэжил хайх',
      subtitle: 'Ирээдүйд хамгийн их эрэлттэй 100+ мэргэжил, шаардагдах ЭЕШ хичээл, ажиллах салбар, сургадаг сургуулиуд.',
      href: '/majors',
      icon: Compass,
      count: '100+ Мэргэжил',
      badge: 'Ажлын байр',
      gradient: 'from-amber-500/10 to-gold/20 dark:from-amber-900/20 dark:to-gold/10',
      accentColor: 'text-gold-700 dark:text-gold',
    },
    {
      title: 'Тэтгэлэг хайх',
      subtitle: 'Ерөнхийлөгчийн тэтгэлэг, Засгийн газрын 100% дэмжлэг, дотоод болон гадаадын тэтгэлэгт хөтөлбөрүүд.',
      href: '/scholarships',
      icon: Award,
      count: 'Илгээлт-2100 г.м',
      badge: 'Санхүүжилт',
      gradient: 'from-purple-500/10 to-pink-500/10 dark:from-purple-900/20 dark:to-pink-900/20',
      accentColor: 'text-purple-600 dark:text-purple-400',
    },
  ];

  return (
    <section className="py-16 bg-surface-light-subtle dark:bg-navy-950 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-gold block mb-1">
            Хөтөч
          </span>
          <h2 className="text-3xl font-display font-extrabold text-navy-900 dark:text-white">
            Та юу хайж байна?
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Өөрт тохирсон чиглэлээ сонгон хамгийн сүүлийн үеийн баталгаатай мэдээллийг аваарай.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <Link
                key={idx}
                href={card.href}
                className="group relative bg-white dark:bg-navy-900 rounded-2xl p-6 border border-gray-200/80 dark:border-navy-800 shadow-sm hover:shadow-xl hover:border-gold dark:hover:border-gold transition-all duration-300 transform hover:-translate-y-1 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${card.gradient} flex items-center justify-center ${card.accentColor} group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-gray-100 dark:bg-navy-800 text-gray-700 dark:text-gray-300">
                      {card.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-navy-900 dark:text-white group-hover:text-gold transition-colors flex items-center justify-between">
                    <span>{card.title}</span>
                    <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all text-gold" />
                  </h3>

                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 line-clamp-3 leading-relaxed">
                    {card.subtitle}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-100 dark:border-navy-800/80 flex items-center justify-between text-xs font-semibold">
                  <span className="text-navy-900 dark:text-gray-200">{card.count}</span>
                  <span className="text-gold group-hover:underline">Үзэх →</span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};
