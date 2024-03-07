import { Link, useLocation } from "react-router-dom";
import logo from "../assets/logo.svg";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
export default function Header({ queryList }: any) {
  const ref = useRef(null);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };
  const navigate = useNavigate();
  const handleNavigation = () => {
    navigate("/about", {
      state: {
        queryList: queryList,
      },
    });
  };
  const handleClick = () => {
    scrollToTop();
    handleNavigation();
  };
  return (
    <header className="header" ref={ref}>
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
                onClick={handleClick}
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
}
