Project Management System
====================

Système d’information de management des projets.

Technologies
-----------------------------

- Backend : Spring Boot
- Frontend : Next.js, TailwindCSS, lucide-react
- Base de données : PostgreSQL

Structure
-----------------------------

```txt
backend/   Application Spring Boot
frontend/  Application Next.js
docs/      Documentation technique et contrat API
```

Lancer PostgreSQL avec Docker Compose
-----------------

Le projet utilise PostgreSQL via Docker Compose.

### Démarrer PostgreSQL

Depuis la racine du projet :

```bash
docker compose up -d
```

### Vérifier que le conteneur tourne

```bash
docker ps
```

Le conteneur attendu est :

`project-management-postgres`

### Tester la connexion PostgreSQL
```bash
docker exec -it project-management-postgres psql -U postgres -d project_management_db
```

### Pour quitter PostgreSQL :

```bash
\q
```

### Arrêter PostgreSQL

```bash
docker compose down
```

### Supprimer complètement PostgreSQL et son volume

#### Attention : cette commande supprime aussi les données de la base.

```bash
docker compose down -v
```

Lancer le backend
-----------------

```
cd backend
./mvnw spring-boot:run
```

#### Backend :

```
http://localhost:8080
```

Lancer le frontend
------------------

```
cd frontend
npm install
npm run dev
```

#### Frontend :

```
http://localhost:3000
```

Branches principales
--------------------

-   main
-   develop
-   integration/gestion-projets

Module courant
--------------

Module : Gestion des projets