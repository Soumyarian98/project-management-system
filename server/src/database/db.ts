import { Pool } from "pg";

export const db = new Pool({
	host: process.env.PG_HOST,
	port: Number(process.env.PG_PORT),
	user: process.env.PG_USER,
	password: process.env.PG_PASSWORD,
	database: process.env.PG_DATABASE,
});

(async () => {
	try {
		await db.query("SELECT 1");
		console.log("Database is connected!");
	} catch (error: unknown) {
		if (error instanceof Error)
			console.error("Database connection failed:", error.message);
		process.exit(1);
	}
})();
