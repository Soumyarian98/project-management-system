import { Router } from "express";
import { createProject, getProjects } from "../controllers/project.controller";

export const projectRouter = Router();

projectRouter.get("/", getProjects);
projectRouter.post("/", createProject);
