"use client";

import React from "react";
import { useGetTasksQuery } from "@/store/api";
import TimelineWorkspace from "./TimelineWorkspace";

type Props = {
	projectId: string;
};

const TimeLineView = ({ projectId }: Props) => {
	const { data, isLoading, error } = useGetTasksQuery(+projectId);

	if (isLoading) return <p>Loading...</p>;
	if (error) return <p>An error occured while fetching the tasks.</p>;

	return <div>{data ? <TimelineWorkspace tasks={data} /> : null}</div>;
};

export default TimeLineView;
