import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createEntry } from "../services/api";
import "../styles/form.css";

export default function CreateEntry() {
    const [title, setTitle] = useState("");
    const [date, setDate] = useState("");
    const [description, setDescription] = useState("");
    const [images, setImages] = useState([]);

    const navigate = useNavigate();

    const handleSubmit = async () => {
        const newEntry = {
            id: Date.now(),
            title,
            date,
            description,
            images,   // ✅ store array
            location: { lat: 0, lng: 0 }
        };

        await createEntry(newEntry);
        navigate("/");
    };

    return (
        <div className="form-container">
            <h2>Add Entry</h2>

            <input placeholder="Title" onChange={(e) => setTitle(e.target.value)} />
            <input type="date" onChange={(e) => setDate(e.target.value)} />

            <textarea
                placeholder="Write your experience..."
                onChange={(e) => setDescription(e.target.value)}
            ></textarea>

            <input
                type="file"
                multiple
                accept="image/*"
                onChange={(e) => {
                    const files = Array.from(e.target.files).slice(0, 3);
                    const imageUrls = files.map((file) =>
                        URL.createObjectURL(file)
                    );
                    setImages(imageUrls);
                }}
            />

            <div className="preview-container">
                {images.map((img, index) => (
                    <img key={index} src={img} alt="" />
                ))}
            </div>

            <button onClick={handleSubmit}>Save</button>
        </div>
    );
}