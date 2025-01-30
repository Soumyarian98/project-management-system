"use client";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { type Task, PriorityEnum } from "@/store/api";
import { format } from "date-fns";
import React from "react";
import { useDrag } from "react-dnd";

const priorityColors: Record<PriorityEnum, string> = {
	[PriorityEnum.URGENT]: "bg-red-200 text-red-700",
	[PriorityEnum.HIGH]: "bg-yellow-200 text-yellow-700",
	[PriorityEnum.MEDIUM]: "bg-green-200 text-green-700",
	[PriorityEnum.LOW]: "bg-blue-200 text-blue-700",
};

type Props = {
	task: Task;
};

const TaskCard = ({ task }: Props) => {
	const [{ isDragging }, drag] = useDrag(() => ({
		type: "task",
		item: { id: task.id },
		end: (item, monitor) => {
			console.log(item, monitor.getDropResult());
			// const dropResult = monitor.getDropResult<DragItem>()
			// if (item && dropResult) {
			//   alert(`You dropped ${item.name} into ${dropResult.name}!`)
			// }
		},
		collect: (monitor) => ({
			isDragging: monitor.isDragging(),
		}),
	}));

	const startDate = task.startDate ? format(new Date(task.startDate), "P") : "";
	const dueDate = task.dueDate ? format(new Date(task.dueDate), "P") : "";

	return (
		<div
			ref={(instance) => {
				drag(instance);
			}}
			className={cn(
				"shadow rounded-md",
				isDragging ? "opacity-50" : "opacity-100",
			)}
		>
			<div className="p-2">
				<p>{task.title}</p>
				<p>
					{startDate}-{dueDate}
				</p>
				<p>{task.description}</p>
				{task.priority ? (
					<Badge className={priorityColors[task.priority]}>
						{task.priority}
					</Badge>
				) : null}
				<div>
					{task.tags?.map((t) => (
						<span key={t}>{t}</span>
					))}
				</div>
			</div>
		</div>
	);
};

export default TaskCard;
