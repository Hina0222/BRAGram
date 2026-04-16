import { CreatePetForm } from '@/features/pet/create/ui';
import { OnboardingHeader } from '@/widgets/header';

export default function OnboardingPetPage() {
  return (
    <>
      <OnboardingHeader />
      <CreatePetForm />
    </>
  );
}
