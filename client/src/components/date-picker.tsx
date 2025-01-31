"use client";

import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { useCallback, useRef } from "react";

type Props = {
	date: Date | undefined;
	setDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
};

export function DatePicker({ date, setDate }: Props) {
	const ref = useRef<HTMLButtonElement>(null);
	const handleDateChange = useCallback(
		(date: Date | undefined) => {
			setDate(date);
			ref.current?.click();
		},
		[setDate],
	);
	return (
		<Popover>
			<PopoverTrigger asChild ref={ref}>
				<Button
					variant={"outline"}
					className={cn(
						"w-full justify-start text-left font-normal",
						!date && "text-muted-foreground",
					)}
				>
					<CalendarIcon />
					{date ? format(date, "PPP") : <span>Pick a date</span>}
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-auto p-0">
				<Calendar
					mode="single"
					selected={date}
					onSelect={handleDateChange}
					initialFocus
				/>
			</PopoverContent>
		</Popover>
	);
}
