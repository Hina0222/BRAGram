'use client';

import { Link } from '@/app/i18n/navigation';
import { useLogoutMutation } from '@/features/user/me/api/useLogoutMutation';
import { useDeleteAccountMutation } from '@/features/user/me/api/useDeleteAccountMutation';
import MyPetList from './ui/my-pet-list';
import { Header } from '@/widgets/header';
import { ConfirmDialog } from '@/shared/ui';
import { useTranslations } from 'next-intl';
import RightArrowIcon from '@/shared/assets/icons/RightArrowIcon.svg';

export default function MyPage() {
  const { mutate: logout, isPending } = useLogoutMutation();
  const { mutate: deleteAccount, isPending: isDeleting } = useDeleteAccountMutation();
  const ts = useTranslations('settings');

  return (
    <>
      <Header>
        <Header.Left>
          <Header.Back />
        </Header.Left>
        <Header.Center>
          <Header.Title>내 프로필</Header.Title>
        </Header.Center>
      </Header>

      <main className="mt-5 flex flex-1 flex-col gap-10">
        <section className="pl-4">
          <MyPetList />
        </section>

        <section className="flex flex-1 flex-col items-center justify-between px-4">
          {/* 좋아요한 게시물 */}
          <div className="w-full">
            <Link
              href="/my/liked"
              className="flex w-full items-center gap-3 rounded-[18px] bg-[#333333] py-4 pr-4 pl-6"
            >
              <span className="flex-1">좋아요 목록</span>
              <RightArrowIcon />
            </Link>

            {/* 로그아웃 */}
            <ConfirmDialog
              title={'정말 로그아웃 하겠습니까?'}
              onConfirm={() => logout()}
              isPending={isPending}
              trigger={
                <button className="mt-4 flex w-full items-center gap-3 rounded-[18px] bg-[#333333] py-4 pr-4 pl-6">
                  로그아웃
                </button>
              }
            />
          </div>

          {/* 탈퇴 */}
          <ConfirmDialog
            title={'정말 탈퇴 하겠습니까?'}
            onConfirm={() => deleteAccount()}
            isPending={isDeleting}
            trigger={
              <button className="mb-6 font-medium text-[#E1E1E3] underline">계정 탈퇴</button>
            }
          />
        </section>
      </main>
    </>
  );
}
