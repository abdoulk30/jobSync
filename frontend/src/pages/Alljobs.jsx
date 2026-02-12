import { useEffect, useState } from "react";

function AllJobs() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/jobs")
      .then((res) => res.json())
      .then((data) => setJobs(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h1>All Jobs</h1>

      {jobs.map((job) => (
        <div key={job.id} className="job-card">
          <h3>{job.company}</h3>
          <p>{job.jobTitle}</p>
        </div>
      ))}
    </div>
  );
}

export default AllJobs;
