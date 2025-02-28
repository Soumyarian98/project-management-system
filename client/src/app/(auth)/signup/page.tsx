import React from "react";
import Link from "next/link";

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

import Logo from "@/app/_components/Logo";
import SignupForm from "../_components/SignupForm";

const Signup = () => {
	return (
		<Card className="w-full md:w-[487px] shadow-sm">
			<CardHeader className="flex items-center justify-center p-7">
				<CardTitle className="text-2xl font-semibold">
					<div className="flex items-center gap-2">
						<Logo />
						<h3 className="text-2xl font-bold">TaskFlow</h3>
					</div>
				</CardTitle>
				<CardDescription>
					By signing up, you agree to our{" "}
					<Link href="/privacy">
						<span className="text-blue-700">Privacy Policy</span>
					</Link>{" "}
					and{" "}
					<Link href="/privacy">
						<span className="text-blue-700">Terms of service</span>
					</Link>
				</CardDescription>
			</CardHeader>
			<CardContent className="px-7">
				<SignupForm />

				<p className="mt-6 text-sm">
					Already have an account?{" "}
					<Link href="/signin" className="text-blue-700 font-semibold">
						Sign In
					</Link>
				</p>
			</CardContent>
		</Card>
	);
};

export default Signup;
