import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getEntry } from "../services/api";
import "../styles/view.css";

export default function ViewEntry() {
    const { id } = useParams();
    const [entry, setEntry] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEntry = async () => {
            try {
                const response = await getEntry(id);
                setEntry(response.data);
            } catch (error) {
                console.error("Error fetching entry:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchEntry();
    }, [id]);

    if (loading) return <h2>Loading...</h2>;
    if (!entry) return <h2>Entry not found</h2>;

    return (
        <div className="view-container">
            <h2 className="view-title">{entry.title}</h2>

            <p className="view-date">
                {new Date(entry.date).toLocaleDateString()}
            </p>

            <p className="view-description">{entry.description}</p>

            {entry.images &&
                entry.images.map((img, index) => (
                    <img key={index} src={img} alt="" />
                ))}

            <button className="back-btn" onClick={() => window.history.back()}>
                Back
            </button>
        </div>
    );
}