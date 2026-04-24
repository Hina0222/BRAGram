'use client';

import { CheckCircle2 } from 'lucide-react';
import { useGetTodayMissionSuspenseQuery } from '@/features/mission/today/api/useGetTodayMissionQuery';
import { withErrorBoundary, withSuspense } from '@/shared/boundary';
import { useTranslations } from 'next-intl';
import {
  SubmissionCardError,
  SubmissionCardSkeleton,
} from '@/features/mission/today/ui/submission-card';

function SubmissionCard() {
  const tm = useTranslations('mission');
  const { data } = useGetTodayMissionSuspenseQuery();

  if (!data.submitted) {
    return (
      <div className="flex flex-col items-center gap-3 px-5 py-16 text-center text-muted-foreground">
        <p className="text-sm">{tm('notStarted')}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-3 px-5 py-16 text-center">
      <CheckCircle2 size={40} className="text-primary" />
      <p className="text-sm font-medium">{tm('completed')}</p>
    </div>
  );
}

export default withErrorBoundary(
  withSuspense(SubmissionCard, <SubmissionCardSkeleton />),
  SubmissionCardError
);
