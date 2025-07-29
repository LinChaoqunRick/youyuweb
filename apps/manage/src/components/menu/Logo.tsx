import './index.css';
import intl from 'react-intl-universal';

function Logo() {
  return <div className="logo">{intl.get('welcome')}</div>;
}

export default Logo;
