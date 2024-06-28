import "./navbar.css";
import { Link } from "react-router-dom";
import { LuPopcorn } from "react-icons/lu";
import { IoMdSearch } from "react-icons/io";

export default function Navbar() {


    return <>
        <nav>
            <div className="content">
                <div>
                    <Link to={"/"}>
                        <p className="title">Cinemon <LuPopcorn color="#ffbc12" /></p>
                    </Link>
                </div>
                <div className="links">
                        <Link to={"/"}>Home</Link>
                        <Link to={"/about"}>About</Link>
                </div>
                <div>
                    <div className="search-bar">
                        <button><IoMdSearch /></button>
                        <input type="text" />
                    </div>
                    <button className="login-button">Login</button>
                </div>
            </div>
        </nav>
    </>

}