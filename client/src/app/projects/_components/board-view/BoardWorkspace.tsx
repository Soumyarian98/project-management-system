"use client";

import {
	StatusEnum,
	type Task,
	useUpdateTaskStatusMutation,
} from "@/store/api";
import React, { useCallback, useMemo } from "react";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import TaskColumn from "./TaskColumn";

type Props = {
	tasks: Task[];
};

const taskTypes = [
	{ id: 1, color: "#ff0000", status: StatusEnum.BACKLOG, title: "Backlog" },
	{ id: 2, color: "#ff0000", status: StatusEnum.TODO, title: "To Do" },
	{ id: 3, color: "#ff0000", status: StatusEnum.ONGOING, title: "On Going" },
	{ id: 4, color: "#ff0000", status: StatusEnum.TESTING, title: "Testing" },
	{ id: 5, color: "#ff0000", status: StatusEnum.COMPLETED, title: "Completed" },
];

const BoardWorkspace = ({ tasks }: Props) => {
	const [updateTaskStatus] = useUpdateTaskStatusMutation();

	const groupedTasks = useMemo(
		() =>
			tasks.reduce((acc, curr) => {
				if (curr.status) {
					const existingTasks = acc.get(curr.status);
					if (existingTasks) {
						existingTasks.push(curr);
						acc.set(curr.status, existingTasks);
					} else {
						acc.set(curr.status, [curr]);
					}
				}
				return acc;
			}, new Map<StatusEnum, Task[]>()),
		[tasks],
	);

	const handleMoveTask = useCallback(
		(taskId: number, status: StatusEnum) => {
			updateTaskStatus({ status: status, taskId: taskId });
		},
		[updateTaskStatus],
	);

	return (
		<DndProvider backend={HTML5Backend}>
			<div className="grid grid-cols-1 md:grid-cols-5 gap-4">
				{taskTypes.map((t) => (
					<TaskColumn
						key={t.id}
						color={t.color}
						moveTask={handleMoveTask}
						status={t.status}
						tasks={groupedTasks.get(t.status) ?? []}
						title={t.title}
					/>
				))}
			</div>
		</DndProvider>
	);
};

export default BoardWorkspace;
