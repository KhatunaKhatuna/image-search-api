import { Link, useLocation } from "react-router-dom";
import logo from "../assets/logo.svg";

export default function Header() {
  const { pathname } = useLocation();

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
            />
          </Link>

          <ul>
            <li>
              <Link style={{ color: "#fff" }} to="/">
                Home
              </Link>
            </li>
            <li>
              <Link style={{ color: "#fff" }} to="history">
                History
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      {pathname === "/" && (
        <div className="search">
          <input type="search" placeholder="Search ..." />
        </div>
      )}
    </header>
  );
}
