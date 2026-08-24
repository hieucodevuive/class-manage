import { AvatarMenu } from '../AvataMenu';
import { SearchInput } from '../SearchInput';

const Header = () => {
  return (
    <header className="flex h-15.5 items-center justify-between gap-2">
      <SearchInput />
      <AvatarMenu />
    </header>
  );
};

export default Header;
