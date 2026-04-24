'use client';

import React from 'react';
import type { PetResponse } from '@pawboo/schemas/pet';
import { Link } from '@/app/i18n/navigation';
import { ImageOff } from 'lucide-react';

interface PetListItemProps {
  pet: Pick<PetResponse, 'id' | 'name' | 'imageUrl'>;
  href: string;
}

function PetListItem({ pet, href }: PetListItemProps) {
  return (
    <li>
      <Link href={href}>
        <div className="flex flex-shrink-0 flex-col items-center gap-1.5">
          <div className="relative flex h-16 w-16 items-center justify-center overflow-hidden rounded-full border-2 border-primary/50 bg-card">
            {pet.imageUrl ? (
              <img
                src={pet.imageUrl}
                alt={pet.name}
                className="absolute inset-0 h-full w-full object-cover"
              />
            ) : (
              <ImageOff size={20} className="text-muted-foreground" />
            )}
          </div>
          <span className="text-xs text-muted-foreground">{pet.name}</span>
        </div>
      </Link>
    </li>
  );
}

export default PetListItem;
