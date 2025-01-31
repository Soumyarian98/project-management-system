"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Loader2, PlusSquare } from "lucide-react";
import {
	Form,
	FormField,
	FormItem,
	FormLabel,
	FormControl,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { DatePicker } from "@/components/date-picker";
import { type Project, useCreateProjectMutation } from "@/store/api";

const formSchema = z.object({
	projectName: z.string().min(2).max(50),
	description: z.string(),
	startDate: z.date().optional(),
	endDate: z.date().optional(),
});

const CreateProjectDialog = () => {
	const [createProject, { isLoading }] = useCreateProjectMutation();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			projectName: "",
			description: "",
		},
	});

	function onSubmit(values: z.infer<typeof formSchema>) {
		const body: Partial<Project> = {
			projectName: values.projectName,
			description: values.description,
		};
		if (values.startDate) {
			body.startDate = values.startDate?.toISOString();
		}
		if (values.endDate) {
			body.startDate = values.endDate?.toISOString();
		}
		createProject(body);
	}

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button>
					<PlusSquare />
					Create Project
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Create Project</DialogTitle>
				</DialogHeader>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
						<FormField
							control={form.control}
							name="projectName"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Project Name</FormLabel>
									<FormControl>
										<Input placeholder="shadcn" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="description"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Description</FormLabel>
									<FormControl>
										<Textarea placeholder="shadcn" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<div className="grid grid-cols-2 gap-6">
							<FormField
								control={form.control}
								name="startDate"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Start Date</FormLabel>
										<FormControl>
											<DatePicker date={field.value} setDate={field.onChange} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="endDate"
								render={({ field }) => (
									<FormItem>
										<FormLabel>End Date</FormLabel>
										<FormControl>
											<DatePicker date={field.value} setDate={field.onChange} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<div className="flex justify-between">
							<Button
								variant="secondary"
								type="button"
								onClick={() => form.reset()}
							>
								Reset
							</Button>
							<Button type="submit" disabled={isLoading}>
								{isLoading ? <Loader2 className="animate-spin" /> : null}
								Submit
							</Button>
						</div>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
};

export default CreateProjectDialog;
