import { MenuOutlined, ReloadOutlined } from '@ant-design/icons';
import { Popover } from 'antd';
import Breadcrumbs from '@/components/header/breadcrumb/Breadcrumbs';
import LanguageSwitch from '@/components/header/switch/LanguageSwitch';
import ThemeSwitch from '@/components/header/switch/ThemeSwitch';
import UserPanel from '@/components/header/userPanel/UserPanel';
import { useAppSettings } from '@/store/useAppSettings';
import { useUser } from '@/store/useUser';

function Header({ onRefresh }: { onRefresh: () => void }) {
  const { toggleMenuCollapsed } = useAppSettings();
  const { user } = useUser();

  return (
    <div className="manage-header">
      <div className="header-left">
        <MenuOutlined onClick={toggleMenuCollapsed} />
        <ReloadOutlined onClick={onRefresh} />
        <Breadcrumbs />
      </div>
      <div className="header-right">
        <ThemeSwitch />
        <LanguageSwitch />
        <Popover rootClassName="user-panel-popover" placement="bottomRight" content={<UserPanel user={user!} />}>
          <img className="header-avatar" src={user?.avatar} alt="avatar" />
        </Popover>
      </div>
    </div>
  );
}

export default Header;
