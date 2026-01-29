import React, { useEffect, useState } from "react";
import { fetchDashboard } from "../services/api";
import "./dashboard.css"; // IMPORTANT

export default function Dashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchDashboard().then(res => setData(res.data));
  }, []);

  if (!data) return <div className="loading">Loading…</div>;

  const risk = data.latest.risk;
  const prob = data.latest.probability;

  return (
    <div className="layout">

      {/* ===== SIDEBAR ===== */}
      <aside className="sidebar">
        <h2 className="logo">Healthus</h2>
        <nav>
          <div className="nav-item active">Dashboard</div>
          <div className="nav-item">Patients</div>
          <div className="nav-item">Appointments</div>
          <div className="nav-item">Reports</div>
          <div className="nav-item">Settings</div>
        </nav>
      </aside>

      {/* ===== MAIN ===== */}
      <main className="main">
        <div className="main-inner">

          {/* HEADER */}
          <div className="header">
            <h1>Patient Monitoring</h1>
            <span className="live">● Live</span>
          </div>

          {/* STATS */}
          <div className="stats">
            <Stat title="Total Patients" value="1644" />
            <Stat title="High Risk" value="300" />
            <Stat title="Stable" value="1000" />
            <Stat title="Alerts Today" value="35" />
          </div>

          {/* CHARTS */}
          <div className="charts section">
            <div className="card">
              <h3>Risk Trend</h3>
              <svg width="100%" height="200">
                <polyline
                  points="0,120 60,80 120,100 180,40 240,70"
                  fill="none"
                  stroke="#4f7cff"
                  strokeWidth="3"
                />
              </svg>
            </div>

            <div className="card">
              <h3>Risk Distribution</h3>
              <svg width="200" height="200" viewBox="0 0 32 32">
                <circle r="16" cx="16" cy="16" fill="#eafaf1" />
                <circle
                  r="16"
                  cx="16"
                  cy="16"
                  fill="transparent"
                  stroke="#ef4444"
                  strokeWidth="8"
                  strokeDasharray="25 75"
                  transform="rotate(-90 16 16)"
                />
              </svg>
              <p>
                Normal {prob.Normal}% | Warning {prob.Warning}% | High {prob["High Risk"]}%
              </p>
            </div>
          </div>

          {/* PATIENT TRIAGE */}
          <div className="card section">
            <h3>Patient Triage</h3>
            <table>
              <thead>
                <tr>
                  <th>Patient</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Ethan</td>
                  <td className="badge-high">High Risk</td>
                </tr>
                <tr>
                  <td>Liam</td>
                  <td className="badge-warning">Warning</td>
                </tr>
                <tr>
                  <td>Sophia</td>
                  <td className="badge-normal">Normal</td>
                </tr>
              </tbody>
            </table>
          </div>

        </div>
      </main>
    </div>
  );
}

/* ===== STAT CARD COMPONENT ===== */
function Stat({ title, value }) {
  return (
    <div className="stat">
      <span>{title}</span>
      <strong>{value}</strong>
    </div>
  );
}
