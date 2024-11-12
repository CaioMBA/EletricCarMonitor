const express = require("express");
const jwt = require("jsonwebtoken");
const db = require("../db");

const router = express.Router();

// Middleware de autenticação
const authenticate = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) return res.status(403).json({ message: "Token não fornecido" });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ message: "Falha na autenticação" });
    req.userId = decoded.id;
    next();
  });
};

router.get("/", authenticate, (req, res) => {
  db.all(
    "SELECT * FROM stations WHERE available = 1 ORDER BY recycle DESC",
    [],
    (err, rows) => {
      if (err)
        return res.status(500).json({ message: "Erro ao buscar sessões" });
      res.json(rows);
    }
  );
});

router.post("/", authenticate, (req, res) => {
  const { source } = req.body;
  db.run(
    "INSERT INTO stations (source, available) VALUES (?, 1)",
    [source],
    (err) => {
      if (err)
        return res.status(500).json({ message: "Erro ao registrar estação" });
      res.json({ message: "Estação registrada com sucesso!" });
    }
  );
});

module.exports = router;
