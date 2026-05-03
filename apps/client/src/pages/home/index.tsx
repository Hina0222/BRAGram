import { Header } from '@/widgets/header';
import SearchIcon from '@/shared/assets/icons/SearchIcon.svg';
import HomePetAvatar from './ui/home-pet-avatar';
import HomePostList from './ui/home-post-list';
import HomeFab from './ui/home-fab';

export default async function HomePage() {
  return (
    <>
      <Header>
        <Header.Left>
          <HomePetAvatar />
        </Header.Left>
        <Header.Center>
          <Header.Nav />
        </Header.Center>
        <Header.Right>
          <Header.NavLink href="/search" icon={<SearchIcon />} />
        </Header.Right>
      </Header>

      <main className="px-4">
        <HomePostList />
      </main>

      <HomeFab />
    </>
  );
}
