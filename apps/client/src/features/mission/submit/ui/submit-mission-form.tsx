'use client';

import React, { useRef, useState } from 'react';
import { useSubmitMissionForm } from '@/features/mission/submit/hooks/useSubmitMissionForm';
import { useTranslations } from 'next-intl';
import CameraIcon from '@/shared/assets/icons/CameraIcon.svg';
import LogoIcon from '@/shared/assets/icons/LogoIcon.svg';

interface SubmitMissionFormProps {
  missionId: number;
}

export const SubmitMissionForm = ({ missionId }: SubmitMissionFormProps) => {
  const t = useTranslations('submit');
  const { methods, onSubmit, isPending } = useSubmitMissionForm();
  const {
    setValue,
    formState: { errors },
  } = methods;

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(URL.createObjectURL(file));
    setValue('images', [file], { shouldValidate: true });
    e.target.value = '';
  };

  return (
    <form onSubmit={onSubmit(missionId)} className="flex flex-1 flex-col justify-between px-4">
      {previewUrl ? (
        <div className="flex flex-col items-center gap-4">
          <h3 className="inline-flex items-center gap-1 rounded-full bg-[#333333] px-4 py-3 text-sm font-semibold text-[##E1E1E3]">
            발자국으로 자유롭게 꾸며보세요
            <LogoIcon className="h-4 w-4 text-[#FADF78]" />
          </h3>
          <div className="aspect-square overflow-hidden rounded-[30px]">
            <img
              src={previewUrl}
              alt={t('photoAlt', { index: 1 })}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      ) : (
        <div className="mt-14 flex aspect-square flex-col items-center justify-center space-y-6 rounded-[30px] border-3 border-dashed border-[#333333]">
          <h3 className="font-semibold text-[#E1E1E3]">편집할 사진을 선택해주세요</h3>
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="mx-auto flex items-center justify-center gap-2 rounded-full bg-[#E1E1E3] p-4 text-[#131313]"
          >
            <span className="font-medium">사진 업로드</span>
            <CameraIcon />
          </button>
        </div>
      )}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />
      {errors.images && <p className="text-xs text-destructive">{errors.images.message}</p>}

      <button
        type="submit"
        disabled={isPending || !previewUrl}
        className="mb-4 w-full rounded-[18px] bg-[#FADF78] py-4 font-semibold text-[#4D4D4D] disabled:bg-[#4D4D4D] disabled:text-[#808080]"
      >
        업로드
      </button>
    </form>
  );
};
