import type { Metadata } from "next";
import { Geist, Geist_Mono, Outfit } from "next/font/google";
import "./globals.css";
import DashboardWrapper from "./_components/DashboardWrapper";

const geistSans = Outfit({
	variable: "--font-geist-sans",
	subsets: ["latin"],
	weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Create Next App",
	description: "Generated by create next app",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				<DashboardWrapper>{children}</DashboardWrapper>
			</body>
		</html>
	);
}
