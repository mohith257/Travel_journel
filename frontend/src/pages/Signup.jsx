import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/auth.css";

export default function Signup() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSignup = (e) => {
        e.preventDefault();

        if (!name || !email || !password) return;

        localStorage.setItem(
            "user",
            JSON.stringify({ name, email, password })
        );
        localStorage.setItem("isNewUser", "true");

        navigate("/welcome");
    };

    return (
        <div className="auth-container">
            <form onSubmit={handleSignup}>
                <h2>Signup</h2>

                <input
                    type="text"
                    placeholder="Name"
                    onChange={(e) => setName(e.target.value)}
                />

                <input
                    type="email"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button type="submit">Signup</button>
            </form>
        </div>
    );
}