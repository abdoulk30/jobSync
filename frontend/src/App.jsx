import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import AllJobs from "./pages/AllJobs";
import Favorites from "./pages/Favorites";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="app-container">
        <nav className="navbar">
          <h2 className="logo">JobSync</h2>
          <div className="nav-links">
            <Link to="/">Dashboard</Link>
            <Link to="/jobs">All Jobs</Link>
            <Link to="/favorites">Favorites</Link>
          </div>
        </nav>

        <div className="page-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/jobs" element={<AllJobs />} />
            <Route path="/favorites" element={<Favorites />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
