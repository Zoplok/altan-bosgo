'use client';

import React from 'react';
import { VerificationInfo } from '@/types';
import { CheckCircle2, AlertCircle, RefreshCw, ExternalLink } from 'lucide-react';

interface VerificationBadgeProps {
  verification: VerificationInfo;
  size?: 'sm' | 'md' | 'lg';
  showDetails?: boolean;
}

export const VerificationBadge: React.FC<VerificationBadgeProps> = ({
  verification,
  size = 'md',
  showDetails = false,
}) => {
  const { status, sourceName, sourceUrl, lastUpdated } = verification;

  let badgeStyle = 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-800';
  let icon = <CheckCircle2 className={size === 'sm' ? 'w-3 h-3' : 'w-4 h-4'} />;
  let label = '✓ Баталгаатай';

  if (status === 'NEEDS_REVIEW') {
    badgeStyle = 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-400 dark:border-amber-800';
    icon = <AlertCircle className={size === 'sm' ? 'w-3 h-3' : 'w-4 h-4'} />;
    label = 'Шалгах шаардлагатай';
  } else if (status === 'UPDATING') {
    badgeStyle = 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/40 dark:text-blue-400 dark:border-blue-800';
    icon = <RefreshCw className={`${size === 'sm' ? 'w-3 h-3' : 'w-4 h-4'} animate-spin`} />;
    label = '⟳ Шинэчлэгдэж байна';
  }

  const paddingClass = size === 'sm' ? 'px-2 py-0.5 text-xs' : size === 'lg' ? 'px-3 py-1.5 text-sm' : 'px-2.5 py-1 text-xs';

  return (
    <div className="inline-flex flex-col gap-1">
      <div
        className={`inline-flex items-center gap-1.5 font-bold rounded-full clay-pill border ${badgeStyle} ${paddingClass} transition-all`}
        title={`Эх сурвалж: ${sourceName} (${lastUpdated})`}
      >
        {icon}
        <span>{label}</span>
      </div>

      {showDetails && (
        <div className="text-[11px] text-gray-500 dark:text-gray-400 flex flex-wrap items-center gap-x-2 gap-y-0.5 mt-0.5">
          <span>Шинэчилсэн: {lastUpdated}</span>
          {sourceUrl && (
            <a
              href={sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-0.5 text-gold-600 dark:text-gold-400 hover:underline"
            >
              <span>{sourceName}</span>
              <ExternalLink className="w-2.5 h-2.5" />
            </a>
          )}
        </div>
      )}
    </div>
  );
};
