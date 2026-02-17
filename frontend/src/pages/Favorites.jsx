import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authFetch } from "../services/api";

function Favorites() {
  console.log("FAVORITES COMPONENT LOADED");

  const [jobs, setJobs] = useState([]);
  const [confirmId, setConfirmId] = useState(null);
  const [removingId, setRemovingId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFavorites = async () => {
      const res = await authFetch("/api/jobs");
      const data = await res.json();
      setJobs(data.filter((job) => job.isFavorite));
    };

    fetchFavorites();
  }, []);

  const confirmRemoveFavorite = async () => {
    if (!confirmId) return;

    setRemovingId(confirmId);

    await authFetch(`/api/jobs/${confirmId}/favorite`, {
      method: "PATCH",
    });

    // Wait for animation to finish
    setTimeout(() => {
      setJobs((prev) => prev.filter((job) => job.id !== confirmId));
      setConfirmId(null);
      setRemovingId(null);
    }, 300);
  };

  return (
    <div>
      <h1 className="page-title">Favorites</h1>

      {jobs.length === 0 ? (
        <div className="empty-state">
          <h3>No favorites yet</h3>
          <p>Star a job to add it here.</p>
        </div>
      ) : (
        <div className="jobs-grid">
          {jobs.map((job) => (
            <div
              key={job.id}
              className={`job-card animate-in ${
                removingId === job.id ? "fade-out" : ""
              }`}
              onClick={() => navigate(`/jobs/${job.id}`)}
              style={{ cursor: "pointer", position: "relative" }}
            >
              {/* ⭐ Yellow star */}
              <div
                className="favorite-star favorited"
                onClick={(e) => {
                  e.stopPropagation();
                  setConfirmId(job.id);
                }}
              >
                ★
              </div>

              <div className="job-company">{job.company}</div>
              <div className="job-title">{job.jobTitle}</div>

              <div
                className={`status-badge ${job.applicationStatus.toLowerCase()}`}
                onClick={(e) => e.stopPropagation()}
              >
                {job.applicationStatus}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Custom Modal */}
      {confirmId && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Remove from favorites?</h3>
            <p>This job will no longer appear in your favorites list.</p>

            <div className="modal-actions">
              <button
                className="secondary"
                onClick={() => setConfirmId(null)}
              >
                Cancel
              </button>

              <button
                className="danger"
                onClick={confirmRemoveFavorite}
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Favorites;