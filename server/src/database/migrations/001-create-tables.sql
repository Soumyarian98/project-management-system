CREATE TABLE IF NOT EXISTS users (
    user_id SERIAL PRIMARY KEY,
    cognito_id VARCHAR(128) UNIQUE NOT NULL,
    user_name VARCHAR(40) UNIQUE NOT NULL,
    profile_picture_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
--> statement-breakpoint

CREATE TABLE IF NOT EXISTS teams (
    id SERIAL PRIMARY KEY,
    team_name VARCHAR(40) NOT NULL,
    project_owner_user_id INTEGER,
    project_manager_user_id INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_project_owner_user FOREIGN KEY (project_owner_user_id) REFERENCES users(user_id),
    CONSTRAINT fk_project_manager_user FOREIGN KEY (project_manager_user_id) REFERENCES users(user_id)
);
--> statement-breakpoint

CREATE TABLE IF NOT EXISTS projects (
    id SERIAL PRIMARY KEY,
    project_name VARCHAR(40) NOT NULL,
    description TEXT,
    start_date TIMESTAMP,
    end_date TIMESTAMP,
    created_by_id INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_created_by FOREIGN KEY (created_by_id) REFERENCES users(user_id)
);
--> statement-breakpoint

CREATE TABLE IF NOT EXISTS project_teams (
    id SERIAL PRIMARY KEY,
    team_id INTEGER,
    project_id INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_team FOREIGN KEY (team_id) REFERENCES teams(id),
    CONSTRAINT fk_project FOREIGN KEY (project_id) REFERENCES projects(id),
    CONSTRAINT unique_team_project UNIQUE (team_id, project_id)
);
--> statement-breakpoint

DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'priority_enum') THEN
        CREATE TYPE priority_enum AS ENUM ('high', 'low', 'medium', 'urgent');
    END IF;

    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'status_enum') THEN
        CREATE TYPE status_enum AS ENUM ('todo', 'backlog', 'ongoing', 'completed', 'testing');
    END IF;
END $$;
--> statement-breakpoint

CREATE TABLE IF NOT EXISTS tasks (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    status status_enum,
    priority priority_enum,
    tags TEXT[],
    start_date TIMESTAMP,
    due_date TIMESTAMP,
    points INTEGER,
    project_id INTEGER NOT NULL,
    author_user_id INTEGER NOT NULL,
    assigned_user_id INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT fk_project FOREIGN KEY  (project_id) REFERENCES projects(id),
    CONSTRAINT fk_author_user FOREIGN KEY  (author_user_id) REFERENCES users(user_id),
    CONSTRAINT fk_assigned_user FOREIGN KEY  (assigned_user_id) REFERENCES users(user_id)
);
--> statement-breakpoint

CREATE TABLE IF NOT EXISTS task_assignments (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    task_id INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(user_id),
    CONSTRAINT fk_task FOREIGN KEY (task_id) REFERENCES tasks(id),
    CONSTRAINT unique_user_task UNIQUE (user_id, task_id)
);
--> statement-breakpoint

CREATE TABLE IF NOT EXISTS attachments (
    id SERIAL PRIMARY KEY,
    task_id INTEGER NOT NULL,
    file_url TEXT NOT NULL,
    file_name VARCHAR(255) NOT NULL,
    uploaded_by_id INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_task FOREIGN KEY (task_id) REFERENCES tasks(id),
    CONSTRAINT fk_uploaded_by FOREIGN KEY (uploaded_by_id) REFERENCES users(user_id)
);
--> statement-breakpoint

CREATE TABLE IF NOT EXISTS comments (
    id SERIAL PRIMARY KEY,
    text TEXT,
    task_id INTEGER,
    user_id INTEGER,

    CONSTRAINT fk_task FOREIGN KEY (task_id) REFERENCES tasks(id),
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(user_id)
);
--> statement-breakpoint

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = CURRENT_TIMESTAMP;
   RETURN NEW;
END;
$$ LANGUAGE plpgsql;
--> statement-breakpoint

CREATE TRIGGER set_updated_at_users
BEFORE UPDATE ON users
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();
--> statement-breakpoint

CREATE TRIGGER set_updated_at_teams
BEFORE UPDATE ON teams
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();
--> statement-breakpoint

CREATE TRIGGER set_updated_at_projects
BEFORE UPDATE ON projects
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();
--> statement-breakpoint

CREATE TRIGGER set_updated_at_tasks
BEFORE UPDATE ON tasks
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();
