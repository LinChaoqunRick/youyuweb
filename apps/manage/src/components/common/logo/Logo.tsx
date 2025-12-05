import '../../menu/index.css';
import { useAppSettings } from '@/store/useAppSettings.ts';

function Logo() {
  const { menuCollapsed } = useAppSettings();
  const logoPath = menuCollapsed
    ? 'https://youyu-source.youyul.com/youyu/favicon.ico'
    : 'https://youyu-source.oss-cn-beijing.aliyuncs.com/youyu/logo_280x120.png';
  return (
    <img
      src={logoPath}
      className="logo"
      alt=""
      style={{
        width: menuCollapsed ? '42px' : 'auto',
        height: menuCollapsed ? '42px' : '54px',
        objectFit: 'contain',
      }}
    />
  );
}

export default Logo;
