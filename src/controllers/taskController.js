const Task = require("../models/Task");

// Créer une tâche (POST)
exports.createTask = async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Lister toutes les tâches (GET)
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Lister seulement les tâches complétées (GET /completed)
exports.getCompletedTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ completed: true });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Mettre à jour une tâche (PUT)
exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true, // Valida ao atualizar
    });
    
    if (!task) {
      return res.status(404).json({ error: "Tâche non trouvée" });
    }
    
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Supprimer une tâche (DELETE)
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    
    if (!task) {
      return res.status(404).json({ error: "Tâche non trouvée" });
    }
    
    res.json({ message: "Tâche supprimée avec succès" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};