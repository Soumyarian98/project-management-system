ALTER TABLE users ADD COLUMN teamId INTEGER;
--> statement-breakpoint
ALTER TABLE users ADD CONSTRAINT fk_team FOREIGN KEY (teamId) REFERENCES teams(id)