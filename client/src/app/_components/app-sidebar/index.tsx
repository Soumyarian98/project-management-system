import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
} from "@/components/ui/sidebar";
import {
	AlertCircle,
	AlertOctagon,
	AlertTriangle,
	Briefcase,
	ChevronDown,
	Frame,
	Home,
	Layers3,
	PieChart,
	Search,
	Settings,
	ShieldAlert,
	User,
	Users,
} from "lucide-react";
import Logo from "../Logo";
import SidebarLink from "./SidebarLink";
import Projects from "./Projects";

const data = {
	projects: [
		{ name: "Design Engineering", url: "#", icon: Frame },
		{ name: "Sales & Marketing", url: "#", icon: PieChart },
	],

	priority: [
		{ name: "Urgent", url: "/priority/urgent", icon: AlertCircle },
		{ name: "High", url: "/priority/high", icon: ShieldAlert },
		{ name: "Medium", url: "/priority/medium", icon: AlertTriangle },
		{ name: "Low", url: "/priority/low", icon: AlertOctagon },
		{ name: "Backlog", url: "/priority/backlog", icon: Layers3 },
	],
};

function AppSidebar() {
	return (
		<Sidebar>
			<SidebarHeader>
				<Logo />
			</SidebarHeader>
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupContent>
						<SidebarMenu>
							<SidebarLink icon={Home} href="/" label="Home" />
							<SidebarLink icon={Briefcase} href="/timeline" label="Timeline" />
							<SidebarLink icon={Search} href="/search" label="Search" />
							<SidebarLink icon={Settings} href="/settings" label="Settings" />
							<SidebarLink icon={User} href="/users" label="User" />
							<SidebarLink icon={Users} href="/teams" label="Team" />
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
				<Collapsible defaultOpen className="group/collapsible">
					<SidebarGroup>
						<SidebarGroupLabel asChild>
							<CollapsibleTrigger>
								Projects
								<ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
							</CollapsibleTrigger>
						</SidebarGroupLabel>
						<CollapsibleContent>
							<Projects />
						</CollapsibleContent>
					</SidebarGroup>
				</Collapsible>
				<Collapsible defaultOpen className="group/collapsible">
					<SidebarGroup>
						<SidebarGroupLabel asChild>
							<CollapsibleTrigger>
								Priority
								<ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
							</CollapsibleTrigger>
						</SidebarGroupLabel>
						<CollapsibleContent>
							<SidebarGroupContent>
								<SidebarMenu>
									{data.priority.map((p) => (
										<SidebarLink
											key={p.name}
											icon={p.icon}
											href={p.url}
											label={p.name}
										/>
									))}
								</SidebarMenu>
							</SidebarGroupContent>
						</CollapsibleContent>
					</SidebarGroup>
				</Collapsible>
			</SidebarContent>
			<SidebarFooter />
		</Sidebar>
	);
}

export default AppSidebar;
