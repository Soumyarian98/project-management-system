"use client";

import React from "react";
import { z } from "zod";

import {
	Form,
	FormField,
	FormItem,
	FormLabel,
	FormControl,
	FormMessage,
} from "@/components/ui/form";
import LoadingButton from "@/app/_components/LoadingButton";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const formSchema = z.object({
	email: z.string().email(),
	name: z.string(),
	password: z.string(),
	gender: z.string(),
});

const SigninForm = () => {
	const router = useRouter();
	const [createUser, { isLoading }] = useCreateUserMutation();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
	});

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		createUser({
			...values,
			username: values.email,
		})
			.unwrap()
			.then((res) => {
				toast.success("Account created successfully.");
				router.replace("/signin");
			})
			.catch((err) => {
				toast.error(err.data?.message || "Failed to register user.");
			});
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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

				<LoadingButton isLoading={isLoading} type="submit">
					Login
				</LoadingButton>
			</form>
		</Form>
	);
};

export default SigninForm;
