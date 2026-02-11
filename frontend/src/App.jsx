import { useEffect, useState } from "react";

function App() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/jobs")
      .then((res) => res.json())
      .then((data) => setJobs(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="page">
      <div className="container">
        <h1 className="title">JobSync</h1>
        <p className="subtitle">Track your applications like a machine.</p>

        <div className="grid">
          {jobs.map((job) => (
            <div key={job.id} className="card">
              <h3>{job.company}</h3>
              <p className="role">{job.jobTitle}</p>
              <p className="location">{job.location}</p>
              <span className="status">{job.applicationStatus}</span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: -apple-system, BlinkMacSystemFont, sans-serif;
        }

        body {
          background: #0f0f14;
        }

        .page {
          min-height: 100vh;
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 60px 20px;
          background: radial-gradient(circle at top, #1a1a24, #0f0f14 60%);
        }


        .container {
          width: 100%;
          max-width: 900px;
        }

        .title {
          font-size: 42px;
          font-weight: 800;
          text-align: center;
          color: #ffffff;
          margin-bottom: 10px;
          letter-spacing: -1px;
        }

        .subtitle {
          text-align: center;
          color: #9ca3af;
          margin-bottom: 50px;
          font-size: 16px;
        }

        .grid {
          display: grid;
          gap: 25px;
        }

        .card {
          background: #1b1b26;
          padding: 25px;
          border-radius: 18px;
          transition: all 0.2s ease;
          border: 1px solid #2a2a38;
        }

        .card:hover {
          transform: translateY(-4px);
          border-color: #6366f1;
        }

        .card h3 {
          font-size: 20px;
          color: #ffffff;
          margin-bottom: 6px;
        }

        .role {
          font-size: 15px;
          color: #d1d5db;
          margin-bottom: 6px;
        }

        .location {
          font-size: 14px;
          color: #9ca3af;
          margin-bottom: 15px;
        }

        .status {
          display: inline-block;
          padding: 6px 14px;
          border-radius: 999px;
          background: #6366f1;
          color: white;
          font-size: 12px;
          font-weight: 600;
        }
      `}</style>
    </div>
  );
}

export default App;
