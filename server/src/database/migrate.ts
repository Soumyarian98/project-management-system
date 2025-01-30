import fs from "node:fs";
import path from "node:path";
import { db } from "./db";

const migrationsDir = path.join(__dirname, "migrations");

async function runMigrations() {
	const files = fs.readdirSync(migrationsDir).sort(); // Sort files to ensure correct order
	const client = await db.query("SELECT 1");

	console.log("Connected to the database.");

	await db.query(`
        CREATE TABLE IF NOT EXISTS migrations (
          id SERIAL PRIMARY KEY,
          name VARCHAR(255) UNIQUE NOT NULL,
          applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
      `);

	const appliedMigrations = await db.query("SELECT name FROM migrations");
	const applied = new Set(appliedMigrations.rows.map((row) => row.name));

	for (const file of files) {
		if (applied.has(file)) {
			console.log(`Skipping already applied migration: ${file}`);
			continue;
		}
		console.log(`Running migration: ${file}`);
		const sql = fs.readFileSync(path.join(migrationsDir, file), "utf-8");
		const commands = sql
			.split("--> statement-breakpoint")
			.filter((statement) => statement.trim() !== "");
		for (const command of commands) {
			console.log(`Executing SQL: ${command}`);
			await db.query(`${command.trim()};`);
		}
		await db.query("INSERT INTO migrations (name) VALUES ($1)", [file]);
	}
	console.log("All migrations applied successfully.");
	db.end();
}

runMigrations().catch((err) => {
	console.error("Migration failed:", err);
	db.end();
});
