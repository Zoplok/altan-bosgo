'use client';

import React from 'react';
import { useTheme } from '@/context/ThemeContext';
import { Sun, Moon } from 'lucide-react';

export const ThemeToggle: React.FC<{ className?: string }> = ({ className = '' }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Харанхуй / Гэгээлэг горим солих"
      className={`p-2.5 rounded-xl text-gray-600 dark:text-gray-300 hover:text-navy-900 dark:hover:text-white clay-btn-surface transition-all ${className}`}
      title={theme === 'dark' ? 'Гэгээлэг горимд шилжих' : 'Харанхуй горимд шилжих'}
    >
      {theme === 'dark' ? (
        <Sun className="w-4 h-4 text-gold transition-transform rotate-0 hover:rotate-45" />
      ) : (
        <Moon className="w-4 h-4 text-navy-900 transition-transform rotate-0 hover:-rotate-12" />
      )}
    </button>
  );
};
