import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export enum StatusEnum {
	TODO = "todo",
	BACKLOG = "backlog",
	ONGOING = "ongoing",
	COMPLETED = "completed",
	TESTING = "testing",
}

export enum PriorityEnum {
	HIGH = "high",
	LOW = "low",
	MEDIUM = "medium",
	URGENT = "urgent",
}

export interface Project {
	id: number;
	projectName: string;
	description?: string;
	startDate?: string;
	endDate?: string;
}

export interface Task {
	id: number;
	title: string;
	description?: string;
	status?: StatusEnum;
	priority?: PriorityEnum;
	tags?: string[];
	startDate?: string;
	dueDate?: string;
	points?: string;
	projectId?: number;
	authorUserId?: number;
	assignedUserId?: number;
}

export const api = createApi({
	reducerPath: "api",
	baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL }),
	tagTypes: ["projects", "tasks"],
	endpoints: (builder) => ({
		getProjects: builder.query<Project[], void>({
			query: () => "/projects",
			providesTags: ["projects"],
		}),
		createProject: builder.mutation<Project, Partial<Project>>({
			query: (p) => ({
				url: "/projects",
				method: "POST",
				body: p,
			}),
			invalidatesTags: ["projects"],
		}),
		getTasks: builder.query<Task[], number>({
			query: (projectId) => `/tasks?projectId=${projectId}`,
			providesTags: (result) =>
				result
					? result.map(({ id }) => ({ type: "tasks", id }))
					: [{ type: "tasks" }],
		}),
		createTasks: builder.mutation<Task, Partial<Task>>({
			query: (task) => ({
				url: "/tasks",
				method: "POST",
				body: task,
			}),
			invalidatesTags: ["tasks"],
		}),
		updateTaskStatus: builder.mutation<
			Task,
			{ taskId: number; status: StatusEnum }
		>({
			query: ({ taskId, status }) => ({
				url: `/tasks/${taskId}/status`,
				method: "PATCH",
				body: { status },
			}),
			invalidatesTags: (result, error, { taskId }) => [
				{ type: "tasks", id: taskId },
			],
		}),
	}),
});

export const {
	useGetProjectsQuery,
	useCreateProjectMutation,
	useGetTasksQuery,
	useCreateTasksMutation,
	useUpdateTaskStatusMutation,
} = api;
