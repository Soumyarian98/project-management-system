import type { Request, Response } from "express";
import sql from "../database/db-client";

export const search = async (req: Request, res: Response) => {
	try {
		let { query } = req.query;
		query = (query as string).toLowerCase().trim().replace(/\s+/g, " & ");

		const users = await sql`  SELECT * FROM users WHERE user_name % ${query};`;
		const projects =
			await sql`SELECT * FROM projects WHERE to_tsvector('english', COALESCE(project_name, '') || ' ' || COALESCE(description, '')) @@ to_tsquery(${query});`;
		const tasks =
			await sql`SELECT * FROM tasks WHERE to_tsvector('english', COALESCE(title, '') || ' ' || COALESCE(description, '')) @@ to_tsquery(${query});`;
		res.status(200).json({
			users,
			projects,
			tasks,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "Error while searcing." });
	}
};
