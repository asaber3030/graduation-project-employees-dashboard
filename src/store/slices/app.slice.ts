import { createSlice } from "@reduxjs/toolkit"

const initialAppState = "app"

const appSlice = createSlice({
  name: "app",
  initialState: initialAppState,
  reducers: {
    getAppStatus: (state) => {
      return state
    },
  },
})

export default appSlice.reducer
export const { getAppStatus } = appSlice.actions
