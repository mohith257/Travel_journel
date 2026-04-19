import { useState } from "react";
import "../styles/form.css";

export default function CreateEntry() {
    const [title, setTitle] = useState("");

    return (
        <div className="form-container">
            <h2>Add Travel Entry</h2>

            <input
                type="text"
                placeholder="Enter title"
                onChange={(e) => setTitle(e.target.value)}
            />

            <button>Save</button>
        </div>
    );
}