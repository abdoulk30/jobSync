import { useEffect, useState } from "react";

function AllJobs() {
  const [jobs, setJobs] = useState([]);
  const [filter, setFilter] = useState("All");
  const [sortBy, setSortBy] = useState("date");

  useEffect(() => {
    fetch("http://localhost:5000/api/jobs")
      .then((res) => res.json())
      .then((data) => setJobs(data))
      .catch((err) => console.error(err));
  }, []);

  const filteredJobs = jobs
    .filter((job) =>
      filter === "All" ? true : job.applicationStatus === filter
    )
    .sort((a, b) => {
      if (sortBy === "company") {
        return a.company.localeCompare(b.company);
      } else {
        return new Date(b.createdAt) - new Date(a.createdAt);
      }
    });

  return (
    <div className="page-container">
      <h1 className="page-title">All Jobs</h1>

      <div className="controls">
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="All">All</option>
          <option value="Applied">Applied</option>
          <option value="Interviewing">Interviewing</option>
          <option value="Offer">Offer</option>
          <option value="Rejected">Rejected</option>
        </select>

        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="date">Sort by Date</option>
          <option value="company">Sort A-Z</option>
        </select>
      </div>

      {filteredJobs.map((job) => (
        <div key={job.id} className="job-card">
          <h3>{job.company}</h3>
          <p>{job.jobTitle}</p>
          <p className="status">{job.applicationStatus}</p>
        </div>
      ))}
    </div>
  );
}

export default AllJobs;
