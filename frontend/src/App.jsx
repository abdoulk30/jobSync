import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import AllJobs from "./pages/AllJobs";
import AddJob from "./pages/AddJob";
import Favorites from "./pages/Favorites";
import JobDetails from "./pages/JobDetails";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="app-container">
        <nav className="navbar">
          <h2 className="logo">JobSync</h2>
          <div className="nav-links">
            <Link to="/">Dashboard</Link>
            <Link to="/add">Add Job</Link>
            <Link to="/jobs">All Jobs</Link>
            <Link to="/favorites">Favorites</Link>
          </div>
        </nav>

        <div className="page-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/add" element={<AddJob />} />
            <Route path="/jobs" element={<AllJobs />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/jobs/:id" element={<JobDetails />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
