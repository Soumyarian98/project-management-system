import React from "react";
import Logo from "./Logo";

const LogoWithLabel = () => {
	return (
		<div className="flex items-center gap-2">
			<Logo />
			<h3 className="text-2xl font-bold">TaskFlow</h3>
		</div>
	);
};

export default LogoWithLabel;
