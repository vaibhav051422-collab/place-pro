import { Link, useLocation, useNavigate } from "react-router-dom";
import "./../styles/Navbar.css";

function Navbar() {

    const navigate = useNavigate();
    const location = useLocation();

    const logout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("atsReport");

        navigate("/");

    };

    return (

        <nav className="navbar">

            <div className="logo">
                PlacePro AI
            </div>

            <div className="nav-links">

                <Link
                    className={location.pathname === "/upload" ? "active" : ""}
                    to="/upload"
                >
                    Upload Resume
                </Link>

                <Link
                    className={location.pathname === "/report" ? "active" : ""}
                    to="/report"
                >
                    ATS Report
                </Link>

                <Link
                    className={location.pathname === "/job-match" ? "active" : ""}
                    to="/job-match"
                >
                    Job Match
                </Link>

                <button onClick={logout}>
                    Logout
                </button>

            </div>

        </nav>

    );

}

export default Navbar;