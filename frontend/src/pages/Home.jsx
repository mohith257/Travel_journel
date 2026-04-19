import { useEffect, useState } from "react";
import { getEntries } from "../services/api";
import { Link } from "react-router-dom";
import "../styles/home.css";

export default function Home() {
    const [entries, setEntries] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        getEntries().then((data) => {
            // ✅ sort by latest date first
            const sorted = data.sort(
                (a, b) => new Date(b.date) - new Date(a.date)
            );
            setEntries([...sorted]);
        });
    }, []);

    const filtered = entries.filter((item) =>
        item.title.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="home">
            <div className="hero">
                <h1>Your Travel Memories</h1>
                <p>Capture moments. Relive experiences.</p>
            </div>

            <h2 className="heading">Explore</h2>

            <input
                className="search"
                placeholder="Search your memories..."
                onChange={(e) => setSearch(e.target.value)}
            />

            <div className="card-container">
                {filtered.length === 0 ? (
                    <h3>No entries found</h3>
                ) : (
                    filtered.map((item) => (
                        <div className="card" key={item.id}>
                            <h3>
                                <Link to={`/view/${item.id}`} className="link">
                                    {item.title}
                                </Link>
                            </h3>
                            <p>{item.date}</p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}