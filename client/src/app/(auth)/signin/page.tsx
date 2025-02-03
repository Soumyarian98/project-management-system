"use client";

import React from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const SignIn = () => {
	return (
		<Card className="w-full md:w-[487px]">
			<CardHeader className="flex items-center justify-center p-7">
				<CardTitle className="text-2xl">Welcome Back!</CardTitle>
			</CardHeader>
			<CardContent className="p-7">
				<form className="space-y-6">
					<div className="grid w-full max-w-sm items-center gap-1.5">
						<Label htmlFor="email">Email</Label>
						<Input id="email" required type="email" />
					</div>
					<div className="grid w-full max-w-sm items-center gap-1.5">
						<Label htmlFor="password">Password</Label>
						<Input id="password" required type="email" />
					</div>
					<Button className="w-full" size="lg">
						Login
					</Button>
				</form>
			</CardContent>
		</Card>
	);
};

export default SignIn;
