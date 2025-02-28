import React from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import Logo from "@/app/_components/Logo";
import SigninForm from "../_components/SigninForm";

const SignIn = () => {
	return (
		<Card className="w-full md:w-[487px] shadow-sm">
			<CardHeader className="flex items-center justify-center p-7">
				<CardTitle className="text-2xl font-semibold">
					<div className="flex items-center gap-2">
						<Logo />
						<h3 className="text-2xl font-bold">TaskFlow</h3>
					</div>
				</CardTitle>
			</CardHeader>
			<CardContent className="px-7">
				<SigninForm />
				<p className="mt-6 text-sm">
					Dont have an account?{" "}
					<Link href="/signin" className="text-blue-700 font-semibold">
						Sign Up
					</Link>
				</p>
			</CardContent>
		</Card>
	);
};

export default SignIn;
