"use client";

import React from "react";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Logo from "@/app/_components/Logo";
import {
	Form,
	FormField,
	FormItem,
	FormLabel,
	FormControl,
	FormMessage,
} from "@/components/ui/form";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

import { type Project, useCreateProjectMutation } from "@/store/api";

const formSchema = z.object({
	email: z.string().email(),
	name: z.string(),
	password: z.string(),
	username: z.string(),
	gender: z.string(),
});

const Signup = () => {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
	});

	const onSubmit = async (values: z.infer<typeof formSchema>) => {};

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
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Name</FormLabel>
									<FormControl>
										<Input {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Email</FormLabel>
									<FormControl>
										<Input {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="password"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Password</FormLabel>
									<FormControl>
										<Input {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="username"
							render={({ field }) => (
								<FormItem>
									<FormLabel>User Name</FormLabel>
									<FormControl>
										<Input {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="gender"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Gender</FormLabel>
									<FormControl>
										<Select {...field} onValueChange={field.onChange}>
											<SelectTrigger className="w-full">
												<SelectValue placeholder="Select Status" />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value="male">Male</SelectItem>
												<SelectItem value="female">Female</SelectItem>
												<SelectItem value="othehr">Other</SelectItem>
											</SelectContent>
										</Select>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<Button
							type="submit"
							className="w-full block"
							disabled={false || !form.formState.isValid}
						>
							{false ? <Loader2 className="animate-spin" /> : null}
							Create Account
						</Button>
					</form>
				</Form>

				<p className="mt-6 text-sm">
					Already have an account?{" "}
					<Link href="/signin" className="text-blue-700 font-semibold">
						Sign Up
					</Link>
				</p>
			</CardContent>
		</Card>
	);
};

export default Signup;
