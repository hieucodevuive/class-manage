import { AvatarMenu } from '../AvataMenu';
import { SearchInput } from '../SearchInput';

const Header = () => {
  return (
    <header className="flex h-15.5 items-center justify-between gap-2">
      <SearchInput placeholder="Tìm kiếm học sinh, lớp học" />
      <AvatarMenu />
    </header>
  );
};

export default Header;
