"use client";

import { Provider } from "react-redux";
import type { PropsWithChildren } from "react";

import { store } from "@/store";

const ReduxProvider = ({ children }: PropsWithChildren) => {
	return <Provider store={store}>{children}</Provider>;
};

export default ReduxProvider;
