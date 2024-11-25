# Utilise une image Node.js adaptée à Vue.js
FROM node:18

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers nécessaires pour installer les dépendances
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste des fichiers du projet
COPY . .

# Exposer le port utilisé par le serveur Vue.js
EXPOSE 8080

# Lancer l'application en mode développement
CMD ["npm", "run", "serve"]
