const express = require("express");
require("dotenv").config();

const connectDB = require("./config/database");
const config = require("./config/config");
const logger = require("./utils/logger");
const taskRoutes = require("./routes/taskRoutes");

const app = express();

// Conectar ao MongoDB
connectDB();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rotas
app.get("/", (req, res) => {
  res.json({ message: "TaskFlow API rodando!" });
});

app.use("/api/tasks", taskRoutes);  // ← Mudei de /tasks para /api/tasks

// Tratamento 404
app.use((req, res) => {
  res.status(404).json({ error: "Rota não encontrada" });
});

module.exports = app;