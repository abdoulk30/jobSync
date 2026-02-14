import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function JobDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/jobs/${id}`)
      .then((res) => res.json())
      .then((data) => setJob(data))
      .catch((err) => console.error(err));
  }, [id]);

  const handleDelete = async () => {
    await fetch(`http://localhost:5000/api/jobs/${id}`, {
      method: "DELETE",
    });

    navigate("/jobs");
  };

  if (!job) return <div className="page-title">Loading...</div>;

  return (
    <div>
      <h1 className="page-title">{job.company}</h1>

      <div className="job-details-card">
        <p><strong>Job Title:</strong> {job.jobTitle}</p>
        <p><strong>Location:</strong> {job.location}</p>
        <p><strong>Status:</strong> {job.applicationStatus}</p>
        <p><strong>Date Applied:</strong> {new Date(job.dateApplied).toLocaleDateString()}</p>
        <p><strong>Platform:</strong> {job.source}</p>
        <p><strong>Salary:</strong> {job.salaryRange}</p>
        <p><strong>Type:</strong> {job.jobType}</p>

        {job.jobUrl && (
          <p>
            <strong>Link:</strong>{" "}
            <a href={job.jobUrl} target="_blank" rel="noreferrer">
              View Posting
            </a>
          </p>
        )}

        <div className="details-actions">
          <button className="edit-btn">Edit</button>
          <button className="delete-btn" onClick={handleDelete}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default JobDetails;
