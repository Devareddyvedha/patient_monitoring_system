import React, { useState, useContext } from "react";
import Sidebar from "../components/Sidebar";
import Dashboard from "./Dashboard";
import Patients from "./Patients";
import Reports from "./Reports";
import Settings from "./Settings";
import { AuthContext } from "../context/AuthContext";

export default function Layout() {
  const [page, setPage] = useState("dashboard");
  const { logout } = useContext(AuthContext);

  const renderPage = () => {
    switch (page) {
      case "patients":
        return <Patients />;
      case "reports":
        return <Reports />;
      case "settings":
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <Sidebar setPage={setPage} logout={logout} />
      <div style={{ flex: 1, padding: 24, background: "#f5f7fb" }}>
        {renderPage()}
      </div>
    </div>
  );
}
