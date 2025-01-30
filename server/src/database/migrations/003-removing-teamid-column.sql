ALTER TABLE users DROP COLUMN teamId;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS userTeams(
    id SERIAL PRIMARY KEY,
    userId INTEGER NOT NULL,
    teamId INTEGER NOT NUll,

    CONSTRAINT fk_user FOREIGN KEY (userId) REFERENCES users(userId),
    CONSTRAINT fk_team FOREIGN KEY (teamId) REFERENCES teams(id)
);