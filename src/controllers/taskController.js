const Task = require("../models/Task");

// Função para criar uma tarefa (POST)
exports.createTask = async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Função para listar todas as tarefas (GET)
exports.getTasks = async (req, res) => {
  try {
    mongod;
    const tasks = await Task.find({});
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Função para atualizar uma tarefa (PUT)
exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Função para deletar uma tarefa (DELETE)
exports.deleteTask = async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: "Task supprimée" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
