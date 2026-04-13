'use client';

import { useRouter } from '@/app/i18n/navigation';
import { useTranslations } from 'next-intl';

export function OnboardingHeader() {
  const router = useRouter();
  const tc = useTranslations('common');

  return (
    <header className="sticky top-0 z-40 flex items-center border-b border-primary/10 bg-background/80 px-5 pt-12 pb-4 shadow-sm backdrop-blur-md">
      <button
        type="button"
        onClick={() => router.push('/')}
        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        {tc('skip')}
      </button>
    </header>
  );
}
