CREATE INDEX IF NOT EXISTS project_search_idx ON projects USING GIN (to_tsvector('english', project_name || description));
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS task_search_idx ON tasks USING GIN (to_tsvector('english', title || description));