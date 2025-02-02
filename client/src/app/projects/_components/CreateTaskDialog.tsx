"use client";

import React from "react";
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
import Modal from "@/components/modal";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { PriorityEnum, StatusEnum, useCreateTasksMutation } from "@/store/api";
import { useForm } from "react-hook-form";
import { DatePicker } from "@/components/date-picker";

type Props = {
	projectId: string;
};

const formSchema = z.object({
	title: z.string().min(2).max(50),
	description: z.string().optional(),
	status: z.string(),
	priority: z.string(),
	start_date: z.date(),
	due_date: z.date(),
});

const CreateTaskDialog = ({ projectId }: Props) => {
	const [createTask, { isLoading }] = useCreateTasksMutation();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
	});

	function onSubmit(values: z.infer<typeof formSchema>) {
		createTask({
			title: values.title,
			description: values.description,
			status: values.status as StatusEnum,
			priority: values.priority as PriorityEnum,
			tags: [],
			start_date: values.start_date.toISOString(),
			due_date: values.due_date.toISOString(),
			points: 0,
			project_id: +projectId,
			author_user_id: 1,
		});
	}
	return (
		<Modal
			title="Create Task"
			trigger={
				<Button>
					<PlusSquare /> Create Task
				</Button>
			}
		>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
					<FormField
						control={form.control}
						name="title"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Title</FormLabel>
								<FormControl>
									<Input autoFocus {...field} />
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
									<Textarea {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<div className="grid grid-cols-2 gap-6">
						<FormField
							control={form.control}
							name="status"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Status</FormLabel>
									<FormControl>
										<Select {...field} onValueChange={field.onChange}>
											<SelectTrigger className="w-full">
												<SelectValue placeholder="Select Status" />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value={StatusEnum.TODO}>To Do</SelectItem>
												<SelectItem value={StatusEnum.ONGOING}>
													On Going
												</SelectItem>
												<SelectItem value={StatusEnum.TESTING}>
													Testing
												</SelectItem>
												<SelectItem value={StatusEnum.COMPLETED}>
													Completed
												</SelectItem>
												<SelectItem value={StatusEnum.BACKLOG}>
													Backlog
												</SelectItem>
											</SelectContent>
										</Select>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="priority"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Priority</FormLabel>
									<FormControl>
										<Select {...field} onValueChange={field.onChange}>
											<SelectTrigger className="w-full">
												<SelectValue placeholder="Select Priority" />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value={PriorityEnum.HIGH}>High</SelectItem>
												<SelectItem value={PriorityEnum.LOW}>Low</SelectItem>
												<SelectItem value={PriorityEnum.MEDIUM}>
													Medium
												</SelectItem>
												<SelectItem value={PriorityEnum.URGENT}>
													Urgent
												</SelectItem>
											</SelectContent>
										</Select>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
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
							name="due_date"
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
					<div className="flex justify-between items-center">
						<Button
							type="reset"
							variant="secondary"
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

export default CreateTaskDialog;
