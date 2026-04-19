import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getEntries } from "../services/api";
import "../styles/view.css";

export default function ViewEntry() {
    const { id } = useParams();
    const [entry, setEntry] = useState(null);

    useEffect(() => {
        getEntries().then((data) => {
            const found = data.find((item) => item.id.toString() === id);
            setEntry(found);
        });
    }, [id]);

    if (!entry) return <h2>Not found</h2>;

    return (
        <div className="view-container">

            <h2 className="view-title">{entry.title}</h2>

            <p className="view-date">{entry.date}</p>

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