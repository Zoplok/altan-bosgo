'use client';

import React from 'react';
import Link from 'next/link';
import { Calendar, FileText, CheckSquare, Award, ArrowRight, ShieldCheck } from 'lucide-react';

export const HomeAdmissionSection: React.FC = () => {
  const steps = [
    {
      step: '01',
      title: 'ЭЕШ-д бэлдэх & Бүртгүүлэх',
      desc: 'Боловсролын Үнэлгээний Төвийн eyesh.eec.mn системд 4-5-р сард бүртгүүлж, шалгалтаа өгнө.',
      icon: FileText,
    },
    {
      step: '02',
      title: 'Босго оноо & Мэргэжил сонгох',
      desc: 'Алтан босго системээс их сургуулиудын албан ёсоор баталсан босго оноог шалгаж, өөрийн оноонд нийцүүлэх.',
      icon: CheckSquare,
    },
    {
      step: '03',
      title: 'Их сургуулийн цахим бүртгэл',
      desc: '6-р сарын сүүлээр сургуулиудын элсэлтийн системээр дамжуулан хүсэлтээ илгээж, онооны жагсаалтаар хуваарилагдах.',
      icon: Calendar,
    },
    {
      step: '04',
      title: 'Батламж & Тэтгэлэг авах',
      desc: 'Суралцах эрхийн бичгээ баталгаажуулж, оюутны дотуур байр болон тэтгэлэгт материалаа өгнө.',
      icon: Award,
    },
  ];

  return (
    <section className="py-16 bg-white dark:bg-navy-900 border-t border-gray-100 dark:border-navy-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-gold block mb-1">
            Элсэлтийн гарын авлага
          </span>
          <h2 className="text-3xl font-display font-extrabold text-navy-900 dark:text-white">
            Их, дээд сургуульд элсэх 4 үндсэн алхам
          </h2>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Монгол Улсын их, дээд сургуулиудад элсэхэд шаардлагатай албан ёсны дараалал, дүрэм журам
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="clay-card clay-card-hover p-6 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-2xl font-black text-gray-300 dark:text-navy-700 group-hover:text-gold transition-colors">
                      {item.step}
                    </span>
                    <div className="w-12 h-12 rounded-2xl clay-pill bg-gold/15 text-gold-700 dark:text-gold flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>
                  <h3 className="text-base font-bold text-navy-900 dark:text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-10 p-5 rounded-3xl clay-pill bg-gold/10 border border-gold/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-2.5 text-navy-900 dark:text-gray-200">
            <ShieldCheck className="w-5 h-5 text-gold shrink-0" />
            <span>
              <strong>Санамж:</strong> Босго оноо болон элсэлтийн журам жил бүр БШУЯ болон их сургуулиудын эрдмийн зөвлөлөөр шинэчлэгддэг тул албан ёсны эх сурвалжийг тогтмол шалгана уу.
            </span>
          </div>
          <Link
            href="/calendar"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl clay-btn-gold text-xs font-bold shrink-0 shadow-sm"
          >
            <span>Элсэлтийн хуанли харах</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
};
