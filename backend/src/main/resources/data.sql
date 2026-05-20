-- =====================================================================
-- Seed de démonstration — Module Gestion des projets
-- =====================================================================
-- Objectif :
-- - Alimenter le backend avec des données cohérentes pour la démo.
-- - Garder la séparation entre status métier et archived.
-- - Alimenter les métriques depuis la base, pas depuis du mock Java.
-- - Rester idempotent : le script peut être relancé plusieurs fois.
-- =====================================================================


-- =====================================================================
-- Nettoyage contrôlé des données de démonstration dépendantes
-- =====================================================================

DELETE FROM project_task_overview_items
WHERE project_id IN (
    SELECT id
    FROM projects
    WHERE code IN (
                   'PRJ-001',
                   'PRJ-002',
                   'PRJ-003',
                   'PRJ-004',
                   'PRJ-005',
                   'PRJ-006',
                   'PRJ-007',
                   'PRJ-008'
        )
);

DELETE FROM project_metrics
WHERE project_id IN (
    SELECT id
    FROM projects
    WHERE code IN (
                   'PRJ-001',
                   'PRJ-002',
                   'PRJ-003',
                   'PRJ-004',
                   'PRJ-005',
                   'PRJ-006',
                   'PRJ-007',
                   'PRJ-008'
        )
);

DELETE FROM project_members
WHERE project_id IN (
    SELECT id
    FROM projects
    WHERE code IN (
                   'PRJ-001',
                   'PRJ-002',
                   'PRJ-003',
                   'PRJ-004',
                   'PRJ-005',
                   'PRJ-006',
                   'PRJ-007',
                   'PRJ-008'
        )
);


-- =====================================================================
-- Utilisateurs de démonstration
-- =====================================================================

INSERT INTO users (full_name, email, role_label, active)
VALUES
    ('Mouad Fekkak', 'mouad.fekkak@projecta.local', 'Chef de projet', true),
    ('Marwane Drissi', 'marwane.drissi@projecta.local', 'Développeur frontend', true),
    ('Yassine Amrani', 'yassine.amrani@projecta.local', 'Développeur backend', true),
    ('Sara El Mansouri', 'sara.elmansouri@projecta.local', 'Testeuse QA', true),
    ('Othmane Bennani', 'othmane.bennani@projecta.local', 'Analyste fonctionnel', true),
    ('Lina Ait Ali', 'lina.aitali@projecta.local', 'UX/UI designer', true),
    ('Nabil Tazi', 'nabil.tazi@projecta.local', 'DevOps engineer', true),
    ('Imane Rachidi', 'imane.rachidi@projecta.local', 'Responsable validation', true)
    ON CONFLICT (email) DO UPDATE
                               SET
                                   full_name = EXCLUDED.full_name,
                               role_label = EXCLUDED.role_label,
                               active = EXCLUDED.active;


-- =====================================================================
-- Projets de démonstration
-- =====================================================================

