import type { Request, Response } from "express";
import sql from "../database/db-client";

export const getProjects = async (req: Request, res: Response) => {
	try {
		const projects = await sql`SELECT * FROM projects;`;
		res.status(200).json(projects);
	} catch (error) {
		res.status(500).json({ message: "Error retriving projects." });
	}
};

export const createProject = async (req: Request, res: Response) => {
	try {
		const projects = await sql`DROP TABLE projects;`;
		console.log(projects);
		const columns = ["projectName", "description", "startDate"];
		if ("endDate" in req.body) {
			columns.push("endDate");
		}
		const project =
			await sql`INSERT INTO projects ${sql(req.body, columns)} RETURNING *;`;
		if (project.length === 0) {
			res.status(500).json({ message: "Failed to create row." });
		}
		res.status(201).json(project);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "Failed to create row." });
	}
};
