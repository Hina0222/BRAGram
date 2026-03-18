'use client';

import React from 'react';
import type { PetResponse } from '@bragram/schemas/pet';
import Link from 'next/link';
import Image from 'next/image';

const PET_EMOJI: Record<string, string> = {
  dog: '🐶',
  cat: '🐱',
};

interface PetListItemProps {
  pet: Pick<PetResponse, 'id' | 'name' | 'imageUrl' | 'type'>;
  href: string;
}

function PetListItem({ pet, href }: PetListItemProps) {
  return (
    <li>
      <Link href={href}>
        <div className="flex flex-shrink-0 flex-col items-center gap-1.5">
          <div className="relative flex h-16 w-16 items-center justify-center overflow-hidden rounded-full border-2 border-[oklch(0.72_0.18_42/50%)] bg-card text-2xl">
            {pet.imageUrl ? (
              <Image src={pet.imageUrl} alt={pet.name} fill className="object-cover" />
            ) : (
              (PET_EMOJI[pet.type] ?? '🐾')
            )}
          </div>
          <span className="text-xs text-muted-foreground">{pet.name}</span>
        </div>
      </Link>
    </li>
  );
}

export default PetListItem;
