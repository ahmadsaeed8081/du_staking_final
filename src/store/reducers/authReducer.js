import { createSlice } from "@reduxjs/toolkit";
const userToken = localStorage.getItem("userToken");

const authReducer = createSlice({
  name: "authReducer",
  initialState: {
    userToken: userToken ? userToken : null,
  },
  reducers: {
    setUserToken: (state, action) => {
      state.userToken = action.payload;
    },
    logout: (state, { payload }) => {
      localStorage.removeItem(payload);
      state.userToken = null;
    },
  },
});
export const { setUserToken, logout } = authReducer.actions;
export default authReducer.reducer;