INSERT INTO projects (
    code,
    name,
    description,
    start_date,
    planned_end_date,
    status,
    archived,
    created_at,
    updated_at
)
VALUES
    (
        'PRJ-001',
        'Plateforme de gestion des projets',
        'Conception et réalisation d''un système web de management des projets avec Spring Boot, Next.js, TailwindCSS et PostgreSQL.',
        DATE '2026-01-15',
        DATE '2026-04-30',
        'IN_PROGRESS',
        false,
        now(),
        now()
    ),
    (
        'PRJ-002',
        'Refonte du tableau de bord',
        'Amélioration de la visualisation des indicateurs de pilotage avec des cartes synthétiques, filtres et vues de suivi.',
        DATE '2026-02-01',
        DATE '2026-03-20',
        'WAITING',
        false,
        now(),
        now()
    ),
    (
        'PRJ-003',
        'Application mobile collaborateur',
        'Préparation d''une application mobile destinée aux collaborateurs pour consulter les projets, les échéances et les notifications.',
        DATE '2026-01-25',
        DATE '2026-05-15',
        'IN_PROGRESS',
        false,
        now(),
        now()
    ),
    (
        'PRJ-004',
        'Automatisation du reporting',
        'Mise en place d''un socle de génération automatique des rapports projet hebdomadaires et mensuels.',
        DATE '2026-03-01',
        DATE '2026-06-10',
        'WAITING',
        false,
        now(),
        now()
    ),
    (
        'PRJ-005',
        'Migration infrastructure cloud',
        'Migration progressive des services internes vers une infrastructure cloud avec supervision, sauvegarde et monitoring.',
        DATE '2025-12-10',
        DATE '2026-04-15',
        'IN_PROGRESS',
        false,
        now(),
        now()
    ),
    (
        'PRJ-006',
        'Portail RH interne',
        'Création d''un portail interne pour centraliser les demandes RH, les documents administratifs et les validations.',
        DATE '2026-02-10',
        DATE '2026-07-01',
        'IN_PROGRESS',
        false,
        now(),
        now()
    ),
    (
        'PRJ-007',
        'Prototype Kanban',
        'Prototype initial de visualisation des tâches sous forme de colonnes Kanban. Projet conservé en archive pour référence.',
        DATE '2025-11-05',
        DATE '2025-12-28',
        'COMPLETED',
        true,
        now(),
        now()
    ),
    (
        'PRJ-008',
        'Ancien module planning',
        'Ancienne version du module de planification, remplacée par la nouvelle architecture du système de management des projets.',
        DATE '2025-08-01',
        DATE '2025-10-15',
        'COMPLETED',
        true,
        now(),
        now()
    )
    ON CONFLICT (code) DO UPDATE
                              SET
                                  name = EXCLUDED.name,
                              description = EXCLUDED.description,
                              start_date = EXCLUDED.start_date,
                              planned_end_date = EXCLUDED.planned_end_date,
                              status = EXCLUDED.status,
                              archived = EXCLUDED.archived,
                              updated_at = now();


-- =====================================================================
-- Affectations membres / projets
-- =====================================================================

INSERT INTO project_members (project_id, user_id, assigned_at)
SELECT project.id, user_account.id, now()
FROM projects project
         JOIN users user_account ON user_account.email IN (
                                                           'mouad.fekkak@projecta.local',
                                                           'marwane.drissi@projecta.local',
                                                           'yassine.amrani@projecta.local'
    )
WHERE project.code = 'PRJ-001'
    ON CONFLICT (project_id, user_id) DO NOTHING;

INSERT INTO project_members (project_id, user_id, assigned_at)
SELECT project.id, user_account.id, now()
FROM projects project
         JOIN users user_account ON user_account.email IN (
                                                           'mouad.fekkak@projecta.local',
                                                           'lina.aitali@projecta.local',
                                                           'othmane.bennani@projecta.local'
    )
WHERE project.code = 'PRJ-002'
    ON CONFLICT (project_id, user_id) DO NOTHING;

INSERT INTO project_members (project_id, user_id, assigned_at)
SELECT project.id, user_account.id, now()
FROM projects project
         JOIN users user_account ON user_account.email IN (
                                                           'marwane.drissi@projecta.local',
                                                           'yassine.amrani@projecta.local',
                                                           'sara.elmansouri@projecta.local',
                                                           'imane.rachidi@projecta.local'
    )
WHERE project.code = 'PRJ-003'
    ON CONFLICT (project_id, user_id) DO NOTHING;

INSERT INTO project_members (project_id, user_id, assigned_at)
SELECT project.id, user_account.id, now()
FROM projects project
         JOIN users user_account ON user_account.email IN (
                                                           'mouad.fekkak@projecta.local',
                                                           'othmane.bennani@projecta.local',
                                                           'nabil.tazi@projecta.local'
    )
WHERE project.code = 'PRJ-004'
    ON CONFLICT (project_id, user_id) DO NOTHING;

INSERT INTO project_members (project_id, user_id, assigned_at)
SELECT project.id, user_account.id, now()
FROM projects project
         JOIN users user_account ON user_account.email IN (
                                                           'yassine.amrani@projecta.local',
                                                           'nabil.tazi@projecta.local',
                                                           'sara.elmansouri@projecta.local'
    )
WHERE project.code = 'PRJ-005'
    ON CONFLICT (project_id, user_id) DO NOTHING;

INSERT INTO project_members (project_id, user_id, assigned_at)
SELECT project.id, user_account.id, now()
FROM projects project
         JOIN users user_account ON user_account.email IN (
                                                           'mouad.fekkak@projecta.local',
                                                           'marwane.drissi@projecta.local',
                                                           'yassine.amrani@projecta.local',
                                                           'lina.aitali@projecta.local'
    )
