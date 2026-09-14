'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Mail, Lock, ArrowRight, User } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'STUDENT' | 'UNIVERSITY_STUDENT' | 'PARENT' | 'OTHER'>('STUDENT');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    login(email, role);
    router.push('/dashboard');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-surface-light-subtle dark:bg-navy-950 transition-colors">
      <div className="max-w-md w-full bg-white dark:bg-navy-900 rounded-3xl p-8 border border-gray-200 dark:border-navy-800 shadow-xl">
        <div className="text-center mb-8">
          <div className="relative w-14 h-14 rounded-2xl overflow-hidden shadow ring-1 ring-gold/40 mx-auto mb-4">
            <Image src="/images/logo.png" alt="Алтан босго" fill className="object-cover" />
          </div>
          <h2 className="text-2xl font-bold text-navy-900 dark:text-white">Системд нэвтрэх</h2>
          <p className="text-xs text-gray-500 mt-1">
            Алтан босго боловсролын нэгдсэн системд тавтай морилно уу
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-gray-600 dark:text-gray-300 block mb-1">
              Таны үүрэг
            </label>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {[
                { id: 'STUDENT', label: 'Сурагч' },
                { id: 'UNIVERSITY_STUDENT', label: 'Оюутан' },
                { id: 'PARENT', label: 'Эцэг эх' },
                { id: 'OTHER', label: 'Бусад' },
              ].map((r) => (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => setRole(r.id as any)}
                  className={`py-2 rounded-xl border text-center font-semibold transition-colors ${
                    role === r.id
                      ? 'bg-gold text-navy-900 border-gold'
                      : 'border-gray-200 dark:border-navy-700 text-gray-600 dark:text-gray-300'
                  }`}
                >
                  {r.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-600 dark:text-gray-300 block mb-1">
              И-мэйл хаяг
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="student@example.com"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-gray-50 dark:bg-navy-950 border border-gray-200 dark:border-navy-700 text-sm text-navy-900 dark:text-white focus:outline-none focus:border-gold"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-600 dark:text-gray-300 block mb-1">
              Нууц үг
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-gray-50 dark:bg-navy-950 border border-gray-200 dark:border-navy-700 text-sm text-navy-900 dark:text-white focus:outline-none focus:border-gold"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gold hover:bg-gold-400 text-navy-900 font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 mt-6"
          >
            <span>Нэвтрэх</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-6 text-center text-xs text-gray-500">
          Бүртгэлгүй юу?{' '}
          <Link href="/auth/register" className="font-bold text-gold hover:underline">
            Шинээр бүртгүүлэх
          </Link>
        </div>
      </div>
    </div>
  );
}
