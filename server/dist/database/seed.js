"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const node_fs_1 = __importDefault(require("node:fs"));
const db_1 = require("./db");
const seedDir = node_path_1.default.join(__dirname, "seed");
const orderedFileNames = [
    { fileName: "team.json", tableName: "teams" },
    { fileName: "project.json", tableName: "projects" },
    { fileName: "projectTeam.json", tableName: "projectTeams" },
    { fileName: "user.json", tableName: "users" },
    { fileName: "task.json", tableName: "tasks" },
    { fileName: "attachment.json", tableName: "attachments" },
    { fileName: "comment.json", tableName: "comments" },
    { fileName: "taskAssignment.json", tableName: "taskAssignments" },
];
const deleteAllData = () => __awaiter(void 0, void 0, void 0, function* () {
    for (const file of orderedFileNames) {
        try {
            yield db_1.db.query(`DELETE FROM ${file.tableName};`);
            console.log(`Deleted the ${file.tableName} data.`);
        }
        catch (error) {
            console.log(`Failed to delete the ${file.tableName} data.`);
        }
    }
});
const getInsertQuery = (file, data) => {
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
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    yield deleteAllData();
    for (const file of orderedFileNames) {
        try {
            const data = JSON.parse(node_fs_1.default.readFileSync(node_path_1.default.join(seedDir, file.fileName), "utf-8"));
            switch (file.tableName) {
            }
            yield db_1.db.query(`DELETE FROM ${file.tableName};`);
            console.log(`Inserted into the ${file.tableName}.`);
        }
        catch (error) {
            console.log(`Failed to insert into ${file.tableName}.`);
        }
    }
});
main()
    .catch((e) => console.log(e))
    .finally(() => db_1.db.end());
