const express = require("express");
const app = express();
require("dotenv").config();
const connectDB = require("./config/database");
const config = require("./config/config");
const logger = require("./utils/logger");
const math = require("./utils/math");
const taskRoutes = require("./routes/taskRoutes");

// Conectar ao MongoDB
connectDB();

// Middleware para parsing de JSON
app.use(express.json());

// Rotas
app.use("/tasks", taskRoutes);

// Rota básica
app.get("/", (req, res) => {
  res.send("API TaskFlow em funcionamento");
});

// Iniciar o servidor
app.listen(config.port, () => {
  logger.log("Application démarrée");
  console.log("Port :", config.port);
  console.log("2 + 3 =", math.add(2, 3));
  console.log("4 x 5 =", math.multiply(4, 5));
});
