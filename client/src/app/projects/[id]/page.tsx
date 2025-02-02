import React, { Suspense } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Filter, Grid, PlusSquare, Share } from "lucide-react";
import { Input } from "@/components/ui/input";
import BoardView from "../_components/board-view/BoardView";
import TableView from "../_components/table-view/TableView";
import TimeLineView from "../_components/timeline-view/TimeLineView";
import CreateTaskDialog from "../_components/CreateTaskDialog";

const ProjectPage = async ({
	params,
}: {
	params: Promise<{ id: string }>;
}) => {
	const projectId = (await params).id;

	return (
		<div>
			<div className="flex justify-between items-center mb-4 md:mb-6">
				<h1 className="text-lg md:text-2xl font-bold">
					Product Design Development
				</h1>
				<Button>
					<PlusSquare className="w-4 h-4" /> New Board
				</Button>
			</div>
			<Tabs defaultValue="board">
				<div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
					<div className="flex items-center gap-4">
						<Button size="icon" variant="secondary">
							<Filter />
						</Button>
						<Button size="icon" variant="secondary">
							<Share />
						</Button>
						<div className="relative">
							<div className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground">
								<Grid className="h-5 w-5" />
							</div>
							<Input
								id="search"
								type="search"
								placeholder="Search task"
								className="w-full rounded-lg bg-background pl-10 focus:outline-none"
							/>
						</div>
					</div>
					<TabsList>
						<TabsTrigger value="board">Board</TabsTrigger>
						<TabsTrigger value="table">Table</TabsTrigger>
						<TabsTrigger value="timeline">Timeline</TabsTrigger>
					</TabsList>
				</div>
				<TabsContent value="board">
					<Suspense fallback="Loading...">
						<BoardView projectId={projectId} />
					</Suspense>
				</TabsContent>
				<TabsContent value="table">
					<TableView projectId={projectId} />
				</TabsContent>
				<TabsContent value="timeline">
					<TimeLineView projectId={projectId} />
				</TabsContent>
			</Tabs>
			<CreateTaskDialog projectId={projectId} />
		</div>
	);
};

export default ProjectPage;
