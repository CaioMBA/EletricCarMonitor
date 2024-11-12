// src/pages/Dashboard.js
import React, { useEffect, useState } from "react";
import api from "../services/api";

function Dashboard() {
  const [chargingSessions, setChargingSessions] = useState([]);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await api.get("/sessions", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setChargingSessions(response.data);
      } catch (error) {
        console.error("Erro ao buscar sessões de recarga:", error);
        window.location.href = "/login";
      }
    };
    fetchSessions();
  }, []);

  return (
    <div>
      <h2>Dashboard de Recarga</h2>
      {chargingSessions.length > 0 ? (
        <ul>
          {chargingSessions.map((session) => (
            <li key={session.id}>
              Status: {session.status} - Fonte: {session.source} - Preferências:{" "}
              {session.preferences}
            </li>
          ))}
        </ul>
      ) : (
        <p>Nenhuma sessão de recarga encontrada.</p>
      )}
    </div>
  );
}

export default Dashboard;
