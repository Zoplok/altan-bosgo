'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

interface CompareContextType {
  compareIds: string[];
  addUniversity: (id: string) => boolean;
  removeUniversity: (id: string) => void;
  clearComparison: () => void;
  isComparing: (id: string) => boolean;
}

const CompareContext = createContext<CompareContextType | undefined>(undefined);

export function CompareProvider({ children }: { children: React.ReactNode }) {
  const [compareIds, setCompareIds] = useState<string[]>([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('altan_bosgo_compare');
      if (saved) {
        setCompareIds(JSON.parse(saved));
      }
    } catch {
      // ignore
    }
  }, []);

  const addUniversity = (id: string) => {
    if (compareIds.includes(id)) return false;
    if (compareIds.length >= 3) {
      alert('Та дээд тал нь 3 их сургуулийг зэрэг харьцуулах боломжтой.');
      return false;
    }
    const next = [...compareIds, id];
    setCompareIds(next);
    localStorage.setItem('altan_bosgo_compare', JSON.stringify(next));
    return true;
  };

  const removeUniversity = (id: string) => {
    const next = compareIds.filter((i) => i !== id);
    setCompareIds(next);
    localStorage.setItem('altan_bosgo_compare', JSON.stringify(next));
  };

  const clearComparison = () => {
    setCompareIds([]);
    localStorage.removeItem('altan_bosgo_compare');
  };

  const isComparing = (id: string) => compareIds.includes(id);

  return (
    <CompareContext.Provider
      value={{ compareIds, addUniversity, removeUniversity, clearComparison, isComparing }}
    >
      {children}
    </CompareContext.Provider>
  );
}

export function useCompare() {
  const context = useContext(CompareContext);
  if (!context) {
    throw new Error('useCompare must be used within a CompareProvider');
  }
  return context;
}
