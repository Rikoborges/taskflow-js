// Logique d'authentification: inscription et connexion
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Créer un compte (POST /auth/register)
exports.register = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Vérifier que les données sont présentes
    if (!email || !password) {
      return res.status(400).json({
        error: " Email et mot de passe sont obligatoires",
      });
    }

    // Vérifier que le mot de passe a au moins 6 caractères
    if (password.length < 6) {
      return res.status(400).json({
        error: " Le mot de passe doit avoir au moins 6 caractères",
      });
    }

    // Vérifier si l'utilisateur existe déjà
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({
        error: " Cet email est déjà utilisé",
      });
    }

    // Hasher le mot de passe (coût = 10 itérations)
    console.log("📝 Hachage du mot de passe...");
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(" Mot de passe haché");

    // Créer l'utilisateur
    const user = await User.create({
      email: email.toLowerCase(),
      password: hashedPassword,
    });

    res.status(201).json({
      message: " Utilisateur créé avec succès!",
      user: { id: user._id, email: user.email },
    });
  } catch (error) {
    console.error("Erreur register:", error);
    res.status(500).json({ error: error.message });
  }
};

// Se connecter (POST /auth/login)
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Vérifier que les données sont présentes
    if (!email || !password) {
      return res.status(400).json({
        error: " Email et mot de passe requis",
      });
    }

    // Trouver l'utilisateur
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(401).json({
        error: " Email ou mot de passe incorrect",
      });
    }

    // Vérifier le mot de passe
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({
        error: " Email ou mot de passe incorrect",
      });
    }

    // Générer le JWT (valide 24h)
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "24h" },
    );

    res.json({
      message: " Connexion réussie!",
      token,
    });
  } catch (error) {
    console.error("Erreur login:", error);
    res.status(500).json({ error: error.message });
  }
};
