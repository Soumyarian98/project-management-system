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
const node_fs_1 = __importDefault(require("node:fs"));
const node_path_1 = __importDefault(require("node:path"));
const db_1 = require("./db");
const migrationsDir = node_path_1.default.join(__dirname, "migrations");
function runMigrations() {
    return __awaiter(this, void 0, void 0, function* () {
        const files = node_fs_1.default.readdirSync(migrationsDir).sort(); // Sort files to ensure correct order
        const client = yield db_1.db.query("SELECT 1");
        console.log("Connected to the database.");
        yield db_1.db.query(`
        CREATE TABLE IF NOT EXISTS migrations (
          id SERIAL PRIMARY KEY,
          name VARCHAR(255) UNIQUE NOT NULL,
          applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
      `);
        const appliedMigrations = yield db_1.db.query("SELECT name FROM migrations");
        const applied = new Set(appliedMigrations.rows.map((row) => row.name));
        for (const file of files) {
            if (applied.has(file)) {
                console.log(`Skipping already applied migration: ${file}`);
                continue;
            }
            console.log(`Running migration: ${file}`);
            const sql = node_fs_1.default.readFileSync(node_path_1.default.join(migrationsDir, file), "utf-8");
            const commands = sql
                .split("--> statement-breakpoint")
                .filter((statement) => statement.trim() !== "");
            for (const command of commands) {
                console.log(`Executing SQL: ${command}`);
                yield db_1.db.query(`${command.trim()};`);
            }
            yield db_1.db.query("INSERT INTO migrations (name) VALUES ($1)", [file]);
        }
        console.log("All migrations applied successfully.");
        db_1.db.end();
    });
}
runMigrations().catch((err) => {
    console.error("Migration failed:", err);
    db_1.db.end();
});
