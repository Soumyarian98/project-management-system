"use client";

import React from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import LogoWithLabel from "@/app/_components/LogoWithLabel";

const ConfirmSignup = () => {
	return (
		<Card className="w-full md:w-[487px] shadow-sm">
			<CardHeader className="flex items-center justify-center p-7">
				<CardTitle className="text-2xl font-semibold">
					<LogoWithLabel />
				</CardTitle>
			</CardHeader>
			<CardContent className="px-7">
				{/* <SignupForm /> */}

				<p className="mt-6 text-sm">
					Don't have an account?{" "}
					<Link href="/signin" className="text-blue-700 font-semibold">
						Sign Up
					</Link>
				</p>
			</CardContent>
		</Card>
	);
};

export default ConfirmSignup;
