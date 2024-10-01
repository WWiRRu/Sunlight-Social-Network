# 🌞 **Projet personnel (Sunlight)**

### **Nom du projet** : Sunlight

### **Objectif** :
Créer un réseau social en ligne permettant aux utilisateurs de se connecter, de partager du contenu, et d’interagir entre eux.

---

## 1. 🎯 **Contexte et objectifs du projet**

### 1.1. Contexte
Ce projet s’inscrit dans le cadre de la formation **Développeur Web Web Mobile (DWWM)**. Il vise à créer une plateforme interactive moderne et fluide, accessible sur mobile et ordinateur, pour tous types d’utilisateurs.

### 1.2. Objectifs
- 🌐 Créer un réseau social permettant aux utilisateurs de **partager du contenu**, d’échanger, et de se connecter.
- 📱 **Développer une interface ergonomique** adaptée à différents terminaux (desktop, mobile, tablette).
- 🔐 Assurer la **sécurité des données** conformément aux réglementations (RGPD).

---

## 2. ⚙️ **Description fonctionnelle**

### 2.1. 🛠 **Fonctionnalités principales**
- **Inscription et authentification** :
    - 👤 Gestion des comptes utilisateurs (inscription, connexion, récupération de mot de passe).
    - 🔑 Chiffrement des mots de passe.

- **Profil utilisateur** :
    - ✏️ Création de profil (photo, biographie, personnalisation).
    - 🔒 Paramètres de confidentialité (contrôle de la visibilité des informations).

- **Fil d’actualités** :
    - 📰 Affichage des publications des utilisateurs.

- **Publications** :
    - 📝 Possibilité de poster du texte, des liens.
    - 👍 Fonctionnalités de like, commentaire, et partage.

### 2.2. ✨ **Fonctionnalités secondaires**
- **🔍 Recherche** : Moteur de recherche pour trouver des utilisateurs, publications, et groupes.
- **🔔 Notifications** : Notifications push (mobile et web) pour les nouveaux messages et interactions.
- **🌗 Mode sombre/clair** : Option pour basculer entre thème clair et sombre.
- **🚨 Modération** : Signalement de contenu inapproprié par les utilisateurs, avec outils de gestion pour les administrateurs (suppression, bannissement).

---

## 3. 🖥️ **Technologies utilisées**
- **💻 Serveur** : VPS sous Debian 11 pour une gestion stable.
- **🐳 Conteneurisation** : Docker pour une gestion facilitée des services front-end et back-end.
- **🌐 Serveur web** : Nginx pour la gestion des requêtes HTTP.
- **🛠 Back-end** : Pterodactyl pour la gestion des ressources et services serveur.
- **🗄️ Base de données** : PHPMyAdmin pour l’administration de la base de données MySQL.

---

## 4. 🔐 **Sécurité**
- **🛡️ CORS** : Limite les accès externes non autorisés, protégeant contre les attaques XSS et CSRF.
- **🔏 JWT (JSON Web Token)** : Authentification des utilisateurs via des jetons sécurisés pour valider leurs actions.
- **🛑 Protection anti-DDOS** : Limite les attaques par déni de service, avec filtrage des requêtes malveillantes et blocage des IP suspectes.

---

## 5. 🌍 **Compatibilité et accessibilité**
- **📱 Responsive Design** : Adapté pour les mobiles, tablettes et ordinateurs.
- **🌐 Navigateurs supportés** : Opera, Chrome, Firefox, Safari, Edge.
- **♿ Accessibilité** : Respect des normes d’accessibilité web (WCAG), avec navigation accessible aux personnes en situation de handicap.

---

## 6. 🎨 **Design et ergonomie**
- **🖌️ UI/UX** : Interface intuitive, minimaliste, avec une navigation fluide et un design moderne.
- **🌗 Mode sombre et clair** : Option permettant à l’utilisateur de basculer entre un thème clair et sombre pour le confort visuel.

---

## 🕒 **Temps du projet**
- **🎨 Conception et validation du design** : À définir.
- **💻 Développement Front-End (React + Vite)** : À définir.
- **⚙️ Développement Back-End (Node.js)** : À définir.
- **🚀 Déploiement et mise en production (Docker, Nginx)** : À définir.
