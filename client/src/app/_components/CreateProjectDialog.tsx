"use client";

import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";

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
import { toast } from "sonner";
import Modal from "@/components/modal";

const formSchema = z.object({
	project_name: z.string().min(2).max(50),
	description: z.string(),
	start_date: z.date().optional(),
	end_date: z.date().optional(),
});

const CreateProjectDialog = () => {
	const dialogTriggerRef = useRef<HTMLButtonElement>(null);
	const [createProject, { isLoading }] = useCreateProjectMutation();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			project_name: "",
			description: "",
		},
	});

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		const body: Partial<Project> = {
			project_name: values.project_name,
			description: values.description,
		};
		if (values.start_date) {
			body.start_date = values.start_date?.toISOString();
		}
		if (values.end_date) {
			body.start_date = values.end_date?.toISOString();
		}
		createProject(body)
			.unwrap()
			.then(() => {
				toast.success("Project created successfully");
				dialogTriggerRef.current?.click();
			})
			.catch(() => {
				toast.error("Failed to create project");
			});
	};

	return (
		<Modal
			trigger={
				<Button ref={dialogTriggerRef}>
					<PlusSquare />
					Create Project
				</Button>
			}
			title="Create Project"
		>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
					<FormField
						control={form.control}
						name="project_name"
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
							name="start_date"
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
							name="end_date"
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
						<Button
							type="submit"
							disabled={isLoading || !form.formState.isValid}
						>
							{isLoading ? <Loader2 className="animate-spin" /> : null}
							Submit
						</Button>
					</div>
				</form>
			</Form>
		</Modal>
	);
};

export default CreateProjectDialog;
