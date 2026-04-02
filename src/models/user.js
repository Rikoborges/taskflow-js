// Modèle utilisateur avec email et mot de passe hashé
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "L'email est obligatoire"],
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: [true, "Le mot de passe est obligatoire"],
    minlength: 6
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("User", userSchema);