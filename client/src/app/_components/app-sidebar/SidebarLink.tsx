import React from "react";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { usePathname } from "next/navigation";

import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";

type Props = {
	href: string;
	icon?: LucideIcon;
	label: string;
};

const SidebarLink = ({ href, icon: Icon, label }: Props) => {
	const pathName = usePathname();

	const isActive =
		pathName === href || (pathName === "/" && href === "/dashboard");

	return (
		<SidebarMenuItem className="hover:bg-muted/50">
			<SidebarMenuButton asChild isActive={isActive}>
				<Link href={href}>
					{Icon ? <Icon /> : null}
					{label}
				</Link>
			</SidebarMenuButton>
		</SidebarMenuItem>
	);
};

export default SidebarLink;
