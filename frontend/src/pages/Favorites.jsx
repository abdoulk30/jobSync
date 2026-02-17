import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authFetch } from "../services/api";

function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchFavorites = async () => {
    const res = await authFetch("/api/jobs");
    const data = await res.json();

    // Only keep favorited jobs
    const favoritedJobs = data.filter((job) => job.isFavorite);
    setFavorites(favoritedJobs);
  };

  if (favorites.length === 0) {
    return (
      <div>
        <h1 className="page-title">Favorites</h1>
        <div className="empty-state">
          <h3>No favorites yet</h3>
          <p>Star jobs from the All Jobs page to see them here.</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="page-title">Favorites</h1>

      <div className="jobs-grid">
        {favorites.map((job) => (
          <div
            key={job.id}
            className="job-card animate-in"
            onClick={() => navigate(`/jobs/${job.id}`)}
            style={{ cursor: "pointer" }}
          >
            <div className="job-company">{job.company}</div>
            <div className="job-title">{job.jobTitle}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Favorites;