"use client";
import {
	SidebarGroupContent,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useGetProjectsQuery } from "@/store/api";
import Link from "next/link";
import React from "react";
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
						label={project.projectname}
					/>
				))}
			</SidebarMenu>
		</SidebarGroupContent>
	);
};

export default Projects;
