"use client";

import { useGetTasksQuery } from "@/store/api";
import React from "react";
import TableWorkspace from "./TableWorkspace";

type Props = {
	projectId: string;
};

const TableView = ({ projectId }: Props) => {
	const { data, isLoading, error } = useGetTasksQuery(+projectId);

	if (isLoading) return <p>Loading...</p>;
	if (error) return <p>An error occured while fetching the tasks.</p>;

	return <div>{data ? <TableWorkspace tasks={data} /> : null}</div>;
};

export default TableView;
