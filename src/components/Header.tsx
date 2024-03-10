import { Link } from "react-router-dom";
import logo from "../assets/logo.svg";

const Header = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };
  return (
    <header className="header">
      <div className="nav">
        <nav className="manu container">
          <Link to="/">
            <img
              style={{ color: "#fff" }}
              className="logo"
              src={logo}
              alt="logo"
              onClick={scrollToTop}
            />
          </Link>

          <ul>
            <li>
              <Link onClick={scrollToTop} style={{ color: "#fff" }} to="/">
                Home
              </Link>
            </li>
            <li>
              <Link
                onClick={scrollToTop}
                style={{ color: "#fff" }}
                to="history"
              >
                History
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
