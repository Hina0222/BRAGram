'use client';

import { useMemo, useState, useEffect } from 'react';
import debounce from 'lodash.debounce';
import { Search, PawPrint } from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import { useSearchPetsInfiniteQuery } from '@/features/pet/search/api/useSearchPetsInfiniteQuery';
import { Skeleton } from '@/shared/ui/skeleton';
import { useTranslations } from 'next-intl';

function PetSearchItem({ name, imageUrl }: { name: string; imageUrl: string | null }) {
  return (
    <li className="flex items-center gap-3 px-5 py-3">
      <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center overflow-hidden rounded-full border border-border bg-card">
        {imageUrl ? (
          <img src={imageUrl} alt={name} className="h-full w-full object-cover" />
        ) : (
          <PawPrint size={20} className="text-muted-foreground" />
        )}
      </div>
      <span className="text-sm font-medium text-foreground">{name}</span>
    </li>
  );
}

function PetSearchSkeleton() {
  return (
    <ul>
      {Array.from({ length: 5 }).map((_, i) => (
        <li key={i} className="flex items-center gap-3 px-5 py-3">
          <Skeleton className="h-12 w-12 rounded-full" />
          <Skeleton className="h-4 w-28 rounded" />
        </li>
      ))}
    </ul>
  );
}

export function PetSearch() {
  const t = useTranslations('search');
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');

  const debouncedSet = useMemo(
    () => debounce((value: string) => setDebouncedQuery(value), 300),
    []
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    debouncedSet(e.target.value);
  };

  const { data, isFetching, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useSearchPetsInfiniteQuery(debouncedQuery);

  const { ref: bottomRef, inView } = useInView({ threshold: 0 });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const pets = data?.pages.flatMap(page => page.data) ?? [];
  const isLoading = isFetching && !isFetchingNextPage;

  return (
    <div>
      <div className="mx-5 mt-4 flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-2.5">
        <Search size={16} className="flex-shrink-0 text-muted-foreground" />
        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder={t('placeholder')}
          className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
        />
      </div>

      <div className="mt-2">
        {!debouncedQuery.trim() ? (
          <div className="flex flex-col items-center gap-3 py-24 text-muted-foreground">
            <PawPrint size={40} className="opacity-20" />
            <p className="text-sm">{t('hint')}</p>
          </div>
        ) : isLoading ? (
          <PetSearchSkeleton />
        ) : pets.length === 0 ? (
          <p className="py-24 text-center text-sm text-muted-foreground">{t('noResults')}</p>
        ) : (
          <>
            <ul>
              {pets.map(pet => (
                <PetSearchItem key={pet.id} name={pet.name} imageUrl={pet.imageUrl} />
              ))}
            </ul>
            {isFetchingNextPage && <PetSearchSkeleton />}
            <div ref={bottomRef} className="h-1" />
          </>
        )}
      </div>
    </div>
  );
}
