import { SidebarTrigger } from "@/components/ui/sidebar";
import React from "react";
import ThemeToggle from "./ThemeToggle";
import { Input } from "@/components/ui/input";
import { SearchIcon, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function NavBar() {
	return (
		<div className="flex justify-between items-center p-4 container">
			<div className="flex items-center gap-8">
				<SidebarTrigger />
				<div className="relative">
					<div className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground">
						<SearchIcon className="h-5 w-5" />
					</div>
					<Input
						id="search"
						type="search"
						placeholder="Search..."
						className="w-full rounded-lg bg-background pl-10 focus:outline-none"
					/>
				</div>
			</div>
			<div className="flex gap-8">
				<Link href="/settings">
					<Button size="icon" variant="outline">
						<Settings />
					</Button>
				</Link>
				<ThemeToggle />
			</div>
		</div>
	);
}

export default NavBar;
