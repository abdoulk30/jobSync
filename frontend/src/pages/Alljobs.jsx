import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { authFetch } from "../services/api";

function AllJobs() {
  const [jobs, setJobs] = useState([]);
  const [statusFilter, setStatusFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");
  const [sortOption, setSortOption] = useState("Newest");
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    const res = await authFetch("/api/jobs");
    const data = await res.json();
    setJobs(data);
  };

  const handleStatusChange = async (id, newStatus) => {
    await authFetch(`/api/jobs/${id}`, {
      method: "PUT",
      body: JSON.stringify({ applicationStatus: newStatus }),
    });

    setJobs((prevJobs) =>
      prevJobs.map((job) =>
        job.id === id ? { ...job, applicationStatus: newStatus } : job
      )
    );
  };

  const toggleFavorite = async (id) => {
    const res = await authFetch(`/api/jobs/${id}/favorite`, {
      method: "PATCH",
    });

    if (!res.ok) return;

    const updated = await res.json();

    setJobs((prevJobs) =>
      prevJobs.map((job) =>
        job.id === id ? { ...job, isFavorite: updated.isFavorite } : job
      )
    );
  };

  const clearFilters = () => {
    setStatusFilter("All");
    setTypeFilter("All");
    setSortOption("Newest");
    setSearchTerm("");
  };

  const highlightText = (text) => {
    if (!searchTerm.trim()) return text;

    const regex = new RegExp(`(${searchTerm})`, "gi");
    const parts = text.split(regex);

    return parts.map((part, index) =>
      part.toLowerCase() === searchTerm.toLowerCase() ? (
        <span key={index} className="highlight">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  const filteredJobs = useMemo(() => {
    let filtered = [...jobs];

    if (searchTerm.trim() !== "") {
      filtered = filtered.filter((job) =>
        `${job.company} ${job.jobTitle}`
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== "All") {
      filtered = filtered.filter(
        (job) => job.applicationStatus === statusFilter
      );
    }

    if (typeFilter !== "All") {
      filtered = filtered.filter((job) => job.jobType === typeFilter);
    }

    if (sortOption === "Newest") {
      filtered.sort(
        (a, b) => new Date(b.dateApplied) - new Date(a.dateApplied)
      );
    } else if (sortOption === "Oldest") {
      filtered.sort(
        (a, b) => new Date(a.dateApplied) - new Date(b.dateApplied)
      );
    } else if (sortOption === "Company A-Z") {
      filtered.sort((a, b) => a.company.localeCompare(b.company));
    } else if (sortOption === "Company Z-A") {
      filtered.sort((a, b) => b.company.localeCompare(a.company));
    }

    return filtered;
  }, [jobs, statusFilter, typeFilter, sortOption, searchTerm]);

  return (
    <div>
      <h1 className="page-title">All Jobs</h1>

      {/* SEARCH */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by company or title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      {/* FILTERS */}
      <div className="filters-container">
        <div className="filters">
          <div className="filter-group">
            <label>Status</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">All</option>
              <option value="Applied">Applied</option>
              <option value="Interviewing">Interviewing</option>
              <option value="Offer">Offer</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Type</label>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
            >
              <option value="All">All</option>
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Internship">Internship</option>
              <option value="Contract">Contract</option>
              <option value="Temporary">Temporary</option>
              <option value="Freelance">Freelance</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Sort</label>
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option value="Newest">Newest</option>
              <option value="Oldest">Oldest</option>
              <option value="Company A-Z">Company A-Z</option>
              <option value="Company Z-A">Company Z-A</option>
            </select>
          </div>

          <button className="clear-btn" onClick={clearFilters}>
            Clear Filters
          </button>
        </div>
      </div>

      <div className="job-count">
        {filteredJobs.length}{" "}
        {filteredJobs.length === 1 ? "Job" : "Jobs"} Found
      </div>

      {filteredJobs.length === 0 ? (
        <div className="empty-state">
          <h3>No jobs found</h3>
          <p>Try adjusting your filters or search terms.</p>
          <button onClick={clearFilters} className="primary">
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="jobs-grid">
          {filteredJobs.map((job) => (
            <div
              key={job.id}
              className="job-card animate-in"
              onClick={() => navigate(`/jobs/${job.id}`)}
              style={{ cursor: "pointer", position: "relative" }}
            >
              <div
                className={`favorite-star ${
                  job.isFavorite ? "favorited" : ""
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFavorite(job.id);
                }}
              >
                ★
              </div>

              <div className="job-company">
                {highlightText(job.company)}
              </div>

              <div className="job-title">
                {highlightText(job.jobTitle)}
              </div>

              <div
                className={`status-badge ${job.applicationStatus.toLowerCase()}`}
                onClick={(e) => e.stopPropagation()}
              >
                <select
                  value={job.applicationStatus}
                  onClick={(e) => e.stopPropagation()}
                  onChange={(e) => {
                    e.stopPropagation();
                    handleStatusChange(job.id, e.target.value);
                  }}
                  className="status-dropdown"
                >
                  <option value="Applied">Applied</option>
                  <option value="Interviewing">Interviewing</option>
                  <option value="Offer">Offer</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AllJobs;