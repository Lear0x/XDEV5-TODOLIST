# Gestion de Tâches - Application Web

Une application web de gestion de tâches conçue pour aider les utilisateurs à organiser, suivre et collaborer efficacement sur leurs projets.

---

## 🚀 **Description**
Cette application offre une solution complète pour gérer des tâches et sous-tâches de manière structurée. Elle permet aux utilisateurs de créer des tâches avec des attributs détaillés (titre, description, échéance, priorité, tags, etc.) et de collaborer en temps réel avec d'autres utilisateurs. L'application propose également des notifications pour garder les utilisateurs informés des changements ou des échéances.

---

## 🛠 **Technologies utilisées**
### **Front-end**
- **Framework** : Angular
- **UI/UX** : Angular Material
- **Gestion de formulaire** : Reactive Forms
- **Bibliothèques supplémentaires** :
  - Angular CDK (Drag & Drop)
  - ngx-socket-io (pour la collaboration en temps réel)

### **Back-end**
- **Serveur** : Node.js avec Express.js
- **Base de données** : MongoDB (orientée documents) ou PostgreSQL (relationnelle)
- **Notifications** : Intégration avec [Ethereal Email](https://ethereal.email/) pour tester l'envoi d'emails.

### **Autres outils**
- **Gestion de version** : Git
- **API REST** : Communication front-end / back-end
- **WebSocket** : Collaboration en temps réel

---

## 🌟 **Fonctionnalités principales**
### **Gestion des tâches**
- Création de tâches avec des attributs : titre, description, priorité, échéance, tags, etc.
- Décomposition des tâches en sous-tâches hiérarchisées (illimitées).
- Affichage et organisation des tâches par :
  - Projet
  - Liste
  - Tag
  - Date d’échéance

### **Collaboration**
- Attribution des tâches à d'autres utilisateurs pour un travail d'équipe.
- Collaboration en temps réel grâce à WebSocket (mise à jour instantanée des tâches partagées).

### **Suivi et mise à jour**
- Suivi de l'avancement avec des statuts évolutifs :
  - "À faire"
  - "En cours"
  - "Terminé"
- Modification ou suppression des tâches existantes.

### **Notifications**
- Notifications par email lorsque :
  - Une tâche est assignée à un utilisateur.
  - Une échéance approche.
  - Une tâche est modifiée.

### **Interface intuitive**
- Tableau de bord avec résumé des tâches par statut.
- Système de Drag & Drop pour organiser facilement les tâches.
- Mode sombre intégré pour un meilleur confort visuel.

---

## 📝 **Installation et exécution**
### **Prérequis**
- Node.js et npm installés sur votre machine.
- Un serveur MongoDB ou PostgreSQL configuré.

### **Étapes pour exécuter le projet :**
1. Clonez le dépôt :
   ```bash
   git clone
   cd task-management-app
