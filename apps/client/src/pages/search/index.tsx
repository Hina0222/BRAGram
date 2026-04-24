'use client';

import { TitleHeader } from '@/widgets/header';
import { BottomNav } from '@/widgets/bottom-nav';
import { PetSearch } from '@/features/pet/search/ui';
import { useTranslations } from 'next-intl';

export default function SearchPage() {
  const t = useTranslations('search');

  return (
    <div className="pb-20">
      <TitleHeader title={t('title')} />
      <PetSearch />
      <BottomNav />
    </div>
  );
}
