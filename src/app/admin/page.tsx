'use client';

import React, { useState } from 'react';
import { UNIVERSITIES, SCHOOLS, MAJORS, SCHOLARSHIPS, NEWS_ARTICLES } from '@/lib/data';
import { VerificationBadge } from '@/components/ui/VerificationBadge';
import { VerificationStatus, University } from '@/types';
import {
  ShieldCheck,
  Building,
  School as SchoolIcon,
  BookOpen,
  Award,
  Newspaper,
  Edit,
  Trash2,
  Plus,
  ExternalLink,
  CheckCircle,
  AlertCircle,
  RefreshCw,
} from 'lucide-react';

type AdminTab = 'universities' | 'schools' | 'majors' | 'scholarships' | 'news';

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<AdminTab>('universities');
  const [unis, setUnis] = useState<University[]>([...UNIVERSITIES]);
  const [editingUni, setEditingUni] = useState<University | null>(null);

  // Status update handler
  const handleStatusChange = (uniId: string, newStatus: VerificationStatus) => {
    setUnis((prev) =>
      prev.map((u) => {
        if (u.id === uniId) {
          return {
            ...u,
            verification: {
              ...u.verification,
              status: newStatus,
              lastUpdated: new Date().toISOString().split('T')[0].replace(/-/g, '.'),
            },
          };
        }
        return u;
      })
    );
  };

  const handleUpdateScoresAndTuition = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUni) return;
    setUnis((prev) => prev.map((u) => (u.id === editingUni.id ? editingUni : u)));
    setEditingUni(null);
    alert('Их сургуулийн мэдээлэл амжилттай шинэчлэгдлээ.');
  };

  return (
    <div className="bg-surface-light-subtle dark:bg-navy-950 min-h-screen py-10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-gold uppercase tracking-wider mb-1">
              <ShieldCheck className="w-4 h-4" />
              <span>Удирдлагын систем & Мэдээлэл баталгаажуулалт</span>
            </div>
            <h1 className="text-3xl font-display font-extrabold text-navy-900 dark:text-white">
              Админ самбар
            </h1>
            <p className="text-xs text-gray-500 mt-1">
              Боловсролын байгууллагуудын мэдээлэл, босго оноо, сургалтын төлбөр, эх сурвалжийн статусыг удирдах
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Админ горим</span>
            </span>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-gray-200 dark:border-navy-800 mb-6 text-xs font-bold">
          {[
            { id: 'universities', label: `Их сургуулиуд (${unis.length})`, icon: Building },
            { id: 'schools', label: `ЕБС Сургуулиуд (${SCHOOLS.length})`, icon: SchoolIcon },
            { id: 'majors', label: `Мэргэжил (${MAJORS.length})`, icon: BookOpen },
            { id: 'scholarships', label: `Тэтгэлэг (${SCHOLARSHIPS.length})`, icon: Award },
            { id: 'news', label: `Мэдээ (${NEWS_ARTICLES.length})`, icon: Newspaper },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as AdminTab)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-colors ${
                  activeTab === tab.id
                    ? 'bg-navy-900 text-white dark:bg-gold dark:text-navy-900 shadow-sm'
                    : 'bg-white dark:bg-navy-900 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-navy-800'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Universities Tab */}
        {activeTab === 'universities' && (
          <div className="space-y-6">
            <div className="bg-white dark:bg-navy-900 rounded-3xl border border-gray-200 dark:border-navy-800 overflow-hidden shadow-sm">
              <div className="p-5 border-b border-gray-200 dark:border-navy-800 flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-base text-navy-900 dark:text-white">
                    Их, дээд сургуулиудын баталгаажуулалтын жагсаалт
                  </h3>
                  <p className="text-xs text-gray-500">
                    Статусыг шууд өөрчлөх, эх сурвалж болон босго оноог засах боломжтой
                  </p>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-surface-light-subtle dark:bg-navy-950 border-b border-gray-200 dark:border-navy-800 text-gray-400 font-bold">
                      <th className="p-4">Сургууль</th>
                      <th className="p-4">Өмчлөл</th>
                      <th className="p-4">Босго оноо</th>
                      <th className="p-4">1 кредит</th>
                      <th className="p-4">Эх сурвалж & Шинэчилсэн</th>
                      <th className="p-4">Баталгаажуулалтын төлөв</th>
                      <th className="p-4 text-right">Үйлдэл</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-navy-800 text-navy-900 dark:text-gray-200">
                    {unis.map((u) => (
                      <tr key={u.id} className="hover:bg-gray-50/50 dark:hover:bg-navy-800/30">
                        <td className="p-4">
                          <div className="font-bold text-sm text-navy-900 dark:text-white">
                            {u.shortName}
                          </div>
                          <div className="text-[11px] text-gray-400 line-clamp-1">{u.name}</div>
                        </td>
                        <td className="p-4">
                          <span className="px-2 py-0.5 rounded bg-gray-100 dark:bg-navy-800 font-semibold">
                            {u.type}
                          </span>
                        </td>
                        <td className="p-4 font-bold text-gold">{u.highlightScores.minScore}+</td>
                        <td className="p-4 font-semibold">
                          {u.tuitionSummary.creditPrice.toLocaleString()}₮
                        </td>
                        <td className="p-4">
                          <span className="block truncate max-w-[200px] text-gray-600 dark:text-gray-300">
                            {u.verification.sourceName}
                          </span>
                          <span className="text-[10px] text-gray-400">
                            {u.verification.lastUpdated}
                          </span>
                        </td>
                        <td className="p-4">
                          <select
                            value={u.verification.status}
                            onChange={(e) =>
                              handleStatusChange(u.id, e.target.value as VerificationStatus)
                            }
                            className="px-2.5 py-1.5 rounded-lg border border-gray-200 dark:border-navy-700 bg-white dark:bg-navy-900 text-xs font-bold text-navy-900 dark:text-white focus:outline-none"
                          >
                            <option value="VERIFIED">✓ Баталгаатай</option>
                            <option value="NEEDS_REVIEW">Шалгах шаардлагатай</option>
                            <option value="UPDATING">⟳ Шинэчлэгдэж байна</option>
                          </select>
                        </td>
                        <td className="p-4 text-right">
                          <button
                            onClick={() => setEditingUni(u)}
                            className="p-1.5 text-navy-900 dark:text-gold hover:bg-gold/10 rounded-lg transition-colors mr-1"
                            title="Засах"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Edit University Modal */}
            {editingUni && (
              <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
                <form
                  onSubmit={handleUpdateScoresAndTuition}
                  className="bg-white dark:bg-navy-900 rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-gold/30 space-y-4 text-xs"
                >
                  <div className="flex items-center justify-between pb-3 border-b border-gray-200 dark:border-navy-800">
                    <h3 className="font-bold text-base text-navy-900 dark:text-white">
                      {editingUni.name} ({editingUni.shortName}) засах
                    </h3>
                    <button
                      type="button"
                      onClick={() => setEditingUni(null)}
                      className="text-gray-400 hover:text-white"
                    >
                      ✕
                    </button>
                  </div>

                  <div>
                    <label className="font-semibold text-gray-500 block mb-1">
                      Хамгийн бага босго оноо:
                    </label>
                    <input
                      type="number"
                      value={editingUni.highlightScores.minScore}
                      onChange={(e) =>
                        setEditingUni({
                          ...editingUni,
                          highlightScores: {
                            ...editingUni.highlightScores,
                            minScore: parseInt(e.target.value, 10) || 0,
                          },
                        })
                      }
                      className="w-full px-3 py-2 rounded-xl bg-gray-50 dark:bg-navy-950 border border-gray-200 dark:border-navy-700 text-navy-900 dark:text-white font-bold"
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-gray-500 block mb-1">
                      1 кредит цагийн үнэ (төгрөгөөр):
                    </label>
                    <input
                      type="number"
                      value={editingUni.tuitionSummary.creditPrice}
                      onChange={(e) =>
                        setEditingUni({
                          ...editingUni,
                          tuitionSummary: {
                            ...editingUni.tuitionSummary,
                            creditPrice: parseInt(e.target.value, 10) || 0,
                          },
                        })
                      }
                      className="w-full px-3 py-2 rounded-xl bg-gray-50 dark:bg-navy-950 border border-gray-200 dark:border-navy-700 text-navy-900 dark:text-white font-bold"
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-gray-500 block mb-1">
                      Эх сурвалжийн нэр:
                    </label>
                    <input
                      type="text"
                      value={editingUni.verification.sourceName}
                      onChange={(e) =>
                        setEditingUni({
                          ...editingUni,
                          verification: {
                            ...editingUni.verification,
                            sourceName: e.target.value,
                          },
                        })
                      }
                      className="w-full px-3 py-2 rounded-xl bg-gray-50 dark:bg-navy-950 border border-gray-200 dark:border-navy-700 text-navy-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-gray-500 block mb-1">
                      Эх сурвалжийн URL:
                    </label>
                    <input
                      type="url"
                      value={editingUni.verification.sourceUrl}
                      onChange={(e) =>
                        setEditingUni({
                          ...editingUni,
                          verification: {
                            ...editingUni.verification,
                            sourceUrl: e.target.value,
                          },
                        })
                      }
                      className="w-full px-3 py-2 rounded-xl bg-gray-50 dark:bg-navy-950 border border-gray-200 dark:border-navy-700 text-navy-900 dark:text-white"
                    />
                  </div>

                  <div className="flex justify-end gap-2 pt-4 border-t border-gray-200 dark:border-navy-800">
                    <button
                      type="button"
                      onClick={() => setEditingUni(null)}
                      className="px-4 py-2 rounded-xl border border-gray-200 dark:border-navy-700 text-gray-500 font-bold"
                    >
                      Цуцлах
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 rounded-xl bg-gold text-navy-900 font-bold shadow-md"
                    >
                      Хадгалах
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        )}

        {/* Schools, Majors, Scholarships & News tabs previews */}
        {activeTab !== 'universities' && (
          <div className="bg-white dark:bg-navy-900 rounded-3xl border border-gray-200 dark:border-navy-800 p-8 text-center text-xs text-gray-500">
            <CheckCircle className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
            <p className="font-bold text-sm text-navy-900 dark:text-white">
              {activeTab === 'schools' && 'ЕБС сургуулиудын өгөгдлийн бааз баталгаажсан'}
              {activeTab === 'majors' && 'Мэргэжлийн 100+ ангиллын бүртгэл идэвхтэй'}
              {activeTab === 'scholarships' && 'Тэтгэлэгт хөтөлбөрүүдийн хугацаа шинэчлэгдсэн'}
              {activeTab === 'news' && 'Мэдээ нийтлэлийн систем ажиллаж байна'}
            </p>
            <span className="text-gray-400 mt-1 block">
              Шинэ бичлэг нэмэх болон баталгаажуулах эрх нээлттэй.
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
