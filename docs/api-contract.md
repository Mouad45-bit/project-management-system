Contrat API — Module Gestion des Projets
==================

Statuts projet
---------

| Frontend | Backend |
|---|---|
| En attente | WAITING |
| En cours | IN_PROGRESS |
| Terminé | COMPLETED |

L’archivage est séparé du statut métier :

```json
{
  "status": "IN_PROGRESS",
  "archived": false
}
```

Endpoints
---------

### GET /api/projects

Liste les projets.

Query params :

-   search
-   status
-   archived
-   page
-   size
-   sort

Response :

```PageResponse\<ProjectListItemResponse>```

### POST /api/projects

Crée un projet.

#### Request :

```ProjectCreateRequest```

#### Response :

```ProjectDetailResponse```

### GET /api/projects/{id}

Consulte le détail d'un projet.

#### Response :

```ProjectDetailResponse```

### PUT /api/projects/{id}

Modifie un projet.

#### Request :

```ProjectUpdateRequest```

#### Response :

```ProjectDetailResponse```

### PATCH /api/projects/{id}/archive

Archive un projet.

### PATCH /api/projects/{id}/restore

Restaure un projet archivé.

### PUT /api/projects/{id}/members

Met à jour les membres d'un projet.

#### Request :

```json
{  
  "memberIds": [1, 2, 5]
}
```

#### Response :

```List\<ProjectMemberResponse>```

### GET /api/projects/{id}/summary

Retourne les indicateurs simples du projet.

#### Response :

```ProjectSummaryResponse```

### GET /api/users/available

Retourne les utilisateurs disponibles pour affectation.

Query params :

-   search

#### Response :

```List\<AvailableUserResponse>```