WHERE project.code = 'PRJ-006'
    ON CONFLICT (project_id, user_id) DO NOTHING;

INSERT INTO project_members (project_id, user_id, assigned_at)
SELECT project.id, user_account.id, now()
FROM projects project
         JOIN users user_account ON user_account.email IN (
                                                           'marwane.drissi@projecta.local',
                                                           'mouad.fekkak@projecta.local'
    )
WHERE project.code = 'PRJ-007'
    ON CONFLICT (project_id, user_id) DO NOTHING;

INSERT INTO project_members (project_id, user_id, assigned_at)
SELECT project.id, user_account.id, now()
FROM projects project
         JOIN users user_account ON user_account.email IN (
                                                           'othmane.bennani@projecta.local',
                                                           'imane.rachidi@projecta.local'
    )
WHERE project.code = 'PRJ-008'
    ON CONFLICT (project_id, user_id) DO NOTHING;


-- =====================================================================
-- Métriques projet
-- =====================================================================

INSERT INTO project_metrics (
    project_id,
    progress_percent,
    todo_count,
    in_progress_count,
    to_validate_count,
    completed_count,
    blocked_count,
    late_count
)
SELECT id, 45, 6, 4, 1, 9, 0, 2
FROM projects
WHERE code = 'PRJ-001'
    ON CONFLICT (project_id) DO UPDATE
                                    SET
                                        progress_percent = EXCLUDED.progress_percent,
                                    todo_count = EXCLUDED.todo_count,
                                    in_progress_count = EXCLUDED.in_progress_count,
                                    to_validate_count = EXCLUDED.to_validate_count,
                                    completed_count = EXCLUDED.completed_count,
                                    blocked_count = EXCLUDED.blocked_count,
                                    late_count = EXCLUDED.late_count;

INSERT INTO project_metrics (
    project_id,
    progress_percent,
    todo_count,
    in_progress_count,
    to_validate_count,
    completed_count,
    blocked_count,
    late_count
)
SELECT id, 10, 8, 1, 0, 1, 0, 0
FROM projects
WHERE code = 'PRJ-002'
    ON CONFLICT (project_id) DO UPDATE
                                    SET
                                        progress_percent = EXCLUDED.progress_percent,
                                    todo_count = EXCLUDED.todo_count,
                                    in_progress_count = EXCLUDED.in_progress_count,
                                    to_validate_count = EXCLUDED.to_validate_count,
                                    completed_count = EXCLUDED.completed_count,
                                    blocked_count = EXCLUDED.blocked_count,
                                    late_count = EXCLUDED.late_count;

INSERT INTO project_metrics (
    project_id,
    progress_percent,
    todo_count,
    in_progress_count,
    to_validate_count,
    completed_count,
    blocked_count,
    late_count
)
SELECT id, 62, 3, 4, 1, 13, 0, 1
FROM projects
WHERE code = 'PRJ-003'
    ON CONFLICT (project_id) DO UPDATE
                                    SET
                                        progress_percent = EXCLUDED.progress_percent,
                                    todo_count = EXCLUDED.todo_count,
                                    in_progress_count = EXCLUDED.in_progress_count,
                                    to_validate_count = EXCLUDED.to_validate_count,
                                    completed_count = EXCLUDED.completed_count,
                                    blocked_count = EXCLUDED.blocked_count,
                                    late_count = EXCLUDED.late_count;

INSERT INTO project_metrics (
    project_id,
    progress_percent,
    todo_count,
    in_progress_count,
    to_validate_count,
    completed_count,
    blocked_count,
    late_count
)
SELECT id, 20, 6, 2, 0, 2, 0, 0
FROM projects
WHERE code = 'PRJ-004'
    ON CONFLICT (project_id) DO UPDATE
                                    SET
                                        progress_percent = EXCLUDED.progress_percent,
                                    todo_count = EXCLUDED.todo_count,
                                    in_progress_count = EXCLUDED.in_progress_count,
                                    to_validate_count = EXCLUDED.to_validate_count,
                                    completed_count = EXCLUDED.completed_count,
                                    blocked_count = EXCLUDED.blocked_count,
                                    late_count = EXCLUDED.late_count;

