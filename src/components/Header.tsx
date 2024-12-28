import "../styles/Header.css";
import ProfileImg from "./profileImg";

const Header: React.FC = () => {
  return (
    <nav className="nav-bar">
      <span>Plot me</span>
      <ProfileImg />
    </nav>
  );
};

export default Header;
