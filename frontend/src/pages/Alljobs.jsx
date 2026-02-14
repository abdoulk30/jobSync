import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function AllJobs() {
  const [jobs, setJobs] = useState([]);
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

    // Update UI immediately without refetching
    setJobs((prevJobs) =>
      prevJobs.map((job) =>
        job.id === id ? { ...job, applicationStatus: newStatus } : job
      )
    );
  };

  return (
    <div>
      <h1 className="page-title">All Jobs</h1>

      <div className="jobs-grid">
        {jobs.map((job) => (
          <div key={job.id} className="job-card" onClick={() => navigate(`/jobs/${job.id}`)} style={{ cursor: "pointer" }}>
            <div className="job-company">{job.company}</div>
            <div className="job-title">{job.jobTitle}</div>

            <div className={`status-badge ${job.applicationStatus.toLowerCase()}`}
            onClick={(e) => e.stopPropagation()}>
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
