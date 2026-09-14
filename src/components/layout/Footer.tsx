'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Mail, Phone, MapPin, ShieldCheck, Heart, ExternalLink } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-navy-950 text-gray-300 border-t border-navy-800 pt-16 pb-24 sm:pb-16 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-navy-800/80">
          {/* Brand Info & Mission */}
          <div className="lg:col-span-2 flex flex-col space-y-4">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-12 h-12 rounded-xl overflow-hidden shadow-sm ring-1 ring-gold/40">
                <Image
                  src="/images/logo.png"
                  alt="Алтан босго лого"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-display font-bold text-2xl tracking-tight text-white group-hover:text-gold transition-colors">
                  АЛТАН БОСГО
                </span>
                <span className="text-xs font-semibold text-gold uppercase tracking-wider">
                  Боловсролын нэгдсэн систем
                </span>
              </div>
            </Link>

            <p className="text-sm text-gray-400 max-w-sm leading-relaxed">
              Боловсролын бүх мэдээлэл — нэг дор. Бага, дунд, ахлах ангиас эхлээд их, дээд сургууль хүртэл. Танд хэрэгтэй боловсролын мэдээллийг нэг платформоос хайж, харьцуулж, ирээдүйн зөв сонголтоо хийгээрэй.
            </p>

            <div className="pt-2 flex items-center gap-2 text-xs text-gray-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Бүх их сургуулийн мэдээлэл албан ёсны эх сурвалжтай</span>
            </div>
          </div>

          {/* Quick Links: Universities & Schools */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-4">
              Сургуулиуд
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/universities" className="hover:text-gold transition-colors">
                  Их, дээд сургуулиуд
                </Link>
              </li>
              <li>
                <Link href="/schools" className="hover:text-gold transition-colors">
                  ЕБС Сургуулиуд
                </Link>
              </li>
              <li>
                <Link href="/compare" className="hover:text-gold transition-colors">
                  Сургууль харьцуулалт
                </Link>
              </li>
              <li>
                <Link href="/universities?type=Төрийн" className="hover:text-gold transition-colors">
                  Төрийн өмчит сургуулиуд
                </Link>
              </li>
              <li>
                <Link href="/universities?type=Хувийн" className="hover:text-gold transition-colors">
                  Хувийн их сургуулиуд
                </Link>
              </li>
            </ul>
          </div>

          {/* Careers & Opportunities */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-4">
              Мэргэжил & Тэтгэлэг
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/majors" className="hover:text-gold transition-colors">
                  Мэргэжил сонголт
                </Link>
              </li>
              <li>
                <Link href="/scholarships" className="hover:text-gold transition-colors">
                  Тэтгэлэгт хөтөлбөрүүд
                </Link>
              </li>
              <li>
                <Link href="/calendar" className="hover:text-gold transition-colors">
                  Элсэлтийн календарь
                </Link>
              </li>
              <li>
                <Link href="/news" className="hover:text-gold transition-colors">
                  Боловсролын мэдээ
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-gold transition-colors">
                  Оюутны булан
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Admin Portal */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-4">
              Холбоо барих
            </h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                <span>Улаанбаатар хот, Сүхбаатар дүүрэг, Мэдээлэл технологийн үндэсний парк</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-gold shrink-0" />
                <span>+976 7700-2026</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-gold shrink-0" />
                <span>info@altanbosgo.mn</span>
              </li>
              <li className="pt-2">
                <Link
                  href="/admin"
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-navy-800 text-xs text-gray-300 hover:text-gold hover:bg-navy-700 transition-colors"
                >
                  <span>Админ систем</span>
                  <ExternalLink className="w-3 h-3" />
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>© 2026 АЛТАН БОСГО. Бүх эрх хуулиар хамгаалагдсан.</p>
          <div className="flex flex-wrap items-center gap-6">
            <Link href="/about" className="hover:text-gray-300 transition-colors">
              Бидний тухай
            </Link>
            <Link href="/about#privacy" className="hover:text-gray-300 transition-colors">
              Нууцлалын бодлого
            </Link>
            <Link href="/about#terms" className="hover:text-gray-300 transition-colors">
              Үйлчилгээний нөхцөл
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
