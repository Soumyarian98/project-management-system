"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tasksRouter = void 0;
const express_1 = require("express");
const task_controller_1 = require("../controllers/task.controller");
exports.tasksRouter = (0, express_1.Router)();
exports.tasksRouter.get("/", task_controller_1.getTasks);
exports.tasksRouter.post("/", task_controller_1.createTask);
exports.tasksRouter.patch("/:taskId/status", task_controller_1.updateTaskStatus);
