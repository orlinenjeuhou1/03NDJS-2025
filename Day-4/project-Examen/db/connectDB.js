import mongoose from "mongoose";
import dotenv from "dotenv";

// Charger les variables d'environnement depuis le fichier .env
dotenv.config();

const connectDB = () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then(() => console.log("✅ Connexion MongoDB Atlas réussie"))
    .catch((err) => console.error("❌ Erreur de connexion MongoDB Atlas :", err));  // Correction ici
};

export default connectDB;

