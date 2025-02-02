import React, { type PropsWithChildren, type ReactElement } from "react";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "./ui/dialog";

type Props = {
	title: string;
	trigger: ReactElement<HTMLButtonElement>;
} & PropsWithChildren;

const Modal = ({ title, trigger, children }: Props) => {
	return (
		<Dialog>
			<DialogTrigger asChild>{trigger}</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>{title}</DialogTitle>
				</DialogHeader>
				{children}
			</DialogContent>
		</Dialog>
	);
};

export default Modal;
