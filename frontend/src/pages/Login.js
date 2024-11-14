// src/pages/Login.js
import React, { useState } from "react";
import api from "../services/api";
import "../css/login.css";
import userIcon from "../assets/icons/user_icon.png";
import padLockIcon from "../assets/icons/padlock_icon.png";
import eletricCarImage from "../assets/images/eletric-car.png";
import "bootstrap-icons/font/bootstrap-icons.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function ViewPassword() {
    var senhaInput = document.getElementById("password");
    var toggleButton = document.getElementById("button-show-password");
    if (senhaInput.type === "password") {
      senhaInput.type = "text";
      toggleButton.classList.remove("bi-eye-fill");
      toggleButton.classList.add("bi-eye-slash-fill");
    } else {
      senhaInput.type = "password";
      toggleButton.classList.remove("bi-eye-slash-fill");
      toggleButton.classList.add("bi-eye-fill");
    }
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/users/login", { username, password });
      localStorage.setItem("token", response.data.token);
      window.location.href = "/dashboard";
    } catch (err) {
      setError(
        `Erro ao fazer login. Verifique as credenciais. 
        ${err}`
      );
    }
  };

  return (
    <div id="container">
      <div className="login-forms">
        <div className="login-container">
          <h1>Eletric Manager</h1>
          <form onSubmit={handleLogin}>
            <h2>Login</h2>
            <div className="inputgroup">
              <label htmlFor="username">
                <img src={userIcon} alt="Usuário-Icon" />
              </label>
              <input
                type="text"
                id="username"
                placeholder="Usuário"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="inputgroup">
              <label htmlFor="password">
                <img src={padLockIcon} alt="Padlock-Icon" />
              </label>
              <input
                type="password"
                value={password}
                id="password"
                placeholder="Senha"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="bi bi-eye-fill"
                id="button-show-password"
                onClick={() => ViewPassword()}
              />
            </div>
            <button id="button-enter" className="login-btn" type="submit">
              Entrar
            </button>
          </form>
          {error && <p className="text-danger">{error}</p>}
        </div>
      </div>
      <article className="ilustration">
        <img src={eletricCarImage} alt="eletric-car" />
      </article>
    </div>
  );
}

export default Login;
