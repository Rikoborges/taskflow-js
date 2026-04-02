// Routes des tâches (protégées par authentification)
const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");
const authMiddleware = require("../middlewares/authMiddleware");

// GET /tasks - Récupérer toutes les tâches (protégé)
router.get("/", authMiddleware, taskController.getTasks);

// GET /tasks/completed - Tâches complétées (protégé)
router.get("/completed", authMiddleware, taskController.getCompletedTasks);

// POST /tasks - Créer une tâche (protégé)
router.post("/", authMiddleware, taskController.createTask);

// PUT /tasks/:id - Mettre à jour (protégé)
router.put("/:id", authMiddleware, taskController.updateTask);

// DELETE /tasks/:id - Supprimer (protégé)
router.delete("/:id", authMiddleware, taskController.deleteTask);

module.exports = router;