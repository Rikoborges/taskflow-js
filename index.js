const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Conexão com MongoDB
mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost:27017/taskflow")
  .then(() => console.log("✅ Conectado ao MongoDB"))
  .catch((error) =>
    console.error("❌ Erro ao conectar MongoDB:", error.message),
  );

// Importar rotas
const taskRoutes = require("./src/routes/taskRoutes");

// Usar rotas
app.use("/api/tasks", taskRoutes);

// Rota teste
app.get("/", (req, res) => {
  res.json({ message: "TaskFlow API rodando!" });
});

// Tratamento de erros 404
app.use((req, res) => {
  res.status(404).json({ error: "Rota não encontrada" });
});

// Servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(` Servidor rodando na porta ${PORT}`);
});
