import "../styles/home.css";

export default function Home({ entries }) {
    return (
        <div className="home">
            {entries.length === 0 ? (
                <h2>No entries yet</h2>
            ) : (
                entries.map((item, index) => (
                    <div className="card" key={index}>
                        <h3>{item.title}</h3>
                        <p>{item.date}</p>
                    </div>
                ))
            )}
        </div>
    );
}