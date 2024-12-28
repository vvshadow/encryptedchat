# Projet de Gestion d'Amis avec Authentification

Ce projet est une application de gestion d'amis qui permet aux utilisateurs de s'inscrire, se connecter, gérer leurs amis (ajouter, accepter ou rejeter des demandes), et visualiser les listes d'amis.

## Fonctionnalités Implémentées

### Authentification
1. **Inscription** : Les utilisateurs peuvent s'inscrire avec leur email, mot de passe et nom d'utilisateur.
2. **Connexion** : Un utilisateur peut se connecter pour accéder à ses fonctionnalités. Un token JWT est utilisé pour gérer la session.
3. **Middleware d'authentification** : Protège les routes nécessitant une authentification.

### Gestion des Amis
1. **Envoi de demande d'ami** : Un utilisateur peut envoyer une demande d'amitié à un autre utilisateur.
2. **Acceptation ou refus des demandes** : Les utilisateurs peuvent accepter ou rejeter les demandes d'amitié.
3. **Liste d'amis acceptés** : Visualisation des amis validés.
4. **Demandes d'amis en attente** : Affichage des demandes reçues qui n'ont pas encore été traitées.

### Frontend
- Composants React pour gérer l'authentification et les relations d'amis.
- Utilisation de `Axios` pour les appels API.
- Gestion du token et de l'ID utilisateur via `localStorage` et le contexte d'authentification.

### Backend
1. **Collections MongoDB** :
   - `users` : Stocke les informations utilisateur (email, mot de passe haché, nom d'utilisateur, image de profil, etc.).
   - `friends` : Gère les relations d'amitié avec les champs `userId`, `friendId`, `status`, et `createdAt`.
2. **Routes API** :
   - **Authentification** :
     - `POST /api/users/login` : Connexion utilisateur.
     - `POST /api/users/register` : Inscription utilisateur.
   - **Gestion des amis** :
     - `POST /api/friends/send` : Envoi d'une demande d'ami.
     - `PUT /api/friends/accept` : Acceptation d'une demande d'ami.
     - `PUT /api/friends/reject` : Rejet d'une demande d'ami.
     - `GET /api/friends/:userId/accepted` : Liste des amis validés.
     - `GET /api/friends/:userId/pending` : Liste des demandes en attente.

### Fichiers Clés
- **Frontend** :
  - `Login.jsx` : Gestion de la connexion utilisateur.
  - `Friend.jsx` : Récupération et affichage des amis.
  - `api.js` : Contient les appels API centralisés.
- **Backend** :
  - `middleware/auth.js` : Middleware pour vérifier l'authentification.
  - `routes/users.js` : Gestion des routes d'authentification.
  - `routes/friends.js` : Gestion des relations d'amitié.

## Instructions pour Lancer le Projet

### Prérequis
- **Node.js** : Version 16 ou supérieure.
- **MongoDB** : Base de données active.
- **React** : Frontend.


