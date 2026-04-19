import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/welcome.css";

export default function Welcome() {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user"));
    const isNewUser = localStorage.getItem("isNewUser");

    useEffect(() => {
        setTimeout(() => navigate("/"), 2000);
    }, [navigate]);

    return (
        <div className="welcome-container">
            <h1>
                {isNewUser === "true"
                    ? `Welcome, ${user?.name}`
                    : `Welcome back, ${user?.name}`}
            </h1>
        </div>
    );
}