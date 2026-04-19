import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateEntry({ setEntries }) {
    const [title, setTitle] = useState("");
    const navigate = useNavigate();

    const handleSubmit = () => {
        const newEntry = {
            title,
            date: new Date().toISOString().split("T")[0],
        };

        setEntries((prev) => [...prev, newEntry]);

        navigate("/"); // go back to home
    };

    return (
        <div className="form-container">
            <h2>Add Travel Entry</h2>

            <input
                type="text"
                placeholder="Enter title"
                onChange={(e) => setTitle(e.target.value)}
            />

            <button onClick={handleSubmit}>Save</button>
        </div>
    );
}