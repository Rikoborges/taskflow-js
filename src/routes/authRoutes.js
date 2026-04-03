// Routes d'authentification
const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.post("/register", authController.register);
router.post("/login", authController.login);

module.exports = router;

// POST /auth/register - Créer un compte
router.post("/register", authController.register);

// POST /auth/login - Se connecter
router.post("/login", authController.login);

module.exports = router;