INSERT INTO project_metrics (
    project_id,
    progress_percent,
    todo_count,
    in_progress_count,
    to_validate_count,
    completed_count,
    blocked_count,
    late_count
)
SELECT id, 78, 1, 2, 1, 14, 0, 0
FROM projects
WHERE code = 'PRJ-005'
    ON CONFLICT (project_id) DO UPDATE
                                    SET
                                        progress_percent = EXCLUDED.progress_percent,
                                    todo_count = EXCLUDED.todo_count,
                                    in_progress_count = EXCLUDED.in_progress_count,
                                    to_validate_count = EXCLUDED.to_validate_count,
                                    completed_count = EXCLUDED.completed_count,
                                    blocked_count = EXCLUDED.blocked_count,
                                    late_count = EXCLUDED.late_count;

INSERT INTO project_metrics (
    project_id,
    progress_percent,
    todo_count,
    in_progress_count,
    to_validate_count,
    completed_count,
    blocked_count,
    late_count
)
SELECT id, 35, 6, 5, 1, 7, 1, 3
FROM projects
WHERE code = 'PRJ-006'
    ON CONFLICT (project_id) DO UPDATE
                                    SET
                                        progress_percent = EXCLUDED.progress_percent,
                                    todo_count = EXCLUDED.todo_count,
                                    in_progress_count = EXCLUDED.in_progress_count,
                                    to_validate_count = EXCLUDED.to_validate_count,
                                    completed_count = EXCLUDED.completed_count,
                                    blocked_count = EXCLUDED.blocked_count,
                                    late_count = EXCLUDED.late_count;

INSERT INTO project_metrics (
    project_id,
    progress_percent,
    todo_count,
    in_progress_count,
    to_validate_count,
    completed_count,
    blocked_count,
    late_count
)
SELECT id, 100, 0, 0, 0, 18, 0, 0
FROM projects
WHERE code = 'PRJ-007'
    ON CONFLICT (project_id) DO UPDATE
                                    SET
                                        progress_percent = EXCLUDED.progress_percent,
                                    todo_count = EXCLUDED.todo_count,
                                    in_progress_count = EXCLUDED.in_progress_count,
                                    to_validate_count = EXCLUDED.to_validate_count,
                                    completed_count = EXCLUDED.completed_count,
                                    blocked_count = EXCLUDED.blocked_count,
                                    late_count = EXCLUDED.late_count;

INSERT INTO project_metrics (
    project_id,
    progress_percent,
    todo_count,
    in_progress_count,
    to_validate_count,
    completed_count,
    blocked_count,
    late_count
)
SELECT id, 100, 0, 0, 0, 12, 0, 0
FROM projects
WHERE code = 'PRJ-008'
    ON CONFLICT (project_id) DO UPDATE
                                    SET
                                        progress_percent = EXCLUDED.progress_percent,
                                    todo_count = EXCLUDED.todo_count,
                                    in_progress_count = EXCLUDED.in_progress_count,
                                    to_validate_count = EXCLUDED.to_validate_count,
                                    completed_count = EXCLUDED.completed_count,
                                    blocked_count = EXCLUDED.blocked_count,
                                    late_count = EXCLUDED.late_count;


-- =====================================================================
-- Aperçu des tâches par projet
-- =====================================================================

INSERT INTO project_task_overview_items (
    project_id,
    title,
    status,
    assignee_name,
    due_date,
    late,
    display_order
)
SELECT id, 'Finaliser la structure du module projets', 'COMPLETED', 'Mouad Fekkak', DATE '2026-01-30', false, 1
FROM projects
WHERE code = 'PRJ-001';

INSERT INTO project_task_overview_items (
    project_id,
    title,
    status,
    assignee_name,
    due_date,
    late,
    display_order
)
SELECT id, 'Créer les interfaces principales du frontend', 'COMPLETED', 'Marwane Drissi', DATE '2026-02-10', false, 2
FROM projects
WHERE code = 'PRJ-001';

INSERT INTO project_task_overview_items (
    project_id,
    title,
    status,
    assignee_name,
    due_date,
    late,
    display_order
)
SELECT id, 'Brancher les contrôleurs REST Spring Boot', 'IN_PROGRESS', 'Yassine Amrani', DATE '2026-03-05', false, 3
FROM projects
WHERE code = 'PRJ-001';

INSERT INTO project_task_overview_items (
    project_id,
    title,
    status,
    assignee_name,
    due_date,
    late,
    display_order
)
SELECT id, 'Valider la cohérence frontend/backend', 'TO_VALIDATE', 'Sara El Mansouri', DATE '2026-03-15', false, 4
FROM projects
WHERE code = 'PRJ-001';

