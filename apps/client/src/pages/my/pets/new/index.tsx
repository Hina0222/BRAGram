import { CreatePetForm } from '@/features/pet/create/ui';
import { BackHeader } from '@/widgets/header';

export default function NewPetPage() {
  return (
    <>
      <BackHeader title="펫 생성" />
      <CreatePetForm />
    </>
  );
}
