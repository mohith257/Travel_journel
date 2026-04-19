import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createEntry } from "../services/api";
import "../styles/form.css";

export default function CreateEntry() {
    const [title, setTitle] = useState("");
    const [date, setDate] = useState("");
    const [description, setDescription] = useState("");
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async () => {
        if (!title || !date || !description) {
            alert("Please fill all required fields");
            return;
        }

        const userId = localStorage.getItem("userId");
        if (!userId) {
            alert("Please login first");
            navigate("/login");
            return;
        }

        setLoading(true);
        try {
            const newEntry = {
                userId,
                title,
                date,
                description,
                images,
                location: { lat: 0, lng: 0 },
            };

            await createEntry(newEntry);
            navigate("/");
        } catch (error) {
            alert(error.response?.data?.message || "Failed to create entry");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="form-container">
            <h2>Add Entry</h2>

            <input
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
            />

            <textarea
                placeholder="Write your experience..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            ></textarea>

            <input
                type="file"
                multiple
                accept="image/*"
                onChange={(e) => {
                    const files = Array.from(e.target.files).slice(0, 3);
                    
                    // Convert files to Base64
                    const promises = files.map((file) => {
                        return new Promise((resolve) => {
                            const reader = new FileReader();
                            reader.onloadend = () => {
                                resolve(reader.result);
                            };
                            reader.readAsDataURL(file);
                        });
                    });

                    Promise.all(promises).then((base64Images) => {
                        setImages(base64Images);
                    });
                }}
            />

            <div className="preview-container">
                {images.map((img, index) => (
                    <img key={index} src={img} alt="" />
                ))}
            </div>

            <button onClick={handleSubmit} disabled={loading}>
                {loading ? "Saving..." : "Save"}
            </button>
        </div>
    );
}