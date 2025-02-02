"use client";

import { Input } from "@/components/ui/input";
import { useSearchQuery } from "@/store/api";
import { SearchIcon } from "lucide-react";
import { type ChangeEvent, useState } from "react";

function debounce<T extends (...args: never[]) => void>(cb: T, delay: number) {
	let timer: NodeJS.Timeout;
	return (...rest: Parameters<T>) => {
		if (timer) clearTimeout(timer);
		timer = setTimeout(() => {
			cb(...rest);
		}, delay);
	};
}

const Search = () => {
	const [search, setSearch] = useState("");

	useSearchQuery(search, {
		skip: search.length < 3,
	});

	const handleDebounceSearch = debounce((e: ChangeEvent<HTMLInputElement>) => {
		if (!e) return;
		setSearch(e.target.value);
	}, 300);

	return (
		<div>
			<div className="relative">
				<div className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground">
					<SearchIcon className="h-5 w-5" />
				</div>
				<Input
					id="search"
					type="search"
					placeholder="Search..."
					className="w-full rounded-lg bg-background pl-10 focus:outline-none"
					onChange={handleDebounceSearch}
				/>
			</div>
		</div>
	);
};

export default Search;
