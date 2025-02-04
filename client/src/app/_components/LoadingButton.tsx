import React from "react";
import { Loader2 } from "lucide-react";

import { Button, type ButtonProps } from "@/components/ui/button";

type Props = { isLoading: boolean } & ButtonProps;

const LoadingButton = ({ isLoading, children, ...rest }: Props) => {
	return (
		<Button
			type="submit"
			className="w-full flex justify-center"
			{...rest}
			disabled={isLoading || rest.disabled}
		>
			{isLoading ? <Loader2 className="animate-spin" /> : children}
		</Button>
	);
};

export default LoadingButton;
