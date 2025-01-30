"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.projectRouter = void 0;
const express_1 = require("express");
const project_controller_1 = require("../controllers/project.controller");
exports.projectRouter = (0, express_1.Router)();
exports.projectRouter.get("/", project_controller_1.getProjects);
exports.projectRouter.post("/", project_controller_1.createProject);
