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
exports.updateTaskStatus = exports.createTask = exports.getTasks = void 0;
const db_client_1 = __importDefault(require("../database/db-client"));
const getTasks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { projectId } = req.query;
        if (!projectId) {
            res.status(400).json({ message: "Project id required." });
        }
        else {
            const tasks = yield (0, db_client_1.default) `SELECT * FROM tasks WHERE projectId=${projectId}`;
            res.json(tasks);
        }
    }
    catch (error) {
        res.status(500).json({ message: "Error retriving projects." });
    }
});
exports.getTasks = getTasks;
const createTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const columns = [
            "title",
            "description",
            "status",
            "priority",
            "tags",
            "startDate",
            "dueDate",
            "points",
            "projectId",
            "authorUserId",
            "assignedUserId",
        ];
        const task = yield (0, db_client_1.default) `INSERT INTO tasks ${(0, db_client_1.default)(req.body, columns)} RETURNING *;`;
        res.status(201).json(task);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Failed to create task." });
    }
});
exports.createTask = createTask;
const updateTaskStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { taskId } = req.params;
        const { status } = req.body;
        const task = yield (0, db_client_1.default) `SELECT 1 FROM tasks WHERE id=${Number(taskId)}`;
        if (!task[0]) {
            res.status(400).json({ message: "Invalid task id." });
            return;
        }
        const updatedTask = yield (0, db_client_1.default) `UPDATE tasks SET status=${status} WHERE id=${taskId} RETURNING *`;
        if (!updatedTask) {
            res.status(500).json({ message: "Failed to update the task." });
        }
        else {
            res.json(updatedTask);
        }
    }
    catch (error) {
        res.status(500).json({ message: "Failed to update the task." });
    }
});
exports.updateTaskStatus = updateTaskStatus;
