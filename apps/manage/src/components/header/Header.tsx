import LanguageSwitch from '@/components/header/switch/LanguageSwitch';
import ThemeSwitch from '@/components/header/switch/ThemeSwitch';

function Header() {
  return (
    <div className="manage-header">
      <div className="header-left">1</div>
      <div className="header-right">
        <ThemeSwitch />
        <LanguageSwitch />
      </div>
    </div>
  );
}

export default Header;
