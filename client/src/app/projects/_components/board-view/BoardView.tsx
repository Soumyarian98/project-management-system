"use client";

import { useGetTasksQuery } from "@/store/api";
import React from "react";
import BoardWorkspace from "./BoardWorkspace";

type Props = {
	projectId: string;
};

const BoardView = ({ projectId }: Props) => {
	// const response = await fetch(
	// 	`${process.env.NEXT_PUBLIC_API_BASE_URL}/tasks?projectId=${projectId}`,
	// );
	// const data = (await response.json()) as Task[];

	const { data, isLoading, error } = useGetTasksQuery(+projectId);

	if (isLoading) return <p>Loading...</p>;
	if (error) return <p>An error occured while fetching the tasks.</p>;

	return <div>{data ? <BoardWorkspace tasks={data} /> : null}</div>;
};

export default BoardView;
