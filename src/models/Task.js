const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "O título da tarefa é obrigatório"],
      trim: true,
      maxlength: [100, "O título não pode ter mais de 100 caracteres"],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [500, "A descrição não pode ter mais de 500 caracteres"],
    },
    status: {
      type: String,
      enum: ["pendente", "em progresso", "concluída"],
      default: "pendente",
    },
    priority: {
      type: String,
      enum: ["baixa", "média", "alta"],
      default: "média",
    },
    dueDate: {
      type: Date,
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, // Adiciona createdAt e updatedAt automaticamente
  },
);

module.exports = mongoose.model("Task", taskSchema);
