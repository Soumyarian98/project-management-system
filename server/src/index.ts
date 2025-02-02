import dotenv from "dotenv";
import path from "node:path";
import { app } from "./app";
import { db } from "./database/db";

dotenv.config({ path: path.join(__dirname, "..", ".env") });

const main = () => {
	const port = Number(process.env.PORT) ?? 8000;
	app.listen(port, "0.0.0.0", () => {
		console.log(`Server started on port: ${port}`);
	});
};

main();
