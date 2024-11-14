// src/pages/Dashboard.js
import React, { useEffect, useState } from "react";
import api from "../services/api";
import "../css/dashboard.css";
import editIcon from "../assets/icons/edit_icon.png";
import deleteIcon from "../assets/icons/delete_icon.png";

function Dashboard() {
  const [chargingSessions, setChargingSessions] = useState([]);

  const backToLogin = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  async function updateSession(sessionId, status) {
    const token = localStorage.getItem("token");
    try {
      const response = await api.put(
        `/sessions/${sessionId}`,
        { status: status },
        {
          headers: { Authorization: `${token}` },
        }
      );
      console.log("Sessão atualizada:", response.data);
      window.location.reload(true);
    } catch (error) {
      console.error("Erro ao atualizar a sessão:", error);
    }
  }

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await api.get("/sessions", {
          headers: { Authorization: `${token}` },
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
    <div className="table-container">
      <button onClick={backToLogin}>return to login</button>
      <button onClick={() => {}}>Add new Session</button>
      <table>
        <thead>
          <tr>
            <th>Source</th>
            <th>Station</th>
            <th>User</th>
            <th>Preferences</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {chargingSessions.map((session) => (
            <tr id={session.id}>
              <td>{session.source}</td>
              <td>{session.station_id}</td>
              <td>{session.user_id}</td>
              <td>{session.preferences}</td>
              <td>{session.status}</td>
              <td>
                <div className="table-actions">
                  <button onClick={() => updateSession(session.id, "edited")}>
                    <img src={editIcon} alt="" />
                  </button>
                  <button onClick={() => updateSession(session.id, "canceled")}>
                    <img src={deleteIcon} alt="" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Dashboard;
