'use client';

import React from 'react';
import { Layers, Scale, Clock, Target } from 'lucide-react';

export const WhyAltanBosgo: React.FC = () => {
  const benefits = [
    {
      title: 'Нэг дор',
      description: 'Боловсролын мэдээллийг олон газраас хайх шаардлагагүй. Бага сургуулиас эхлээд их сургуулийн дэлгэрэнгүй мэдээлэл нэг платформд төвлөрсөн.',
      icon: Layers,
    },
    {
      title: 'Харьцуул',
      description: 'Их сургуулиуд, мэргэжлүүд, сургалтын төлбөр, босго оноо болон дотуур байрыг зэрэгцүүлэн харьцуулж оновчтой шийдвэр гаргана.',
      icon: Scale,
    },
    {
      title: 'Шинэчлэгдсэн',
      description: 'Мэдээлэл бүр дээр эх сурвалж болон хамгийн сүүлд шинэчлэгдсэн огноо ил тод харагдана. Худал, зохиомол тоо байхгүй.',
      icon: Clock,
    },
    {
      title: 'Зөв сонголт',
      description: 'Ирээдүйн боловсролын болон мэргэжлийн чухал сонголтоо бодит өгөгдөл, статистик болон албан ёсны мэдээлэлд тулгуурлан хийхэд тусална.',
      icon: Target,
    },
  ];

  return (
    <section className="py-16 bg-white dark:bg-navy-900 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-gold block mb-1">
            Давуу тал
          </span>
          <h2 className="text-3xl font-display font-extrabold text-navy-900 dark:text-white">
            Яагаад Алтан босго?
          </h2>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Монголын сурагч, оюутан, эцэг эхчүүдэд зориулсан боловсролын найдвартай лавлах
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="clay-card clay-card-hover p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-gold/15 text-gold-700 dark:text-gold flex items-center justify-center mb-4 shadow-[inset_0_2px_4px_rgba(255,255,255,0.6),inset_0_-2px_4px_rgba(0,0,0,0.1)] border border-gold/30">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-navy-900 dark:text-white mb-2 font-display">
                    &ldquo;{item.title}&rdquo;
                  </h3>
                  <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed font-medium">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
