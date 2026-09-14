'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { SCHOOLS } from '@/lib/data';
import { VerificationBadge } from '@/components/ui/VerificationBadge';
import { School as SchoolIcon, MapPin, ArrowRight, Users } from 'lucide-react';

export const HomeSchoolsSection: React.FC = () => {
  const featuredSchools = SCHOOLS.slice(0, 3);

  return (
    <section className="py-16 bg-surface-light-subtle dark:bg-navy-950 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-gold block mb-1">
              Ерөнхий боловсролын сургуулиуд
            </span>
            <h2 className="text-3xl font-display font-extrabold text-navy-900 dark:text-white">
              ЕБС: Бага, Дунд, Ахлах ангийн мэдээлэл
            </h2>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Улсын тэргүүний сургуулиуд, олон улсын болон хувийн хэвшлийн сургуулиудын клуб, зарлал, холбогдох хаяг.
            </p>
          </div>

          <Link
            href="/schools"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-navy-900 dark:text-gold hover:underline shrink-0"
          >
            <span>Бүх сургуулийг үзэх ({SCHOOLS.length})</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredSchools.map((school) => (
            <div
              key={school.id}
              className="bg-white dark:bg-navy-900 rounded-2xl border border-gray-200/80 dark:border-navy-800 overflow-hidden shadow-sm hover:shadow-xl hover:border-gold transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="relative h-44 w-full bg-gray-100 dark:bg-navy-800">
                  <Image
                    src={school.image}
                    alt={school.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-white/90 dark:bg-navy-900/90 text-navy-900 dark:text-white backdrop-blur shadow-sm">
                      {school.type}
                    </span>
                  </div>
                </div>

                <div className="p-5">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-1 text-[11px] text-gray-500">
                      <MapPin className="w-3.5 h-3.5 text-gray-400" />
                      <span>{school.district} дүүрэг</span>
                    </div>
                    <VerificationBadge verification={school.verification} size="sm" />
                  </div>

                  <h3 className="font-bold text-base text-navy-900 dark:text-white line-clamp-1 mb-1">
                    {school.name}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 leading-relaxed mb-4">
                    {school.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-gray-100 dark:border-navy-800">
                    {school.clubs.slice(0, 3).map((club, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded bg-gray-100 dark:bg-navy-800 text-[10px] text-gray-600 dark:text-gray-300"
                      >
                        {club}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="px-5 pb-5 pt-2">
                <Link
                  href="/schools"
                  className="w-full py-2 rounded-xl bg-gray-50 dark:bg-navy-800 hover:bg-gold/20 text-navy-900 dark:text-white hover:text-gold text-xs font-bold transition-colors flex items-center justify-center gap-1"
                >
                  <span>Дэлгэрэнгүй үзэх</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
