import type { Task } from "@/store/api";
import React from "react";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";

type Props = {
	tasks: Task[];
};

const columns: GridColDef<Task>[] = [
	{ field: "title", headerName: "Title", width: 100 },
	{
		field: "description",
		headerName: "Description",
		width: 200,
	},
	{
		field: "status",
		headerName: "Status",
		width: 75,
	},
	{
		field: "priority",
		headerName: "Priority",
		width: 75,
	},
	{
		field: "tags",
		headerName: "Tags",
		width: 130,
	},
	{
		field: "startDate",
		headerName: "Start Date",
		width: 130,
	},
	{
		field: "dueDate",
		headerName: "Due Date",
		width: 130,
	},
	{
		field: "points",
		headerName: "Points",
		width: 130,
	},
	{
		field: "author",
		headerName: "Author",
		width: 150,
		renderCell: (p) => p.value?.userName || "Unknown",
	},
	{
		field: "assignedd",
		headerName: "Assignee",
		width: 150,
		renderCell: (p) => p.value?.userName || "Unassigned",
	},
];

const TableWorkspace = ({ tasks }: Props) => {
	return (
		<ThemeProvider
			theme={createTheme({ typography: { fontFamily: "var(--font-sans)" } })}
		>
			<CssBaseline />
			<DataGrid
				rows={tasks}
				columns={columns}
				checkboxSelection
				disableRowSelectionOnClick
			/>
		</ThemeProvider>
	);
};

export default TableWorkspace;
