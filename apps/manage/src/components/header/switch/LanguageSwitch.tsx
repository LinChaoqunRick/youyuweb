import { TranslationOutlined } from '@ant-design/icons';
import { Dropdown } from 'antd';
import { initI18n } from '@/locales';
import { Language, useAppSettings } from '@/store/useAppSettings';
import type { MenuProps } from 'antd';

function ThemeSwitch() {
  const { language, setLanguage } = useAppSettings();

  const items: MenuProps['items'] = [
    {
      key: 'zh',
      label: '简体中文',
    },
    {
      key: 'en',
      label: 'English',
    },
  ];
  return (
    <Dropdown
      menu={{
        items,
        selectable: true,
        defaultSelectedKeys: [language],
        onClick: ({ key }: { key: Language }) => {
          setLanguage(key);
          initI18n(key).then(() => {
            // window.location.reload(); // 刷新页面让语言生效
          });
        },
      }}
      overlayClassName="language-switch-dropdown"
      trigger={['click']}
    >
      <div className="theme-switch">
        <TranslationOutlined />
      </div>
    </Dropdown>
  );
}

export default ThemeSwitch;
