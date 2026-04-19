import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import CreateEntry from "./pages/CreateEntry";
import { useState } from "react";

function App() {
  const [entries, setEntries] = useState([]);

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home entries={entries} />} />
        <Route
          path="/create"
          element={<CreateEntry setEntries={setEntries} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;