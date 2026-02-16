import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { authFetch } from "../services/api";

function JobDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [job, setJob] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    authFetch(`/api/jobs/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setJob(data);
        setFormData({
          ...data,
          dateApplied: data.dateApplied
            ? data.dateApplied.split("T")[0]
            : "",
        });
      })
      .catch((err) => console.error(err));
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    await authFetch(`/api/jobs/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...formData,
        dateApplied: formData.dateApplied
          ? new Date(formData.dateApplied).toISOString()
          : null,
      }),
    });

    setEditMode(false);

    const updated = await authFetch(`/api/jobs/${id}`);
    const data = await updated.json();
    setJob(data);
  };

  const handleDelete = async () => {
    await authFetch(`/api/jobs/${id}`, {
      method: "DELETE",
    });

    navigate("/jobs");
  };

  if (!job) return <div className="page-title">Loading...</div>;

  return (
  <div>
    <h1 className="page-title">Job Details</h1>

    {!editMode ? (
      <div className="job-card details-card">
        <h2>{job.company}</h2>

        <p><strong>Title:</strong> {job.jobTitle}</p>
        <p><strong>Status:</strong> {job.applicationStatus}</p>
        <p>
          <strong>Date Applied:</strong>{" "}
          {job.dateApplied
            ? job.dateApplied.split("T")[0]
            : "Not specified"}
        </p>
        <p><strong>Location:</strong> {job.location || "Not specified"}</p>
        <p><strong>Job Type:</strong> {job.jobType || "Not specified"}</p>
        <p><strong>Salary:</strong> {job.salaryRange || "Not specified"}</p>
        <p><strong>Platform:</strong> {job.source || "Not specified"}</p>
        <p>
          <strong>Link:</strong>{" "}
          {job.jobUrl ? (
            <a href={job.jobUrl} target="_blank" rel="noreferrer">
              View Posting
            </a>
          ) : (
            "Not provided"
          )}
        </p>

        <div className="details-actions">
          <button
            className="primary"
            onClick={() => setEditMode(true)}
          >
            Edit
          </button>

          <button
            className="danger"
            onClick={handleDelete}
          >
            Delete
          </button>

          <button
            className="secondary"
            onClick={() => navigate(-1)}
          >
           Back
          </button>
        </div>
      </div>
    ) : (
      <div className="job-card details-card">
        <input
          name="company"
          value={formData.company || ""}
          onChange={handleChange}
          placeholder="Company"
        />

        <input
          name="jobTitle"
          value={formData.jobTitle || ""}
          onChange={handleChange}
          placeholder="Job Title"
        />

        <input
          type="date"
          name="dateApplied"
          value={formData.dateApplied || ""}
          onChange={handleChange}
        />

        <input
          name="location"
          value={formData.location || ""}
          onChange={handleChange}
          placeholder="Location"
        />

        <input
          name="salaryRange"
          value={formData.salaryRange || ""}
          onChange={handleChange}
          placeholder="Salary Range"
        />

        <select
          name="applicationStatus"
          value={formData.applicationStatus || ""}
          onChange={handleChange}
        >
          <option value="Applied">Applied</option>
          <option value="Interviewing">Interviewing</option>
          <option value="Offer">Offer</option>
          <option value="Rejected">Rejected</option>
        </select>

        <select
          name="jobType"
          value={formData.jobType || ""}
          onChange={handleChange}
        >
          <option value="">Select Job Type</option>
          <option value="Full-time">Full-time</option>
          <option value="Part-time">Part-time</option>
          <option value="Internship">Internship</option>
          <option value="Contract">Contract</option>
          <option value="Temporary">Temporary</option>
          <option value="Freelance">Freelance</option>
          <option value="Other">Other</option>
        </select>

        <input
          name="jobUrl"
          value={formData.jobUrl || ""}
          onChange={handleChange}
          placeholder="Job URL"
        />

        <input
          name="source"
          value={formData.source || ""}
          onChange={handleChange}
          placeholder="Platform Applied"
        />

        <div className="details-actions">
          <button className="primary" onClick={handleSave}>
            Save
          </button>

          <button
            className="secondary"
            onClick={() => setEditMode(false)}
          >
            Cancel
          </button>
        </div>
      </div>
    )}
  </div>
);

}

export default JobDetails;
