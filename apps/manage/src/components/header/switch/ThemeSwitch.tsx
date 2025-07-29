import { MoonFilled, SunFilled } from '@ant-design/icons';
import { useAppSettings } from '@/store/useAppSettings';

function ThemeSwitch() {
  const { theme, toggleTheme } = useAppSettings();
  return (
    <div className="theme-switch" onClick={() => toggleTheme()}>
      {theme === 'dark' ? <SunFilled /> : <MoonFilled />}
    </div>
  );
}

export default ThemeSwitch;
