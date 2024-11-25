# Gestion de Tâches - Application Web

Une application web de gestion de tâches conçue pour aider les utilisateurs à organiser, suivre et collaborer efficacement sur leurs projets.

---

## 🚀 **Description**


---

## 🛠 **Technologies utilisées**
### **Front-end**
- **Framework** : VueJS

### **Back-end**
- **Serveur** : Node.js avec Express.js
- **Base de données** : MongoDB

### **Autres outils**
- **Gestion de version** : Git
- **API REST** : Communication front-end / back-end

---

## 🌟 **Fonctionnalités principales**
### **Gestion des tâches**
- Création de tâches avec des attributs : titre, description, priorité, échéance, tags
- Organisation des taches dans des ToDoList
- Affichage des taches par états : Todo, In Progress, Done
- Filtrage des taches


### **Suivi et mise à jour**
- Suivi de l'avancement avec des statuts évolutifs :
  - "To Do"
  - "In Progress"
  - "Done"
- Modification ou suppression des tâches existantes.

---

## 📝 **Installation et exécution**
### **Prérequis**
- Docker
### Exécution
Lancement dev (racine du projet): docker-compose up --build
Arrêt : docker-compose down
 
### Accès
Backend : Accessible via http://localhost:3000
Frontend : Accessible via http://localhost:8080
Mongo-Express : Accessible via http://localhost:8081

### **Étapes pour exécuter le projet :**
1. Clonez le dépôt :
   ```bash
   git clone https://github.com/Lear0x/XDEV5-TODOLIST.git
   cd XDEV5-TODOLIST
   docker compose up --build -d