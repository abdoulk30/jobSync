import { useEffect, useState } from "react";

function Dashboard() {
  const [jobs, setJobs] = useState([]);
  const [formData, setFormData] = useState({
    company: "",
    jobTitle: "",
  });

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = () => {
    fetch("http://localhost:5000/api/jobs")
      .then((res) => res.json())
      .then((data) => setJobs(data.slice(0, 4)));
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch("http://localhost:5000/api/jobs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...formData,
        applicationStatus: "Applied",
        dateApplied: new Date().toISOString(),
      }),
    });

    setFormData({ company: "", jobTitle: "" });
    fetchJobs();
  };

  return (
    <div>
      <h1 className="page-title">Dashboard</h1>

      {/* Add Job Form */}
      <form className="job-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="company"
          placeholder="Company"
          value={formData.company}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="jobTitle"
          placeholder="Job Title"
          value={formData.jobTitle}
          onChange={handleChange}
          required
        />
        <button type="submit">Add Job</button>
      </form>

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
