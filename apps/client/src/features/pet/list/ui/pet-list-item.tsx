import React from 'react';
import { Trash2 } from 'lucide-react';
import { useDeletePetMutation } from '@/features/pet/delete/api/useDeletePetMutation';
import { PetResponse } from '@bragram/schemas/pet';

function PetListItem({ pet }: { pet: PetResponse }) {
  const { mutate: deletePet } = useDeletePetMutation();

  return (
    <li
      key={pet.id}
      className="flex cursor-pointer items-center justify-between rounded-xl border border-border bg-card px-4 py-3 transition-colors hover:bg-accent"
    >
      <span className="text-sm font-medium text-foreground">{pet.name}</span>
      <button
        onClick={e => {
          e.stopPropagation();
          deletePet(pet.id);
        }}
        className="text-muted-foreground transition-colors hover:text-destructive"
      >
        <Trash2 size={18} />
      </button>
    </li>
  );
}

export default PetListItem;
