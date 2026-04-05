# 🎵 WTT - What's The Track

Bienvenue sur **WTT (What's The Track)**, un jeu de blind-test musical interactif et nerveux, inspiré du format Kahoot ! Testez votre culture musicale à travers différents thèmes, répondez le plus vite possible et battez vos propres records.

> 🤖 **Note de transparence :** Les visuels de cette application (UI/UX, choix des couleurs, mise en page) ainsi que la rédaction de ce fichier README ont été réalisés avec l'assistance d'une Intelligence Artificielle.

---

## ✨ Fonctionnalités

* **Mode Kahoot immersif :** 4 propositions de réponses colorées générées à chaque manche.
* **Musique en temps réel :** Extraits audio haute qualité récupérés directement via l'API publique de Deezer.
* **Catégories variées :** Rap Français, Top Hits Pop, Classiques Rock, Disney, Années 80, etc.
* **Score dynamique (Timer) :** Une barre de temps de 30 secondes s'écoule. Plus la réponse est rapide, plus le score est élevé (jusqu'à 1000 points par bonne réponse).
* **Historique des parties :** Sauvegarde locale des scores et dates de jeu sur l'appareil pour suivre sa progression.
* **Animations :** Écran de démarrage personnalisé (Splash Screen) et modale fluide pour les règles du jeu.

---

## 🛠️ Stack Technique

* **Framework :** React Native / Expo
* **Navigation :** Expo Router (File-based routing)
* **State Management :** Zustand (Gestion du score et des manches)
* **Audio :** `expo-av`
* **Stockage :** `@react-native-async-storage/async-storage`
* **Données :** API Deezer (Fetch natif + Proxy CORS pour le développement Web)

---

## 🚀 Installation et Lancement

1. **Installer les dépendances :**
   Placez-vous à la racine du projet et installez les paquets nécessaires.
   ```bash
   npm install

2. **Lancer le serveur local :**

   ```bash
   npx expo start -c

Tester sur votre appareil (Recommandé) :

Téléchargez l'application Expo Go sur votre smartphone (iOS ou Android).

Scannez le QR Code affiché dans votre terminal.

En cas de blocage réseau/pare-feu lors du scan, utilisez plutôt la commande : npx expo start --tunnel.

## 📂 Architecture du Projet

Le projet suit une séparation stricte des responsabilités :

/app : Les écrans principaux (Routeur automatique).

/components : Les éléments d'interface réutilisables (Timer, ProgressBar).

/hooks : Logique d'interface complexe isolée (Animation du Splash Screen).

/service : Les ponts vers l'extérieur (Requêtes API Deezer, Sauvegarde JSON).

/store : Le "cerveau" global du jeu avec Zustand.

/utils : Les fonctions d'aide isolées (Mélange de tableaux, Algorithme de calcul du score).

Un projet imaginé et développé par EchoPlay Studio