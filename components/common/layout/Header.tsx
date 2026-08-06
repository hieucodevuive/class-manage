import { AvatarMenu } from '../AvataMenu';
import { SearchInput } from '../SearchInput';

const Header = () => {
  return (
    <header className="flex h-15.5 items-center justify-between gap-2 border-b border-slate-100 px-4">
      <SearchInput />
      <AvatarMenu />
    </header>
  );
};

export default Header;
