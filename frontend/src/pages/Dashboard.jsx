import { useEffect, useState } from "react";

function Dashboard() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/jobs")
      .then((res) => res.json())
      .then((data) => setJobs(data.slice(0, 4))); // only last 4
  }, []);

  return (
    <div>
      <h1 className="page-title">Dashboard</h1>

      <h2 className="section-title">Recent Jobs</h2>

      {jobs.map((job) => (
        <div key={job.id} className="job-card">
          <div className="job-company">{job.company}</div>
          <div className="job-title">{job.jobTitle}</div>
        </div>
      ))}
    </div>
  );
}

export default Dashboard;
