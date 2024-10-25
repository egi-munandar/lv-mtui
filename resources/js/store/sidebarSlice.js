import { createSlice } from "@reduxjs/toolkit";
const initState = {
    open: true,
};

export const sidebarSlice = createSlice({
    name: "sdOpen",
    initialState: initState,
    reducers: {
        toggleSidebar: (s) => {
            s.open = !s.open;
        },
    },
});
export const { toggleSidebar } = sidebarSlice.actions;
export default sidebarSlice.reducer;
