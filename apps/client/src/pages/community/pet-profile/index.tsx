export default async function PetProfilePage({ params }: { params: Promise<{ petId: string }> }) {
  const { petId } = await params;
  return <div>펫 프로필 페이지 ({petId})</div>;
}