INSERT INTO project_task_overview_items (
    project_id,
    title,
    status,
    assignee_name,
    due_date,
    late,
    display_order
)
SELECT id, 'Préparer les tests de démonstration', 'TODO', 'Mouad Fekkak', DATE '2026-03-25', true, 5
FROM projects
WHERE code = 'PRJ-001';


INSERT INTO project_task_overview_items (
    project_id,
    title,
    status,
    assignee_name,
    due_date,
    late,
    display_order
)
SELECT id, 'Analyser les indicateurs actuels', 'COMPLETED', 'Othmane Bennani', DATE '2026-02-08', false, 1
FROM projects
WHERE code = 'PRJ-002';

INSERT INTO project_task_overview_items (
    project_id,
    title,
    status,
    assignee_name,
    due_date,
    late,
    display_order
)
SELECT id, 'Préparer la nouvelle structure du dashboard', 'IN_PROGRESS', 'Lina Ait Ali', DATE '2026-02-20', false, 2
FROM projects
WHERE code = 'PRJ-002';

INSERT INTO project_task_overview_items (
    project_id,
    title,
    status,
    assignee_name,
    due_date,
    late,
    display_order
)
SELECT id, 'Valider les maquettes avec les responsables', 'TODO', 'Mouad Fekkak', DATE '2026-03-01', false, 3
FROM projects
WHERE code = 'PRJ-002';


INSERT INTO project_task_overview_items (
    project_id,
    title,
    status,
    assignee_name,
    due_date,
    late,
    display_order
)
SELECT id, 'Concevoir les écrans mobiles prioritaires', 'COMPLETED', 'Lina Ait Ali', DATE '2026-02-15', false, 1
FROM projects
WHERE code = 'PRJ-003';

INSERT INTO project_task_overview_items (
    project_id,
    title,
    status,
    assignee_name,
    due_date,
    late,
    display_order
)
SELECT id, 'Développer la consultation des projets', 'IN_PROGRESS', 'Marwane Drissi', DATE '2026-03-10', false, 2
FROM projects
WHERE code = 'PRJ-003';

INSERT INTO project_task_overview_items (
    project_id,
    title,
    status,
    assignee_name,
    due_date,
    late,
    display_order
)
SELECT id, 'Brancher les notifications projet', 'TODO', 'Yassine Amrani', DATE '2026-04-05', true, 3
FROM projects
WHERE code = 'PRJ-003';

INSERT INTO project_task_overview_items (
    project_id,
    title,
    status,
    assignee_name,
    due_date,
    late,
    display_order
)
SELECT id, 'Tester les scénarios collaborateur', 'TO_VALIDATE', 'Imane Rachidi', DATE '2026-04-18', false, 4
FROM projects
WHERE code = 'PRJ-003';


INSERT INTO project_task_overview_items (
    project_id,
    title,
    status,
    assignee_name,
    due_date,
    late,
    display_order
)
SELECT id, 'Définir les modèles de rapports', 'COMPLETED', 'Othmane Bennani', DATE '2026-03-12', false, 1
FROM projects
WHERE code = 'PRJ-004';

INSERT INTO project_task_overview_items (
    project_id,
    title,
    status,
    assignee_name,
    due_date,
    late,
    display_order
)
SELECT id, 'Préparer le backlog reporting', 'IN_PROGRESS', 'Mouad Fekkak', DATE '2026-03-25', false, 2
FROM projects
WHERE code = 'PRJ-004';

INSERT INTO project_task_overview_items (
    project_id,
    title,
    status,
    assignee_name,
    due_date,
    late,
    display_order
)
SELECT id, 'Planifier les exports PDF et Excel', 'TODO', 'Nabil Tazi', DATE '2026-04-15', false, 3
FROM projects
WHERE code = 'PRJ-004';


INSERT INTO project_task_overview_items (
    project_id,
    title,
    status,
    assignee_name,
    due_date,
    late,
    display_order
)
SELECT id, 'Mettre en place les environnements cloud', 'COMPLETED', 'Nabil Tazi', DATE '2026-01-15', false, 1
FROM projects
WHERE code = 'PRJ-005';

