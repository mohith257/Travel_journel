import { Link } from "react-router-dom";
import "../styles/navbar.css";

export default function Navbar() {
    return (
        <nav className="navbar">
            <h2>Travel Journal</h2>
            <div>
                <Link to="/">Home</Link>
                <Link to="/create">Add Entry</Link>
            </div>
        </nav>
    );
}