import { Link, useLocation } from "react-router-dom";
import logo from "../assets/logo.svg";

export default function Header() {
  const { pathname } = useLocation();

  return (
    <header className="header">
      <nav className="nav container">
        <img style={{ color: "#fff" }} className="logo" src={logo} alt="logo" />
        <ul>
          <li>
            {pathname === "/" ? (
              <Link style={{ color: "#fff" }} to="history">
                History
              </Link>
            ) : (
              <Link style={{ color: "#fff" }} to="/">
                Home
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
}