INSERT INTO project_task_overview_items (
    project_id,
    title,
    status,
    assignee_name,
    due_date,
    late,
    display_order
)
SELECT id, 'Migrer les services prioritaires', 'COMPLETED', 'Yassine Amrani', DATE '2026-02-20', false, 2
FROM projects
WHERE code = 'PRJ-005';

INSERT INTO project_task_overview_items (
    project_id,
    title,
    status,
    assignee_name,
    due_date,
    late,
    display_order
)
SELECT id, 'Configurer la supervision', 'IN_PROGRESS', 'Nabil Tazi', DATE '2026-03-30', false, 3
FROM projects
WHERE code = 'PRJ-005';

INSERT INTO project_task_overview_items (
    project_id,
    title,
    status,
    assignee_name,
    due_date,
    late,
    display_order
)
SELECT id, 'Valider la bascule finale', 'TO_VALIDATE', 'Sara El Mansouri', DATE '2026-04-10', false, 4
FROM projects
WHERE code = 'PRJ-005';


INSERT INTO project_task_overview_items (
    project_id,
    title,
    status,
    assignee_name,
    due_date,
    late,
    display_order
)
SELECT id, 'Cadrer les demandes RH prioritaires', 'COMPLETED', 'Mouad Fekkak', DATE '2026-02-25', false, 1
FROM projects
WHERE code = 'PRJ-006';

INSERT INTO project_task_overview_items (
    project_id,
    title,
    status,
    assignee_name,
    due_date,
    late,
    display_order
)
SELECT id, 'Développer le formulaire des demandes', 'IN_PROGRESS', 'Marwane Drissi', DATE '2026-03-20', false, 2
FROM projects
WHERE code = 'PRJ-006';

INSERT INTO project_task_overview_items (
    project_id,
    title,
    status,
    assignee_name,
    due_date,
    late,
    display_order
)
SELECT id, 'Brancher la validation manager', 'BLOCKED', 'Yassine Amrani', DATE '2026-04-01', true, 3
FROM projects
WHERE code = 'PRJ-006';

INSERT INTO project_task_overview_items (
    project_id,
    title,
    status,
    assignee_name,
    due_date,
    late,
    display_order
)
SELECT id, 'Préparer les tests métier RH', 'TODO', 'Imane Rachidi', DATE '2026-05-05', true, 4
FROM projects
WHERE code = 'PRJ-006';


INSERT INTO project_task_overview_items (
    project_id,
    title,
    status,
    assignee_name,
    due_date,
    late,
    display_order
)
SELECT id, 'Créer la maquette Kanban', 'COMPLETED', 'Marwane Drissi', DATE '2025-11-18', false, 1
FROM projects
WHERE code = 'PRJ-007';

INSERT INTO project_task_overview_items (
    project_id,
    title,
    status,
    assignee_name,
    due_date,
    late,
    display_order
)
SELECT id, 'Valider le prototype avec l''équipe', 'COMPLETED', 'Mouad Fekkak', DATE '2025-12-20', false, 2
FROM projects
WHERE code = 'PRJ-007';

INSERT INTO project_task_overview_items (
    project_id,
    title,
    status,
    assignee_name,
    due_date,
    late,
    display_order
)
SELECT id, 'Archiver la version prototype', 'COMPLETED', 'Imane Rachidi', DATE '2025-12-28', false, 3
FROM projects
WHERE code = 'PRJ-007';


INSERT INTO project_task_overview_items (
    project_id,
    title,
    status,
    assignee_name,
    due_date,
    late,
    display_order
)
SELECT id, 'Analyser l''ancien module planning', 'COMPLETED', 'Othmane Bennani', DATE '2025-08-20', false, 1
FROM projects
WHERE code = 'PRJ-008';

INSERT INTO project_task_overview_items (
    project_id,
    title,
    status,
    assignee_name,
    due_date,
    late,
    display_order
)
SELECT id, 'Extraire les règles réutilisables', 'COMPLETED', 'Mouad Fekkak', DATE '2025-09-10', false, 2
FROM projects
WHERE code = 'PRJ-008';

INSERT INTO project_task_overview_items (
    project_id,
    title,
    status,
    assignee_name,
    due_date,
    late,
    display_order
)
SELECT id, 'Clôturer la version obsolète', 'COMPLETED', 'Imane Rachidi', DATE '2025-10-15', false, 3
FROM projects
WHERE code = 'PRJ-008';