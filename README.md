# EasyTravel Frontend

Un projet frontend multi-applications pour la plateforme EasyTravel, construit avec React, TypeScript et Vite dans une architecture monorepo.

## 🚀 Architecture du Projet

Ce projet utilise une architecture monorepo avec les éléments suivants :

- **Monorepo** : Géré avec pnpm workspaces et Turbo
- **Applications** : Deux applications principales (companies et customers)
- **Packages partagés** : Configuration ESLint, TypeScript et utilitaires communs

### Structure du Projet

```
esay-frontend/
├── apps/
│   ├── companies/          # Application pour les entreprises
│   └── customers/          # Application pour les clients
├── packages/
│   ├── eslint-config-custom/  # Configuration ESLint partagée
│   ├── tsconfig/             # Configuration TypeScript partagée
│   └── utilities/            # Utilitaires communs
├── package.json              # Configuration racine du monorepo
├── pnpm-workspace.yaml       # Configuration des workspaces pnpm
└── turbo.json               # Configuration Turbo pour l'orchestration
```

## 🛠️ Technologies Utilisées

### Stack Principal
- **React 18** - Bibliothèque UI
- **TypeScript** - Typage statique
- **Vite** - Build tool et dev server
- **React Router v7** - Routage
- **Tailwind CSS** - Framework CSS utilitaire

### Bibliothèques UI
- **Material-UI (MUI)** - Composants Material Design
- **Mantine** - Composants UI modernes (companies app)
- **Radix UI** - Primitives UI accessibles
- **Lucide React** - Icônes
- **Iconsax React** - Icônes supplémentaires

### Gestion d'État et Data Fetching
- **TanStack Query (React Query)** - Gestion des requêtes et cache
- **Axios** - Client HTTP

### Styling et Animation
- **Emotion** - CSS-in-JS
- **Framer Motion** - Animations (companies app)
- **Swiper** - Carrousels (customers app)

### Outils de Développement
- **ESLint** - Linting
- **Prettier** - Formatage de code
- **Husky** - Git hooks
- **Lint-staged** - Linting sur les fichiers staged

## 📋 Prérequis

- **Node.js** (version 18 ou supérieure)
- **pnpm** (version 9.0.0 ou supérieure)

## 🚀 Installation

1. Cloner le repository :
```bash
git clone git@github.com:easytravelio/easy_travel_web.git
cd esay-frontend
```

2. Installer les dépendances :
```bash
pnpm install
```

## 💻 Développement

### Démarrer toutes les applications en mode développement
```bash
pnpm dev
```

### Démarrer une application spécifique

**Application Companies :**
```bash
cd apps/companies
pnpm dev
```

**Application Customers :**
```bash
cd apps/customers
pnpm dev
```

## 🏗️ Build

### Build toutes les applications
```bash
pnpm build
```

### Build une application spécifique
```bash
cd apps/companies
pnpm build
```

## 🧹 Formatage et Linting

### Formater tout le projet
```bash
pnpm format
```

### Formater une application spécifique
```bash
cd apps/companies
pnpm format
```

### Linting
```bash
pnpm lint
```

## 📦 Applications

### Companies App
Application destinée aux entreprises partenaires, incluant :
- Interface d'administration
- Gestion des services
- Tableaux de bord analytics
- Composants Material-UI et Mantine

### Customers App
Application destinée aux clients finaux, incluant :
- Interface utilisateur moderne
- Recherche et réservation
- Profil utilisateur
- Composants Material-UI et Swiper

## 🔧 Configuration

### Workspaces
Le projet utilise pnpm workspaces pour gérer les dépendances partagées entre les applications et packages.

### Turbo
Turbo est utilisé pour :
- Orchestrer les builds en parallèle
- Mettre en cache les résultats des builds
- Optimiser les temps de développement

### TypeScript
Configuration TypeScript partagée via le package `tsconfig` pour assurer la cohérence entre toutes les applications.

### ESLint
Configuration ESLint partagée via le package `eslint-config-custom` pour maintenir la qualité du code.

## 🚀 Scripts Disponibles

- `pnpm dev` - Démarre toutes les applications en mode développement
- `pnpm build` - Build toutes les applications pour la production
- `pnpm lint` - Lance le linting sur tout le projet
- `pnpm format` - Formate le code avec Prettier

## 📁 Structure des Applications

Chaque application suit une structure organisée :

```
apps/[app-name]/
├── src/
│   ├── components/     # Composants réutilisables
│   ├── features/       # Fonctionnalités métier
│   ├── layouts/        # Layouts de page
│   ├── routes/         # Configuration des routes
│   ├── hooks/          # Hooks personnalisés
│   ├── services/       # Services API
│   ├── utils/          # Fonctions utilitaires
│   ├── configs/        # Configurations
│   └── css/           # Styles globaux
├── public/            # Assets statiques
└── package.json       # Dépendances spécifiques
```

## 🤝 Contribution

1. Suivre les conventions de nommage établies
2. Utiliser les hooks et utilitaires partagés quand possible
3. Maintenir la cohérence avec les configurations ESLint et Prettier
4. Tester les changements sur les deux applications si applicable

## 📝 Notes

- Le projet utilise des imports de workspace (`workspace:*`) pour les packages internes
- Les configurations sont centralisées dans le dossier `packages/`
- Chaque application peut avoir ses propres dépendances spécifiques tout en partageant les dépendances communes