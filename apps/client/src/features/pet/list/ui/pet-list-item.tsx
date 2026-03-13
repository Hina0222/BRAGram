'use client';

import React from 'react';
import { Trash2 } from 'lucide-react';
import { useDeletePetMutation } from '@/features/pet/delete/api/useDeletePetMutation';
import { PetResponse } from '@bragram/schemas/pet';
import Link from 'next/link';

function PetListItem({ pet }: { pet: PetResponse }) {
  const { mutate: deletePet } = useDeletePetMutation();

  return (
    <li key={pet.id}>
      <Link
        href={`/my/pets/${pet.id}`}
        className="flex items-center justify-between rounded-xl border border-border bg-card px-4 py-3 transition-colors hover:bg-accent"
      >
        <span className="text-sm font-medium text-foreground">{pet.name}</span>
        <button
          onClick={e => {
            e.preventDefault();
            e.stopPropagation();
            deletePet(pet.id);
          }}
          className="cursor-pointer text-muted-foreground transition-colors hover:text-destructive"
        >
          <Trash2 size={18} />
        </button>
      </Link>
    </li>
  );
}

export default PetListItem;
