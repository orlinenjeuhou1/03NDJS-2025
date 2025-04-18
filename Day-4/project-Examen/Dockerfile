# Utilisation de l'image Node.js officielle
FROM node:16-alpine
# Création du répertoire de travail
WORKDIR /app
# Copie des fichiers package.json et package-lock.json
COPY package*.json ./
# Installation des dépendances
RUN npm install
# Copie du reste des fichiers du projet
COPY . .
# Exposition du port utilisé par l'application
EXPOSE 5000
# commande pour démarrer l'app
CMD ["npm", "start"]
