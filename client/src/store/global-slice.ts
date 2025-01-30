import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface GlobalSliceState {
	isSidebarOpen: boolean;
	isDarkMode: boolean;
}

const initialState: GlobalSliceState = {
	isDarkMode: true,
	isSidebarOpen: true,
};

export const globalSlice = createSlice({
	name: "global",
	initialState,
	reducers: {
		setIsSidebarOpen: (state, action: PayloadAction<boolean>) => {
			state.isSidebarOpen = action.payload;
		},
		setIsDarkMode: (state, action: PayloadAction<boolean>) => {
			state.isDarkMode = action.payload;
		},
	},
});

export const { setIsDarkMode, setIsSidebarOpen } = globalSlice.actions;

export const globalReducer = globalSlice.reducer;
