import { useEffect, useState } from "react";

function App() {
  const [jobs, setJobs] = useState([]);
  const [form, setForm] = useState({
    company: "",
    jobTitle: "",
    location: "",
  });

  useEffect(() => {
    fetch("http://localhost:5000/api/jobs")
      .then((res) => res.json())
      .then((data) => setJobs(data))
      .catch((err) => console.error(err));
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newJob = {
      ...form,
      applicationStatus: "Applied",
      dateApplied: new Date().toISOString(),
      jobType: "Full-time",
      salaryRange: "",
      notes: "",
      source: "Manual",
    };

    const res = await fetch("http://localhost:5000/api/jobs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newJob),
    });

    const data = await res.json();

    setJobs([data, ...jobs]);
    setForm({ company: "", jobTitle: "", location: "" });
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>My Jobs</h1>

      <form onSubmit={handleSubmit} style={{ marginBottom: "2rem" }}>
        <input
          name="company"
          placeholder="Company"
          value={form.company}
          onChange={handleChange}
          required
        />
        <input
          name="jobTitle"
          placeholder="Job Title"
          value={form.jobTitle}
          onChange={handleChange}
          required
        />
        <input
          name="location"
          placeholder="Location"
          value={form.location}
          onChange={handleChange}
        />
        <button type="submit">Add Job</button>
      </form>

      {jobs.map((job) => (
        <div key={job.id} style={{ marginBottom: "1rem" }}>
          <h3>{job.company}</h3>
          <p>{job.jobTitle}</p>
          <small>{job.applicationStatus}</small>
        </div>
      ))}
    </div>
  );
}

export default App;

