import postgres from "postgres";

const sql = postgres({
	host: process.env.PG_HOST,
	port: Number(process.env.PG_PORT),
	user: process.env.PG_USER,
	password: process.env.PG_PASSWORD,
	database: process.env.PG_DATABASE,
});

console.log( process.env.PG_USER,process.env.PG_PASSWORD);

(async () => {
	try {
		await sql`SELECT 1`;
		console.log("Database is connected!");
	} catch (error: unknown) {
		if (error instanceof Error)
			console.error("Database connection failed db-client:", error.message);
		process.exit(1);
	}
})();

export default sql;
