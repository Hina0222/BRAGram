'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Tabs, TabsList, TabsTrigger } from '@/shared/ui';

export function MissionTabNav() {
  const pathname = usePathname();
  const value = pathname === '/mission' ? 'my' : 'history';

  return (
    <Tabs defaultValue={value} className="px-5 pb-2">
      <TabsList variant="line" className="w-full">
        <TabsTrigger value="my" asChild>
          <Link href="/mission">내 미션</Link>
        </TabsTrigger>
        <TabsTrigger value="history" asChild>
          <Link href="/mission/history">미션 히스토리</Link>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
