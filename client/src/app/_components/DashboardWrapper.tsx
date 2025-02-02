"use client";

import React, { type PropsWithChildren } from "react";
import { Provider } from "react-redux";

import { SidebarProvider } from "../../components/ui/sidebar";
import NavBar from "./NavBar";
import { store } from "@/store";
import AppSidebar from "./app-sidebar";

const DashboardLayout = ({ children }: PropsWithChildren) => {
	return (
		<SidebarProvider>
			<AppSidebar />
			<div className="flex flex-col flex-1">
				<NavBar />
				<div className="p-4 container">{children}</div>
			</div>
		</SidebarProvider>
	);
};
const DashboardWrapper = ({ children }: PropsWithChildren) => {
	return (
		<Provider store={store}>
			<DashboardLayout>{children}</DashboardLayout>
		</Provider>
	);
};

export default DashboardWrapper;
