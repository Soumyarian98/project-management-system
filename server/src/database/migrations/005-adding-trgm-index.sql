CREATE EXTENSION IF NOT EXISTS pg_trgm;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS user_name_trgm_idx 
ON users USING GIN (user_name gin_trgm_ops);
--> statement-breakpoint
DROP INDEX user_search_idx;
