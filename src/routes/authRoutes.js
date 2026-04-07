const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();

<<<<<<< HEAD
router.post("/register", authController.register);
router.post("/login", authController.login);

module.exports = router;

// POST /auth/register - Créer un compte
router.post("/register", authController.register);
=======
router.post("/login", (req, res) => {
  const { email, password } = req.body;
  
  if (!email || !password) {
    return res.status(400).json({ error: "Email e password obrigatórios" });
  }
  
  // Gerar token JWT
  const token = jwt.sign(
    { id: "user123", email },
    process.env.JWT_SECRET || "secret_key",
    { expiresIn: "24h" }
  );
  
  res.json({ message: "Login bem-sucedido", token, user: { email } });
});
>>>>>>> ca52d0b (Ateration)

router.post("/register", (req, res) => {
  const { email, password } = req.body;
  
  if (!email || !password) {
    return res.status(400).json({ error: "Email e password obrigatórios" });
  }
  
  const token = jwt.sign(
    { id: "user123", email },
    process.env.JWT_SECRET || "secret_key",
    { expiresIn: "24h" }
  );
  
  res.status(201).json({ message: "Usuário criado", token, user: { email } });
});

module.exports = router;
