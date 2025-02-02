import { Badge } from "@/components/ui/badge";
import type { StatusEnum, Task } from "@/store/api";
import { EllipsisVertical, PlusIcon } from "lucide-react";
import React from "react";
import { useDrop } from "react-dnd";
import TaskCard from "./TaskCard";
import { cn } from "@/lib/utils";

type Props = {
	title: string;
	color: string;
	status: StatusEnum;
	tasks: Task[];
	moveTask: (taskId: number, status: StatusEnum) => void;
};

const TaskColumn = ({ moveTask, status, tasks, title }: Props) => {
	const [{ isOver }, drop] = useDrop(() => ({
		accept: "task",
		drop(item: { id: number }) {
			moveTask(item.id, status);
		},
		collect: (monitor) => ({
			isOver: monitor.isOver(),
		}),
	}));

	return (
		<div
			ref={(instance) => {
				drop(instance);
			}}
			className={cn("h-full border rounded-md", isOver && "bg-gray-50")}
		>
			<div className="flex justify-between items-center px-4 py-4 border-b">
				<div className="flex gap-2 items-center">
					<h3>{title}</h3>
					<Badge>{tasks.length}</Badge>
				</div>
				<div className="flex items-center gap-2">
					<EllipsisVertical className="w-4 h-4" />
					<PlusIcon className="w-4 h-4" />
				</div>
			</div>
			<div className="px-4 py-4">
				{tasks.map((t) => (
					<TaskCard key={t.id} task={t} />
				))}
			</div>
		</div>
	);
};

export default TaskColumn;
