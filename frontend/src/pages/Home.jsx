import { useEffect, useState } from "react";
import { getEntries } from "../services/api";
import { Link } from "react-router-dom";
import "../styles/home.css";

export default function Home() {
    const [entries, setEntries] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEntries = async () => {
            try {
                const userId = localStorage.getItem("userId");
                if (!userId) {
                    setLoading(false);
                    return;
                }

                const response = await getEntries(userId);
                const data = response.data || [];
                
                // Sort by latest date first
                const sorted = data.sort(
                    (a, b) => new Date(b.date) - new Date(a.date)
                );
                setEntries([...sorted]);
            } catch (error) {
                console.error("Error fetching entries:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchEntries();
    }, []);

    const filtered = entries.filter((item) =>
        item.title.toLowerCase().includes(search.toLowerCase())
    );

    if (loading) {
        return <div className="home"><h2>Loading...</h2></div>;
    }

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
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            <div className="card-container">
                {filtered.length === 0 ? (
                    <h3>No entries found</h3>
                ) : (
                    filtered.map((item) => (
                        <div className="card" key={item._id}>
                            <h3>
                                <Link to={`/view/${item._id}`} className="link">
                                    {item.title}
                                </Link>
                            </h3>
                            <p>{new Date(item.date).toLocaleDateString()}</p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}