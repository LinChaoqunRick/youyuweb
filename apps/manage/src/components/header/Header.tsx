import LanguageSwitch from '@/components/header/switch/LanguageSwitch';
import ThemeSwitch from '@/components/header/switch/ThemeSwitch';
import Breadcrumbs from '@/components/header/breadcrumb/Breadcrumbs';

function Header() {
  return (
    <div className="manage-header">
      <div className="header-left">
        <Breadcrumbs />
      </div>
      <div className="header-right">
        <ThemeSwitch />
        <LanguageSwitch />
      </div>
    </div>
  );
}

export default Header;
