const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connexion à MongoDB
mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost:27017/taskflow")
  .then(() => console.log("✅ Connecté à MongoDB"))
  .catch((error) =>
    console.error("❌ Erreur de connexion MongoDB:", error.message),
  );

// Importer les routes
const taskRoutes = require("./src/routes/taskRoutes");

// Utiliser les routes
app.use("/api/tasks", taskRoutes);

// Route racine
app.get("/", (req, res) => {
  res.json({ message: "API TaskFlow en fonctionnement!" });
});

// Gestion des erreurs 404
app.use((req, res) => {
  res.status(404).json({ error: "Route non trouvée" });
});

// Serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Serveur lancé sur le port ${PORT}`);
  console.log(`📍 http://localhost:${PORT}`);
});