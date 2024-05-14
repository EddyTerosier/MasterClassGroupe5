# La Billetterie du Havre

Ce projet est une application de gestion de billetterie pour les événements au Havre. Il comprend une partie backend développée avec Symfony et API Platform, et une partie frontend développée avec ReactJS.

## Configuration initiale

### Prérequis

Avant de commencer, assurez-vous que vous avez installé les logiciels suivants sur votre machine :
- PHP 7.4 ou supérieur
- Composer
- Node.js
- npm

### Installation du Backend

1. **Cloner le dépôt Git :**
   git clone https://github.com/EddyTerosier/MasterClassGroupe5.git
2. **Installer les dépendances PHP avec Composer :**
   Naviguez dans le dossier backend du projet "cd backend", puis exécutez :
   composer install
   Cette commande installera toutes les dépendances nécessaires pour le backend.
3. **Configurer l'environnement :**
      Copiez le fichier `.env.example` vers `.env` et ajustez les configurations selon votre environnement local, notamment la connexion à la base de données.
4. **Démarrer le serveur de développement :**
   symfony server:start

### Installation du Frontend

1. **Naviguer dans le dossier frontend :**
    cd frontend

2. **Installer les dépendances JavaScript avec npm :**
    npm install
   Cette commande installera toutes les dépendances nécessaires pour le frontend.

3. **Démarrer l'application React :**
    npm start