'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShieldCheck, Target, Heart, CheckCircle2, ArrowRight } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="bg-surface-light-subtle dark:bg-navy-950 min-h-screen py-12 transition-colors">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Brand Intro */}
        <div className="text-center">
          <div className="relative w-20 h-20 rounded-3xl overflow-hidden shadow-md ring-2 ring-gold/40 mx-auto mb-4">
            <Image src="/images/logo.png" alt="Алтан босго лого" fill className="object-cover" />
          </div>
          <span className="text-xs font-bold text-gold uppercase tracking-wider block mb-1">
            Бидний тухай
          </span>
          <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-navy-900 dark:text-white">
            АЛТАН БОСГО — Монголын Боловсролын Нэгдсэн Платформ
          </h1>
          <p className="mt-3 text-base text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
            &ldquo;Боловсролын бүх мэдээлэл — нэг дор.&rdquo;
          </p>
        </div>

        {/* Brand Meaning & Vision */}
        <div className="bg-white dark:bg-navy-900 rounded-3xl border border-gray-200 dark:border-navy-800 p-6 sm:p-8 shadow-sm space-y-4 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
          <h2 className="text-xl font-bold text-navy-900 dark:text-white flex items-center gap-2">
            <Target className="w-5 h-5 text-gold" />
            <span>Нэрний утга учир & Зорилго</span>
          </h2>
          <p>
            &ldquo;Алтан босго&rdquo; нэр нь сурагч, залуусын амьдралын чухал даваа босго, дараагийн шатны ирээдүй рүү алхах алтан боломжийг бэлгэддэг.
          </p>
          <p>
            Монгол Улсад их дээд сургууль болон ерөнхий боловсролын сургуулийн мэдээлэл олон өөр эх сурвалж, хуудаснуудад тархай бутархай байдгаас шалтгаалан сурагчид, эцэг эхчүүд босго оноо, сургалтын төлбөр, тэтгэлгийн бодит мэдээллийг олж авахад хүндрэл учирдаг. Алтан босго нь энэхүү асуудлыг шийдвэрлэж, Монголын боловсролын бүх мэдээллийг нэг дор төвлөрүүлж байна.
          </p>
        </div>

        {/* Data Integrity Section */}
        <div className="bg-white dark:bg-navy-900 rounded-3xl border border-gray-200 dark:border-navy-800 p-6 sm:p-8 shadow-sm space-y-4 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
          <h2 className="text-xl font-bold text-navy-900 dark:text-white flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-500" />
            <span>Мэдээллийн найдвартай байдлын зарчим</span>
          </h2>
          <p>
            Бид их сургуулиудын элсэлтийн босго оноо, сургалтын төлбөр, батлагдсан хөтөлбөрүүдийн мэдээллийг БШУЯ болон их сургуулиудын албан ёсны эх сурвалжаас шууд цуглуулж баталгаажуулдаг.
          </p>
          <ul className="space-y-2 text-xs sm:text-sm">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>Зохиомол бус, зөвхөн албан ёсны эх сурвалжтай өгөгдөл</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>Шинэчлэгдсэн огноо болон албан ёсны холбоосыг ил тод харуулах</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>Хэрэв мэдээлэл батлагдаагүй бол &ldquo;Шинэчлэгдэж байна&rdquo; төлөвтэй тэмдэглэх</span>
            </li>
          </ul>
        </div>

        {/* Legal Anchors */}
        <div id="privacy" className="bg-white dark:bg-navy-900 rounded-3xl border border-gray-200 dark:border-navy-800 p-6 sm:p-8 shadow-sm space-y-3 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
          <h3 className="text-base font-bold text-navy-900 dark:text-white">
            Нууцлалын бодлого (Privacy Policy)
          </h3>
          <p>
            Алтан босго платформ нь хэрэглэгчийн бүртгэлийн мэдээлэл, хадгалсан сургууль, мэргэжлийн өгөгдлийг гуравдагч этгээдэд дамжуулахгүй бөгөөд аюулгүй байдлыг Монгол Улсын Хувь хүний нууцын тухай хуулийн дагуу чанд хангана.
          </p>
        </div>

        <div id="terms" className="bg-white dark:bg-navy-900 rounded-3xl border border-gray-200 dark:border-navy-800 p-6 sm:p-8 shadow-sm space-y-3 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
          <h3 className="text-base font-bold text-navy-900 dark:text-white">
            Үйлчилгээний нөхцөл (Terms of Service)
          </h3>
          <p>
            Энэхүү цахим хуудаст нийтлэгдсэн их, дээд сургуулиудын лого, нэршил нь тухайн боловсролын байгууллагуудын өмч бөгөөд зөвхөн олон нийтэд мэдээлэл хүргэх, танилцуулах зорилгоор ашиглагдаж байна.
          </p>
        </div>
      </div>
    </div>
  );
}
