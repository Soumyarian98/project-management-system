"use client";

import React from "react";
import { SidebarGroupContent, SidebarMenu } from "@/components/ui/sidebar";
import { useGetProjectsQuery } from "@/store/api";
import SidebarLink from "./SidebarLink";

const Projects = () => {
	const { data: projects } = useGetProjectsQuery();

	return (
		<SidebarGroupContent>
			<SidebarMenu>
				{projects?.map((project) => (
					<SidebarLink
						key={project.id}
						href={`/projects/${project.id}`}
						label={project.project_name}
					/>
				))}
			</SidebarMenu>
		</SidebarGroupContent>
	);
};

export default Projects;
