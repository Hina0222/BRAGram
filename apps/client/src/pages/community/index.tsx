'use client';

import { useMemo, useState } from 'react';
import debounce from 'lodash.debounce';
import { Search } from 'lucide-react';
import { BottomNav } from '@/widgets/bottom-nav';
import { UserSearchList } from '@/features/user/search/ui';
import { TitleHeader } from '@/widgets/header';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/shared/ui/tabs';
import type { SearchType } from '@bragram/schemas/user';

export default function CommunityPage() {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [searchType, setSearchType] = useState<SearchType>('user');

  const debouncedSet = useMemo(
    () => debounce((value: string) => setDebouncedQuery(value), 300),
    []
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    debouncedSet(e.target.value);
  };

  return (
    <div className="pb-20">
      <TitleHeader title={'커뮤니티'} />
      <Tabs
        value={searchType}
        onValueChange={value => setSearchType(value as SearchType)}
        className="mt-4"
      >
        <TabsList className="mx-5 w-auto">
          <TabsTrigger value="user">유저</TabsTrigger>
          <TabsTrigger value="pet">펫</TabsTrigger>
        </TabsList>

        <div className="mx-5 mt-4 flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-2.5">
          <Search size={16} className="flex-shrink-0 text-muted-foreground" />
          <input
            type="text"
            value={query}
            onChange={handleChange}
            placeholder={searchType === 'user' ? '닉네임으로 유저 검색...' : '펫 이름으로 검색...'}
            className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
          />
        </div>

        <TabsContent value="user" className="mt-0">
          {debouncedQuery.trim() && <UserSearchList query={debouncedQuery} type="user" />}
        </TabsContent>

        <TabsContent value="pet" className="mt-0">
          {debouncedQuery.trim() && <UserSearchList query={debouncedQuery} type="pet" />}
        </TabsContent>
      </Tabs>

      <BottomNav />
    </div>
  );
}
