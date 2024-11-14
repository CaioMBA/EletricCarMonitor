import React, { useEffect, useState } from "react";
import api from "../services/api";
import "../css/dashboard.css";
import editIcon from "../assets/icons/edit_icon.png";
import deleteIcon from "../assets/icons/delete_icon.png";
import closeIcon from "../assets/icons/close_icon.png";

function Dashboard() {
  const [chargingSessions, setChargingSessions] = useState([]);
  const [preferenceMode, setPreferenceMode] = useState("");
  const [preferenceBattery, setPreferenceBattery] = useState("");
  const [status, setStatus] = useState("");

  const backToLogin = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  function showModal(id) {
    var modal = document.getElementById(id);
    modal.style.display = "block";
    modal.hidden = false;
  }

  function closeModal(id) {
    var modal = document.getElementById(id);
    modal.style.display = "none";
    modal.hidden = true;
  }

  function openEdit(id) {
    let sessionIdnput = document.getElementById("SessionIDInput");
    sessionIdnput.value = id;
    showModal("edit-session");
  }

  function handleEditSession(e) {
    e.preventDefault();
    const sessionId = document.getElementById("SessionIDInput").value;
    updateSession(
      sessionId,
      status,
      `${preferenceMode} | ${preferenceBattery}%`
    );
  }

  async function updateSession(sessionId, status, preferences) {
    const token = localStorage.getItem("token");
    try {
      const response = await api.put(
        `/sessions/${sessionId}`,
        { status: status, preferences: preferences },
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
    <div className="content">
      <div className="table-container">
        <button onClick={backToLogin}>Return to Login</button>
        <button onClick={showModal}>Add New Session</button>
        <button onClick={showModal}>Add New Station</button>
        <table>
          <thead>
            <tr>
              <th>Source</th>
              <th>Station</th>
              <th>User</th>
              <th>Preferences</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {chargingSessions.map((session) => (
              <tr key={session.id}>
                <td>{session.source}</td>
                <td>{session.station_id}</td>
                <td>{session.user_id}</td>
                <td>{session.preferences}</td>
                <td>{session.status}</td>
                <td>
                  <div className="table-actions">
                    <button onClick={() => openEdit(session.id)}>
                      <img src={editIcon} alt="" />
                    </button>
                    <button
                      onClick={() =>
                        updateSession(session.id, "canceled", null)
                      }
                    >
                      <img src={deleteIcon} alt="" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="modal-base" id="edit-session" hidden>
        <header>
          <h1 id="edit-session-header">Edit Session</h1>
          <button onClick={() => closeModal("edit-session")}>
            <img src={closeIcon} alt="Close" />
          </button>
        </header>
        <div className="modal-content">
          <form onSubmit={handleEditSession}>
            <input type="number" id="SessionIDInput" name="userID" hidden />
            <strong>Preferences</strong>
            <div className="modal-content-row">
              <label htmlFor="preference-mode">
                <span>Mode:</span>
                <select
                  name="preference-mode"
                  onChange={(e) => setPreferenceMode(e.target.value)}
                >
                  <option value="quick-charge">quick-charge</option>
                  <option value="smart-charge">smart-charge</option>
                  <option value="adaptive-charge">adaptive-charge</option>
                  <option value="standard-charge">standard-charge</option>
                </select>
              </label>
              <label htmlFor="preference-battery">
                <span>Battery limit:</span>
                <select
                  name="preference-battery"
                  onChange={(e) => setPreferenceBattery(e.target.value)}
                >
                  <option value="10">10%</option>
                  <option value="20">20%</option>
                  <option value="30">30%</option>
                  <option value="40">40%</option>
                  <option value="50">50%</option>
                  <option value="60">60%</option>
                  <option value="70">70%</option>
                  <option value="80">80%</option>
                  <option value="90">90%</option>
                  <option value="100">100%</option>
                </select>
              </label>
            </div>
            <div className="modal-content-row">
              <label htmlFor="status">
                <span>Current status:</span>
                <select
                  name="status"
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="pending">Pending</option>
                  <option value="onGoing">onGoing</option>
                  <option value="completed">Completed</option>
                  <option value="canceled">Canceled</option>
                </select>
              </label>
            </div>
            <div className="button-row">
              <button className="confirm" type="submit">
                Confirm
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
