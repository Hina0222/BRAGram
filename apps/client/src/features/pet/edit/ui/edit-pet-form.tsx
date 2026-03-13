'use client';

import { Controller } from 'react-hook-form';
import { useUpdatePetForm } from '@/features/pet/edit/hooks/useUpdatePetForm';
import { useGetPetQuery } from '@/features/pet/detail/api/useGetPetQuery';
import { Button } from '@/shared/ui/button';
import { cn } from '@/shared/lib/utils';

const GENDER_LABEL = { male: '수컷', female: '암컷' } as const;

const inputCls =
  'w-full rounded-lg border border-border bg-card px-3 py-2 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-[oklch(0.72_0.18_42)]';

interface EditPetFormProps {
  id: number;
  onSuccess: () => void;
  onCancel: () => void;
}

function EditPetForm({ id, onSuccess, onCancel }: EditPetFormProps) {
  const { data: pet } = useGetPetQuery(id);
  const { methods, onSubmit, isPending } = useUpdatePetForm(pet!, onSuccess);
  const {
    register,
    control,
    formState: { errors },
  } = methods;

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4 px-5">
      <FormField label="이름" error={errors.name?.message}>
        <input
          {...register('name')}
          placeholder="이름을 입력하세요"
          className={cn(inputCls, errors.name && 'border-destructive')}
        />
      </FormField>

      <FormField label="품종" error={errors.breed?.message}>
        <input {...register('breed')} placeholder="품종을 입력하세요" className={inputCls} />
      </FormField>

      <FormField label="생년월일" error={errors.birthDate?.message}>
        <input type="date" {...register('birthDate')} className={inputCls} />
      </FormField>

      <FormField label="성별">
        <Controller
          control={control}
          name="gender"
          render={({ field }) => (
            <div className="flex gap-2">
              {(['male', 'female'] as const).map(g => (
                <button
                  type="button"
                  key={g}
                  onClick={() => field.onChange(field.value === g ? undefined : g)}
                  className={cn(
                    'flex-1 rounded-lg border py-2 text-sm font-medium transition-colors',
                    field.value === g
                      ? 'border-[oklch(0.72_0.18_42)] bg-[oklch(0.72_0.18_42/12%)] text-[oklch(0.72_0.18_42)]'
                      : 'border-border bg-card text-muted-foreground hover:bg-accent'
                  )}
                >
                  {GENDER_LABEL[g]}
                </button>
              ))}
            </div>
          )}
        />
      </FormField>

      <FormField label="소개" error={errors.bio?.message}>
        <textarea
          {...register('bio')}
          placeholder="반려동물을 소개해주세요 (최대 60자)"
          maxLength={60}
          rows={3}
          className={cn(inputCls, 'resize-none')}
        />
      </FormField>

      <div className="mt-4 flex gap-3">
        <Button type="button" variant="outline" onClick={onCancel} className="flex-1" size="lg">
          취소
        </Button>
        <Button type="submit" disabled={isPending} className="flex-1" size="lg">
          {isPending ? '저장 중...' : '저장하기'}
        </Button>
      </div>
    </form>
  );
}

function FormField({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-foreground">{label}</label>
      {children}
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}

export default EditPetForm;
