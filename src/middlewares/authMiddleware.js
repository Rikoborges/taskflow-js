// Middleware pour vérifier que l'utilisateur est authentifié
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  // Récupérer le token du header Authorization
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: " Token manquant" });
  }

  // Format: "Bearer token"
  // On extrait juste le token (deuxième partie)
  const token = authHeader.split(" ")[1];

  try {
    // Vérifier et décoder le token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Ajouter l'ID de l'utilisateur à la requête
    req.userId = decoded.id;
    req.userEmail = decoded.email;

    // Continuer vers la prochaine fonction
    next();
  } catch (error) {
    res.status(401).json({ error: " Token invalide ou expiré" });
  }
};
