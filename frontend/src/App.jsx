import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import AllJobs from "./pages/AllJobs";
import AddJob from "./pages/AddJob";
import Favorites from "./pages/Favorites";
import JobDetails from "./pages/JobDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";

import "./App.css";

function AppContent() {
  const isLoggedIn = !!localStorage.getItem("token");
  const location = useLocation();

  const isAuthPage =
    location.pathname === "/login" ||
    location.pathname === "/register";

  return (
    <div className="app-container">
      <nav className="navbar">
        <h2 className="logo">JobSync</h2>

        <div className="nav-links">
          {!isAuthPage && isLoggedIn && (
            <>
              <Link to="/">Dashboard</Link>
              <Link to="/add">Add Job</Link>
              <Link to="/jobs">All Jobs</Link>
              <Link to="/favorites">Favorites</Link>
            </>
          )}
        </div>
      </nav>

      <div className={isAuthPage ? "auth-wrapper" : "page-content"}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/add"
            element={
              <ProtectedRoute>
                <AddJob />
              </ProtectedRoute>
            }
          />

          <Route
            path="/jobs"
            element={
              <ProtectedRoute>
                <AllJobs />
              </ProtectedRoute>
            }
          />

          <Route
            path="/favorites"
            element={
              <ProtectedRoute>
                <Favorites />
              </ProtectedRoute>
            }
          />

          <Route
            path="/jobs/:id"
            element={
              <ProtectedRoute>
                <JobDetails />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
