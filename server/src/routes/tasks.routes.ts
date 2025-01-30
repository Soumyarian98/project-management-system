import { Router } from "express";
import {
	createTask,
	getTasks,
	updateTaskStatus,
} from "../controllers/task.controller";

export const tasksRouter = Router();

tasksRouter.get("/", getTasks);
tasksRouter.post("/", createTask);
tasksRouter.patch("/:taskId/status", updateTaskStatus);
