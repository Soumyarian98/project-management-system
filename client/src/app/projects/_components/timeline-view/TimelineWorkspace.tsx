"use client";

import React, { useCallback, useMemo, useState } from "react";
import {
	Gantt,
	type Task as GanttTask,
	ViewMode,
	type DisplayOption,
} from "gantt-task-react";
import "gantt-task-react/dist/index.css";
import type { Task } from "@/store/api";
// @ts-expect-error below is a js lib without types
import space from "color-space";

import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useThemeColors } from "@/hooks/use-theme-colors";

type Props = {
	tasks: Task[];
};

const TimelineWorkspace = ({ tasks }: Props) => {
	const { primary, secondary } = useThemeColors();
	const [displayOptions, setDisplayOptions] = useState<DisplayOption>({
		viewMode: ViewMode.Month,
		locale: "en-US",
	});

	const ganttTasks = useMemo(() => {
		return tasks.map(() => {
			return {
				start: new Date(2020, 1, 1),
				end: new Date(2020, 4, 2),
				name: "Idea",
				id: "Task 0",
				type: "task",
				progress: 45,
				isDisabled: false,

				// styles: {
				// 	progressColor: "#ffbb54",
				// 	progressSelectedColor: "#ff9e0d",
				// },
			} as GanttTask;
		});
	}, [tasks]);

	const handleViewModeChange = useCallback((value: string) => {
		setDisplayOptions((p) => ({
			...p,
			viewMode: value as ViewMode,
		}));
	}, []);

	return (
		<div>
			<div className="flex mb-4 gap-4">
				<Select
					value={displayOptions.viewMode}
					onValueChange={handleViewModeChange}
				>
					<SelectTrigger className="w-[180px]">
						<SelectValue placeholder="Select a view mode" />
					</SelectTrigger>
					<SelectContent>
						<SelectGroup>
							<SelectLabel>View Mode</SelectLabel>
							<SelectItem value={ViewMode.Day}>Day</SelectItem>
							<SelectItem value={ViewMode.Week}>Week</SelectItem>
							<SelectItem value={ViewMode.Month}>Month</SelectItem>
						</SelectGroup>
					</SelectContent>
				</Select>
				<Button>Add New Task</Button>
			</div>
			<Gantt
				tasks={ganttTasks}
				{...displayOptions}
				fontFamily="var(--font-sans)"
				fontSize="14px"
				columnWidth={100}
				listCellWidth="150px"
				rowHeight={48}
				barBackgroundColor={`rgb(${space.hsl.rgb(secondary.replace(/%/g, "").split(" ")).join(",")})`}
				barProgressColor={`rgb(${space.hsl.rgb(primary.replace(/%/g, "").split(" ")).join(",")})`}
			/>
		</div>
	);
};

export default TimelineWorkspace;
