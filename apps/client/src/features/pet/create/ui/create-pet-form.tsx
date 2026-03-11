'use client';

import { useState } from 'react';
import { StepPetType, StepBasicInfo, StepPhoto } from '@/features/pet/create/ui';
import { ChevronLeft } from 'lucide-react';
import { cn } from '@/shared/lib/utils';
import { FormProvider, useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/shared/ui';
import { useCreatePetMutation } from '@/features/pet/create/api/useCreatePetMutation';
import { CreatePetFormSchema, CreatePetFormValues } from '@/features/pet/create/model/schema';

const TOTAL_STEPS = 3;
const stepFields: Record<number, (keyof CreatePetFormValues)[]> = {
  1: ['type'],
  2: ['name', 'breed', 'birthDate', 'bio'],
};

export function CreatePetForm() {
  const [step, setStep] = useState(1);
  const { mutate } = useCreatePetMutation();

  const methods = useForm<CreatePetFormValues>({
    resolver: zodResolver(CreatePetFormSchema),
    defaultValues: {
      name: '',
      breed: '',
      birthDate: '',
      bio: '',
    },
  });
  const { handleSubmit, trigger, control } = methods;
  const [type, name] = useWatch({ control, name: ['type', 'name'] });

  const canNext = () => {
    switch (step) {
      case 1:
        return !!type;
      case 2:
        return !!name?.trim();
      default:
        return true;
    }
  };

  const onSubmit = (data: CreatePetFormValues) => {
    mutate(data);
  };

  const handleNext = async () => {
    const fields = stepFields[step];
    if (fields) {
      const valid = await trigger(fields);
      if (!valid) return;
    }
    setStep(s => s + 1);
  };

  const handleButtonClick = () => {
    if (step === TOTAL_STEPS) {
      handleSubmit(onSubmit)();
    } else {
      handleNext();
    }
  };

  return (
    <>
      {/* 상단 헤더 */}
      <header className="flex items-center px-5 pt-12 pb-4">
        {step > 1 && (
          <button
            onClick={() => setStep(s => s - 1)}
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            <ChevronLeft size={24} />
          </button>
        )}
      </header>

      {/* 진행 바 */}
      <div className="mb-8 flex gap-1.5 px-5">
        {Array.from({ length: TOTAL_STEPS }, (_, i) => (
          <div
            key={i}
            className={cn(
              'h-1 flex-1 rounded-full transition-colors duration-300',
              i < step ? 'bg-brand' : 'bg-border'
            )}
          />
        ))}
      </div>

      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-1 flex-col">
          <div className="flex flex-1 flex-col px-5">
            {step === 1 && <StepPetType />}
            {step === 2 && <StepBasicInfo />}
            {step === 3 && <StepPhoto />}
          </div>
        </form>
      </FormProvider>

      {/* 하단 버튼 */}
      <div className="px-5 pt-4 pb-10">
        <Button
          type="button"
          className="h-13 w-full rounded-2xl bg-brand text-base font-semibold text-primary-foreground hover:bg-brand-dark"
          onClick={handleButtonClick}
          disabled={!canNext()}
        >
          {step === TOTAL_STEPS ? '완료하기' : '다음'}
        </Button>
      </div>
    </>
  );
}
