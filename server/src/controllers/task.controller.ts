import { query, type Request, type Response } from "express";
import sql from "../database/db-client";

export const getTasks = async (req: Request, res: Response) => {
	try {
		const { projectId } = req.query;
		if (!projectId) {
			res.status(400).json({ message: "Project id required." });
		} else {
			const tasks =
				await sql`SELECT * FROM tasks WHERE project_id=${projectId as string}`;
			res.json(tasks);
		}
	} catch (error) {
		res.status(500).json({ message: "Error retriving projects." });
	}
};

export const createTask = async (req: Request, res: Response) => {
	try {
		const columns = [
			"title",
			"description",
			"status",
			"priority",
			"tags",
			"start_date",
			"due_date",
			"points",
			"project_id",
			"author_user_id",
		];
		if (req.body.assigned_user_id) columns.push("assigned_user_id");

		const task =
			await sql`INSERT INTO tasks ${sql(req.body, columns)} RETURNING *;`;
		res.status(201).json(task);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Failed to create task." });
	}
};

export const updateTaskStatus = async (req: Request, res: Response) => {
	try {
		const { taskId } = req.params;
		const { status } = req.body;

		const task = await sql`SELECT 1 FROM tasks WHERE id=${Number(taskId)}`;
		if (!task[0]) {
			res.status(400).json({ message: "Invalid task id." });
			return;
		}
		const updatedTask =
			await sql`UPDATE tasks SET status=${status} WHERE id=${taskId} RETURNING *`;

		if (!updatedTask) {
			res.status(500).json({ message: "Failed to update the task." });
		} else {
			res.json(updatedTask);
		}
	} catch (error) {
		res.status(500).json({ message: "Failed to update the task." });
	}
};

// class PriorityQueue {
// 	queue: { priority: number; message: string }[];

// 	constructor() {
// 		this.queue = [];
// 	}

// 	insert(val: { priority: number; message: string }) {
// 		if (this.queue.length === 0) {
// 			this.queue.push(val);
// 			return;
// 		}

// 		for (let i = 0; i < this.queue.length; i++) {
// 			if (val.priority >= this.queue[i].priority) {
// 				this.queue.splice(i, 0, val);
// 				return;
// 			}
// 		}
// 		this.queue.push(val);
// 	}

// 	pop() {
// 		return this.queue.shift(); // Returns and removes the highest priority element
// 	}
// }
