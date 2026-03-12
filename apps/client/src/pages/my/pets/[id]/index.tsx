'use client';

import { ChevronLeft } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useGetPetQuery } from '@/features/pet/detail/api/useGetPetQuery';
import { useUpdatePetMutation } from '@/features/pet/edit/api/useUpdatePetMutation';
import { useActivatePetMutation } from '@/features/pet/edit/api/useActivatePetMutation';

export default function MyPetPage() {
  const router = useRouter();

  // const { data: pet } = useGetPetQuery(id);
  const { mutate: updatePet } = useUpdatePetMutation();
  const { mutate: activatePet } = useActivatePetMutation();

  return (
    <>
      {/* 헤더 */}
      <header className="flex items-center gap-3 px-5 pt-12 pb-4">
        <button
          onClick={() => router.back()}
          className="text-muted-foreground transition-colors hover:text-foreground"
        >
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-base font-semibold text-foreground">펫 프로필 편집</h1>
      </header>
    </>
  );
}
