"use client";

import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/store";
import { setIsDarkMode, setIsSidebarOpen } from "@/store/global-slice";
import { PlusSquare } from "lucide-react";
import Image from "next/image";
import CreateProjectDialog from "./_components/CreateProjectDialog";

export default function Home() {
	const dispatch = useAppDispatch();
	const isDarkTheme = useAppSelector((s) => s.global.isDarkMode);

	return (
		<div>
			<CreateProjectDialog />
		</div>
	);
}
