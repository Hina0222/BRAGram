'use client';

import { useRef, useState } from 'react';
import { Camera } from 'lucide-react';
import { useUpdatePetForm } from '@/features/pet/edit/hooks/useUpdatePetForm';
import { useGetPetQuery } from '@/features/pet/detail/api/useGetPetQuery';
import { Button } from '@/shared/ui/button';
import { cn } from '@/shared/lib/utils';
import { useTranslations } from 'next-intl';

const inputCls =
  'w-full rounded-lg border border-border bg-card px-3 py-2 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary';

interface EditPetFormProps {
  id: number;
  onSuccess: () => void;
  onCancel: () => void;
}

function EditPetForm({ id, onSuccess, onCancel }: EditPetFormProps) {
  const t = useTranslations('pet');
  const tc = useTranslations('common');
  const { data: pet } = useGetPetQuery(id);
  const { methods, onSubmit, isPending } = useUpdatePetForm(pet!, onSuccess);
  const {
    register,
    setValue,
    formState: { errors },
  } = methods;

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(pet?.imageUrl ?? null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (previewUrl && previewUrl !== pet?.imageUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(URL.createObjectURL(file));
    setValue('image', file);
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4 px-5">
      <div className="flex flex-col items-center gap-2">
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="relative flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border-2 border-dashed border-primary/50 bg-card transition-colors hover:border-primary"
        >
          {previewUrl ? (
            <img src={previewUrl} alt={t('petPhoto')} className="h-full w-full object-cover" />
          ) : (
            <div className="flex flex-col items-center gap-1 text-muted-foreground">
              <Camera size={24} />
              <span className="text-xs">{tc('addPhoto')}</span>
            </div>
          )}
        </button>
        <span className="text-xs text-muted-foreground">{t('tapToChange')}</span>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          className="hidden"
          onChange={handleFileChange}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-foreground">{t('name')}</label>
        <input
          {...register('name')}
          placeholder={t('enterName')}
          className={cn(inputCls, errors.name && 'border-destructive')}
        />
        {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
      </div>

      <div className="mt-4 flex gap-3">
        <Button type="button" variant="outline" onClick={onCancel} className="flex-1" size="lg">
          {tc('cancel')}
        </Button>
        <Button type="submit" disabled={isPending} className="flex-1" size="lg">
          {isPending ? tc('saving') : tc('save')}
        </Button>
      </div>
    </form>
  );
}

export default EditPetForm;
