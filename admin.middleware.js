const { load } = require('./store');

module.exports = (req, res, next) => {
  // Token aus Header holen
  const token = (req.headers.authorization || "").trim();

  // Prüfen, ob Token existiert und korrekt beginnt
  if (!token || !token.startsWith("token-")) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  // User-ID aus Token extrahieren
  const userId = token.replace("token-", "").trim();

  // User-Datenbank laden
  const users = load("users") || [];

  // User suchen
  const user = users.find(u => u.id === userId);

  // Prüfen, ob User existiert und Admin ist
  if (!user) {
    return res.status(401).json({ error: "Invalid token" });
  }

  if (user.role !== "admin") {
    return res.status(403).json({ error: "Admin only" });
  }

  // User an Request anhängen
  req.user = user;

  // Weiter zur Route
  next();
};
