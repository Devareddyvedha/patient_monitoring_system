import React, { useContext } from "react";
import LoginScreen from "./src/screens/LoginScreen";
import Layout from "./src/screens/Layout";
import { AuthProvider, AuthContext } from "./src/context/AuthContext";

function Main() {
  const { doctor, loading } = useContext(AuthContext);

  if (loading) {
    return <div style={{ textAlign: "center", marginTop: 100 }}>Loading…</div>;
  }

  // 🔐 AUTH GATE
  return doctor ? <Layout /> : <LoginScreen />;
}

export default function App() {
  return (
    <AuthProvider>
      <Main />
    </AuthProvider>
  );
}

