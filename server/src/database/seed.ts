import path from "node:path";
import fs from "node:fs";
import { db } from "./db";

const seedDir = path.join(__dirname, "seed");

const orderedFileNames: { fileName: string; tableName: string }[] = [
	{ fileName: "team.json", tableName: "teams" },
	{ fileName: "project.json", tableName: "projects" },
	{ fileName: "projectTeam.json", tableName: "projectTeams" },
	{ fileName: "user.json", tableName: "users" },
	{ fileName: "task.json", tableName: "tasks" },
	{ fileName: "attachment.json", tableName: "attachments" },
	{ fileName: "comment.json", tableName: "comments" },
	{ fileName: "taskAssignment.json", tableName: "taskAssignments" },
];

const deleteAllData = async () => {
	for (const file of orderedFileNames) {
		try {
			await db.query(`DELETE FROM ${file.tableName};`);
			console.log(`Deleted the ${file.tableName} data.`);
		} catch (error) {
			console.log(`Failed to delete the ${file.tableName} data.`);
		}
	}
};

const getInsertQuery = (
	file: { fileName: string; tableName: string },
	data: any[],
) => {
	switch (file.tableName) {
		case "teams":
			return {
				insertQuery: `INSERT INTO teams (teamName, projectOwnerUserId, projectManagerUserId)
                            VALUES ${data.map((_, i) => `($${i * 3 + 1}, $${i * 3 + 2}, $${i * 3 + 3})`).join(", ")}
                            ON CONFLICT DO NOTHING;`,
			};
		case "projects":
			return {};
		case "projectTeams":
			return {};
		case "users":
			return {
				insertQuery: `INSERT INTO users (cognitoId, userName, profilePictureUrl, teamId)
                            VALUES ${data.map((_, i) => `($${i * 4 + 1}, $${i * 4 + 2}, $${i * 4 + 3}), $${i * 4 + 4})`).join(", ")}
                            ON CONFLICT (cognitoId) DO NOTHING;`,
				values: data.map((d) => [
					d.cognitoId,
					d.userName,
					d.profilePictureUrl,
					d.teamId,
				]),
			};
		case "tasks":
			return {};
		case "attachments":
			return {};
		case "comments":
			return {};
		case "taskAssignments":
			return {};
	}
};

const main = async () => {
	await deleteAllData();

	for (const file of orderedFileNames) {
		try {
			const data = JSON.parse(
				fs.readFileSync(path.join(seedDir, file.fileName), "utf-8"),
			);
			switch (file.tableName) {
			}
			await db.query(`DELETE FROM ${file.tableName};`);
			console.log(`Inserted into the ${file.tableName}.`);
		} catch (error) {
			console.log(`Failed to insert into ${file.tableName}.`);
		}
	}
};

main()
	.catch((e) => console.log(e))
	.finally(() => db.end());
