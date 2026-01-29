import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Sidebar({ setPage, logout }) {
  const { doctor } = useContext(AuthContext);

  return (
    <div style={styles.sidebar}>
      <h2 style={styles.logo}>Healthus</h2>

      <Nav label="Dashboard" onClick={() => setPage("dashboard")} />
      <Nav label="Patients" onClick={() => setPage("patients")} />
      <Nav label="Reports" onClick={() => setPage("reports")} />
      <Nav label="Settings" onClick={() => setPage("settings")} />

      <div style={styles.footer}>
        <p>{doctor?.displayName || doctor?.email}</p>
        <button style={styles.logout} onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  );
}

function Nav({ label, onClick }) {
  return (
    <div onClick={onClick} style={styles.navItem}>
      {label}
    </div>
  );
}

const styles = {
  sidebar: {
    width: 220,
    background: "#1f2937",
    color: "#fff",
    padding: 20,
    display: "flex",
    flexDirection: "column"
  },
  logo: {
    marginBottom: 30
  },
  navItem: {
    padding: "10px 0",
    cursor: "pointer",
    color: "#cbd5e1"
  },
  footer: {
    marginTop: "auto",
    fontSize: 12,
    color: "#9ca3af"
  },
  logout: {
    marginTop: 10,
    background: "#ef4444",
    color: "#fff",
    border: "none",
    padding: 8,
    cursor: "pointer",
    borderRadius: 6
  }
};
