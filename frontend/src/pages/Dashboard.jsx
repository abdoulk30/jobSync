import { useEffect, useState } from "react";

function Dashboard() {
  const [stats, setStats] = useState({
    total: 0,
    applied: 0,
    interviewing: 0,
    offer: 0,
    rejected: 0,
  });

  useEffect(() => {
    fetch("http://localhost:5000/api/jobs")
      .then((res) => res.json())
      .then((jobs) => {
        const applied = jobs.filter(
          (job) => job.applicationStatus === "Applied"
        ).length;

        const interviewing = jobs.filter(
          (job) => job.applicationStatus === "Interviewing"
        ).length;

        const offer = jobs.filter(
          (job) => job.applicationStatus === "Offer"
        ).length;

        const rejected = jobs.filter(
          (job) => job.applicationStatus === "Rejected"
        ).length;

        setStats({
          total: jobs.length,
          applied,
          interviewing,
          offer,
          rejected,
        });
      });
  }, []);

  return (
    <div className="dashboard-page">
      <h1 className="page-title">Dashboard</h1>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Applications</h3>
          <p>{stats.total}</p>
        </div>

        <div className="stat-card">
          <h3>Applied</h3>
          <p>{stats.applied}</p>
        </div>

        <div className="stat-card">
          <h3>Interviewing</h3>
          <p>{stats.interviewing}</p>
        </div>

        <div className="stat-card">
          <h3>Offers</h3>
          <p>{stats.offer}</p>
        </div>

        <div className="stat-card">
          <h3>Rejected</h3>
          <p>{stats.rejected}</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
