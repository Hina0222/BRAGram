'use client';

import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface BackHeaderProps {
  title?: string;
}

export function BackHeader({ title }: BackHeaderProps) {
  const router = useRouter();

  return (
    <header className="flex items-center gap-3 px-5 pt-12 pb-4">
      <button
        onClick={() => router.back()}
        className="text-muted-foreground transition-colors hover:text-foreground"
      >
        <ChevronLeft size={24} />
      </button>
      {title && <h1 className="text-base font-semibold text-foreground">{title}</h1>}
    </header>
  );
}
