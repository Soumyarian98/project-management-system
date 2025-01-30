import { useState, useEffect } from "react";

type ThemeColors = {
	primary: string;
	secondary: string;
	background: string;
};

const getColor = (variable: string) =>
	getComputedStyle(document.documentElement)
		.getPropertyValue(`--${variable}`)
		.trim();

export const useThemeColors = (): ThemeColors => {
	const [colors, setColors] = useState<ThemeColors>({
		primary: getColor("primary"),
		secondary: getColor("secondary"),
		background: getColor("background"),
	});

	useEffect(() => {
		const observer = new MutationObserver(() => {
			setColors({
				primary: getColor("primary"),
				secondary: getColor("secondary"),
				background: getColor("background"),
			});
		});

		observer.observe(document.documentElement, {
			attributes: true,
			attributeFilter: ["class"],
		});

		return () => observer.disconnect();
	}, []);

	return colors;
};
