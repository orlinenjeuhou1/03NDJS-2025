import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/connectDB.js";
import authRoutes from "./routes/auth.js";

// Charger les variables d'environnement
dotenv.config();

// Connexion à la base de données
connectDB();

// Initialiser Express
const app = express();

// Middleware pour parser le JSON
app.use(express.json());

// Routes API
app.use("/api/v1", authRoutes);

// Route de base
app.get("/", (req, res) => {
  res.json({ message: "API d'authentification - Fonctionnelle" });
});

// Port d'écoute
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
