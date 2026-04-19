import "../styles/home.css";

export default function Home() {
    const dummy = [
        { id: 1, title: "Goa Trip", date: "2025-01-10" },
        { id: 2, title: "Manali", date: "2025-02-15" },
    ];

    return (
        <div className="home">
            {dummy.map((item) => (
                <div className="card" key={item.id}>
                    <h3>{item.title}</h3>
                    <p>{item.date}</p>
                </div>
            ))}
        </div>
    );
}