CREATE TABLE IF NOT EXISTS user_teams(
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    team_id INTEGER NOT NUll,

    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(user_id),
    CONSTRAINT fk_team FOREIGN KEY (team_id) REFERENCES teams(id)
);