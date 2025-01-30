CREATE TABLE IF NOT EXISTS users (
    userId SERIAL PRIMARY KEY,
    cognitoId VARCHAR(128) UNIQUE NOT NULL,
    userName VARCHAR(40) UNIQUE NOT NULL,
    profilePictureUrl TEXT,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS teams (
    id SERIAL PRIMARY KEY,
    teamName VARCHAR(40) NOT NULL,
    projectOwnerUserId INTEGER,
    projectManagerUserId INTEGER,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_projectOwnerUser FOREIGN KEY (projectOwnerUserId) REFERENCES users(userId),
    CONSTRAINT fk_projectMangerUser FOREIGN KEY (projectManagerUserId) REFERENCES users(userId)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS projects (
    id SERIAL PRIMARY KEY,
    projectName VARCHAR(40) NOT NULL,
    description TEXT,
    startDate TIMESTAMP,
    endDate TIMESTAMP,
    createdById INTEGER,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_cretedBy FOREIGN KEY (createdById) REFERENCES users(userId)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS projectTeams (
    id SERIAL PRIMARY KEY,
    teamId INTEGER,
    projectId INTEGER,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_team FOREIGN KEY (teamId) REFERENCES teams(id),
    CONSTRAINT fk_project FOREIGN KEY (projectId) REFERENCES projects(id),
    CONSTRAINT unique_team_project UNIQUE (teamId, projectId)
);
--> statement-breakpoint
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'priorityenum') THEN
        CREATE TYPE PriorityENUM AS ENUM ('high', 'low', 'medium', 'urgent');
    END IF;

    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'statusenum') THEN
        CREATE TYPE StatusENUM AS ENUM ('todo', 'backlog', 'ongoing', 'completed', 'testing');
    END IF;
END $$;
--> statement-breakpoint

CREATE TABLE IF NOT EXISTS tasks (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    status StatusENUM,
    priority PriorityENUM,
    tags TEXT[],
    startDate TIMESTAMP,
    dueDate TIMESTAMP,
    points INTEGER,
    projectId INTEGER NOT NULL,
    authorUserId INTEGER NOT NULL,
    assignedUserId INTEGER,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT fk_project FOREIGN KEY  (projectId) REFERENCES projects(id),
    CONSTRAINT fk_authorUser FOREIGN KEY  (authorUserId) REFERENCES users(userId),
    CONSTRAINT fk_assignedUser FOREIGN KEY  (assignedUserId) REFERENCES users(userId)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS taskAssignments (
    id SERIAL PRIMARY KEY,
    userId INTEGER NOT NULL,
    taskId INTEGER NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_user FOREIGN KEY (userId) REFERENCES users(userId),
    CONSTRAINT fk_task FOREIGN KEY (taskId) REFERENCES tasks(id),
    CONSTRAINT unique_user_task UNIQUE(userId, taskId)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS attachments (
    id SERIAL PRIMARY KEY,
    taskId INTEGER NOT NULL,
    fileURL TEXT NOT NULL,
    fileName VARCHAR(255) NOT NULL,
    uploadedById INTEGER NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_task FOREIGN KEY (taskId) REFERENCES tasks(id),
    CONSTRAINT fk_uploadedBy FOREIGN KEY (uploadedById) REFERENCES users(userId)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS comments (
    id SERIAL PRIMARY KEY,
    text TEXT,
    taskId INTEGER,
    userId INTEGER,

    CONSTRAINT fk_task FOREIGN KEY (taskId) REFERENCES tasks(id),
    CONSTRAINT fk_user FOREIGN KEY (userId) REFERENCES users(userId)
);
--> statement-breakpoint
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updatedAt = CURRENT_TIMESTAMP;
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