"use client";
import Link from "next/link";
import { BarChart, Users, Activity, CheckCircle } from "lucide-react";

export default function Dashboard() {
  return (
    <div style={{ padding: "30px" }}>
      <h1 style={{ fontSize: "28px", fontWeight: "bold" }}>
        Dashboard 🚀
      </h1>

      <p style={{ marginTop: "10px", color: "gray" }}>
        Central hub for project insights and contributions
      </p>

      {/* Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "20px",
          marginTop: "30px",
        }}
      >
        {[ 
          { icon: <BarChart size={18} />, title: "Total Projects", value: "100+" },
          { icon: <Activity size={18} />, title: "Open Issues", value: "8" },
          { icon: <Users size={18} />, title: "Contributors", value: "Many" },
          { icon: <CheckCircle size={18} />, title: "Status", value: "Active" },
        ].map((item, i) => (
          <div
            key={i}
            style={card}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <h3 style={{ display: "flex", alignItems: "center", gap: "6px", justifyContent: "center" }}>
              {item.icon} {item.title}
            </h3>
            <p>{item.value}</p>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div style={{ marginTop: "40px" }}>
        <h2 style={{ marginBottom: "10px" }}>Recent Activity</h2>
        <ul style={{ marginTop: "10px", color: "gray" }}>
          <li>✔ New project added: Todo App</li>
          <li>✔ Issue #51 assigned</li>
          <li>✔ Contributor joined</li>
        </ul>
      </div>

      {/* Quick Actions */}
      <div style={{ marginTop: "40px" }}>
        <h2>Quick Actions</h2>

        <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
          <Link
            href="/projects"
            style={btnLink}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#333")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#222")}
          >
            View Projects
          </Link>

          <Link
            href="/contributors"
            style={btnLink}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#333")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#222")}
          >
            Open Issues
          </Link>
        </div>
      </div>
    </div>
  );
}

const card = {
  padding: "20px",
  border: "1px solid #ddd",
  borderRadius: "12px",
  textAlign: "center" as const,
  transition: "transform 0.2s ease",
};

const btnLink = {
  padding: "10px 15px",
  borderRadius: "8px",
  border: "1px solid #555",
  textDecoration: "none",
  color: "#fff",
  background: "#222",
  cursor: "pointer",
  transition: "background 0.2s",
};