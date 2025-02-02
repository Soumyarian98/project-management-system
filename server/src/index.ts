import dotenv from "dotenv";
import path from "node:path";
import { app } from "./app";
import "./database/db-client";

dotenv.config({ path: path.join(__dirname, "..", ".env") });

const main = () => {
	const port = Number(process.env.PORT) || 8000;
	app.listen(port, "0.0.0.0", () => {
		console.log(`Server started on port: ${port}`);
	});
};

main();

// npm ci --cache .npm --prefer-offline/
// curl -X POST https://<user pool domain>/oauth2/token \
//   -H "Content-Type: application/x-www-form-urlencoded" \
//   -d "grant_type=client_credentials&client_id=5ib76na4552bll3shbam7ka01g&client_secret=<client secret>&scope=default-m2m-resource-server-vajdbh/read"