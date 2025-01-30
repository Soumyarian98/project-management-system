"use client";

import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/store";
import { setIsDarkMode, setIsSidebarOpen } from "@/store/global-slice";
import Image from "next/image";

export default function Home() {
	const dispatch = useAppDispatch();
	const isDarkTheme = useAppSelector((s) => s.global.isDarkMode);
	console.log("Pelloa");

	return <div>hello</div>;
}
