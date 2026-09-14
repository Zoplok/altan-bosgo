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
      className={`p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:text-navy-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-surface-dark-card transition-all ${className}`}
      title={theme === 'dark' ? 'Гэгээлэг горимд шилжих' : 'Харанхуй горимд шилжих'}
    >
      {theme === 'dark' ? (
        <Sun className="w-5 h-5 text-gold transition-transform rotate-0 hover:rotate-45" />
      ) : (
        <Moon className="w-5 h-5 text-navy-900 transition-transform rotate-0 hover:-rotate-12" />
      )}
    </button>
  );
};
