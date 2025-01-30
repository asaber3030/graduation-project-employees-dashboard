import { createSlice } from "@reduxjs/toolkit"

const initialState = false

const adminSidebarSlice = createSlice({
  name: "adminSidebar",
  initialState,
  reducers: {
    triggerAdminSidebar: (state) => {
      return !state
    },
  },
})

export default adminSidebarSlice.reducer
export const { triggerAdminSidebar } = adminSidebarSlice.actions
