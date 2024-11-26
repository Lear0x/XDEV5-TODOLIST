# Utilise une image Node.js avec TypeScript
FROM node:18

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers nécessaires pour installer les dépendances
    COPY package*.json tsconfig.json ./

# Installer les dépendances
RUN npm install

# Copier le reste des fichiers du projet
COPY . .

# Exposer le port utilisé par le serveur backend
EXPOSE 3000

# Lancer l'application en mode développement
CMD ["npm", "run", "dev"]
