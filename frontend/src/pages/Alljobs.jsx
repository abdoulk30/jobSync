import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function AllJobs() {
  const [jobs, setJobs] = useState([]);
  const [statusFilter, setStatusFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");
  const [sortOption, setSortOption] = useState("Newest");
  const navigate = useNavigate();

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = () => {
    fetch("http://localhost:5000/api/jobs")
      .then((res) => res.json())
      .then((data) => setJobs(data));
  };

  const handleStatusChange = async (id, newStatus) => {
    await fetch(`http://localhost:5000/api/jobs/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ applicationStatus: newStatus }),
    });

    // Update UI immediately
    setJobs((prevJobs) =>
      prevJobs.map((job) =>
        job.id === id ? { ...job, applicationStatus: newStatus } : job
      )
    );
  };

  // 🔥 Filtering + Sorting Logic
  let filteredJobs = [...jobs];

  // Filter by status
  if (statusFilter !== "All") {
    filteredJobs = filteredJobs.filter(
      (job) => job.applicationStatus === statusFilter
    );
  }

  // Filter by job type
  if (typeFilter !== "All") {
    filteredJobs = filteredJobs.filter(
      (job) => job.jobType === typeFilter
    );
  }

  // Sorting
  if (sortOption === "Newest") {
    filteredJobs.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
  } else if (sortOption === "Oldest") {
    filteredJobs.sort(
      (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
    );
  } else if (sortOption === "Company A-Z") {
    filteredJobs.sort((a, b) =>
      a.company.localeCompare(b.company)
    );
  } else if (sortOption === "Company Z-A") {
    filteredJobs.sort((a, b) =>
      b.company.localeCompare(a.company)
    );
  }

  return (
    <div>
      <h1 className="page-title">All Jobs</h1>

      {/* Filters */}
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

        </div>
      </div>

      {/* Jobs Grid */}
      <div className="jobs-grid">
        {filteredJobs.map((job) => (
          <div
            key={job.id}
            className="job-card"
            onClick={() => navigate(`/jobs/${job.id}`)}
            style={{ cursor: "pointer" }}
          >
            <div className="job-company">{job.company}</div>
            <div className="job-title">{job.jobTitle}</div>

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
    </div>
  );
}

export default AllJobs;
