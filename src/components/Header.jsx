import '@/styles/Header.css';
import SvgIcon from '@/shared/SvgIcon';

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <SvgIcon name="NinjaOneLogo" width={120} height={26} />
      </div>
    </header>
  );
};

export default Header;
