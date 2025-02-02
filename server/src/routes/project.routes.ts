import { Router } from "express";
import { createProject, getProjects } from "../controllers/project.controller";
import { verifyJWT } from "../middleware/verify-jwt-middleware";

export const projectRouter = Router();

projectRouter.get("/", verifyJWT, getProjects);
projectRouter.post("/", createProject);
