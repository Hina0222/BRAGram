'use client';

import type { PetType } from '@bragram/schemas/pet';
import { cn } from '@/shared/lib/utils';
import { Controller, useFormContext } from 'react-hook-form';
import type { CreatePetFormValues } from '@/features/pet/create/model/schema';

const petTypes: { type: PetType; emoji: string; label: string }[] = [
  { type: 'dog', emoji: '🐶', label: '강아지' },
  { type: 'cat', emoji: '🐱', label: '고양이' },
];

export function StepPetType() {
  const { control } = useFormContext<CreatePetFormValues>();

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="mb-2 text-2xl font-bold text-foreground">어떤 반려동물인가요?</h2>
        <p className="text-sm text-muted-foreground">반려동물 종류를 선택해주세요</p>
      </div>
      <div className="mt-4 flex gap-4">
        <Controller
          name="type"
          control={control}
          render={({ field }) => (
            <div className="mt-4 flex flex-1 gap-4">
              {petTypes.map(({ type, emoji, label }) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => field.onChange(type)}
                  className={cn(
                    'flex flex-1 flex-col items-center justify-center gap-3 rounded-2xl border-2 py-10',
                    field.value === type
                      ? 'border-brand bg-brand/12'
                      : 'hover:border-brand/50 border-border bg-card'
                  )}
                >
                  <span className="text-5xl">{emoji}</span>
                  <span className="text-base font-semibold">{label}</span>
                </button>
              ))}
            </div>
          )}
        />
      </div>
    </div>
  );
}
