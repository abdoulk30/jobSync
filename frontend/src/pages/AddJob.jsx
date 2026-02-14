import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddJob() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    company: "",
    jobTitle: "",
    location: "",
    dateApplied: new Date().toISOString().split("T")[0],
    applicationStatus: "Applied",
    jobUrl: "",
    source: "",
    salaryRange: "",
    jobType: "",
  });

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
      body: JSON.stringify(formData),
    });

    navigate("/jobs");
  };

  return (
    <div className="form-page">
      <h1 className="page-title">Add Job</h1>

      <form className="job-form-large" onSubmit={handleSubmit}>
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

        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
        />

        <input
          type="date"
          name="dateApplied"
          value={formData.dateApplied}
          onChange={handleChange}
        />

        <select
          name="applicationStatus"
          value={formData.applicationStatus}
          onChange={handleChange}
        >
          <option value="Applied">Applied</option>
          <option value="Interviewing">Interviewing</option>
          <option value="Offer">Offer</option>
          <option value="Rejected">Rejected</option>
        </select>

        <input
          type="text"
          name="jobUrl"
          placeholder="Job Posting Link"
          value={formData.jobUrl}
          onChange={handleChange}
        />

        <input
          type="text"
          name="source"
          placeholder="Platform (LinkedIn, Indeed, etc.)"
          value={formData.source}
          onChange={handleChange}
        />

        <input
          type="text"
          name="salaryRange"
          placeholder="Salary Range"
          value={formData.salaryRange}
          onChange={handleChange}
        />

        <input
          type="text"
          name="jobType"
          placeholder="Job Type (Full-time, Internship, etc.)"
          value={formData.jobType}
          onChange={handleChange}
        />

        <button type="submit">Add Job</button>
      </form>
    </div>
  );
}

export default AddJob;

