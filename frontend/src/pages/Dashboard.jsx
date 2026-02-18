import { useEffect, useState } from "react";
import { authFetch } from "../services/api";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

function Dashboard() {
  const [stats, setStats] = useState({
    total: 0,
    applied: 0,
    interviewing: 0,
    offer: 0,
    rejected: 0,
    favorites: 0,
  });

  const [theme, setTheme] = useState(document.body.classList.contains("dark") ? "dark" : "light");

  useEffect(() => {
    const fetchJobs = async () => {
      const res = await authFetch("/api/jobs");
      const jobs = await res.json();
      setStats({
        total: jobs.length,
        applied: jobs.filter(j => j.applicationStatus === "Applied").length,
        interviewing: jobs.filter(j => j.applicationStatus === "Interviewing").length,
        offer: jobs.filter(j => j.applicationStatus === "Offer").length,
        rejected: jobs.filter(j => j.applicationStatus === "Rejected").length,
        favorites: jobs.filter(j => j.isFavorite).length,
      });
    };
    fetchJobs();

    const observer = new MutationObserver(() => {
      setTheme(document.body.classList.contains("dark") ? "dark" : "light");
    });
    observer.observe(document.body, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  const data = {
    labels: ["Applied", "Interviewing", "Offer", "Rejected"],
    datasets: [{
      data: [stats.applied, stats.interviewing, stats.offer, stats.rejected],
      backgroundColor: ["#3b82f6", "#f59e0b", "#10b981", "#ef4444"],
      borderWidth: 0,
    }],
  };

  const options = {
    plugins: {
      legend: {
        position: "right",
        labels: {
          color: theme === "dark" ? "#f1f5f9" : "#0f172a",
          padding: 20,
          boxWidth: 12,
          font: { size: 14, weight: '500' },
        },
      },
    },
    cutout: "60%", 
    maintainAspectRatio: false,
  };

  return (
    <div className="dashboard-page">
      <h1 className="page-title">Dashboard</h1>

      <div className="stats-grid">
        <div className="stat-card"><h3>Total Applications</h3><p>{stats.total}</p></div>
        <div className="stat-card"><h3>Applied</h3><p>{stats.applied}</p></div>
        <div className="stat-card"><h3>Interviewing</h3><p>{stats.interviewing}</p></div>
        <div className="stat-card"><h3>Offers</h3><p>{stats.offer}</p></div>
        <div className="stat-card"><h3>Rejected</h3><p>{stats.rejected}</p></div>
        <div className="stat-card"><h3>Favorites</h3><p>{stats.favorites}</p></div>
      </div>

      <div className="visuals-row">
        {/* LEFT: RING CHART */}
        <div className="chart-wrapper left-align">
          <div className="pie-size-container">
            <Doughnut data={data} options={options} />
          </div>
        </div>

        {/* RIGHT: SLIM FUNNEL + REJECTED CIRCLE */}
        <div className="chart-wrapper right-align">
          <div className="pipeline-wrapper">
             <div className="funnel-container">
                <h3 className="visual-label">Application Pipeline</h3>
                <div className="funnel-shape">
                  <div className="funnel-stage f-applied">
                    <span>Applied</span><strong>{stats.applied}</strong>
                  </div>
                  <div className="funnel-stage f-interview">
                    <span>Interviewing</span><strong>{stats.interviewing}</strong>
                  </div>
                  <div className="funnel-stage f-offer">
                    <span>Offers</span><strong>{stats.offer}</strong>
                  </div>
                </div>
              </div>

              <div className="rejection-zone">
                {/* Heading removed here */}
                <div className="rejected-circle">
                   <span className="rejected-count">{stats.rejected}</span>
                   <span className="rejected-label">Rejected</span>
                </div>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;