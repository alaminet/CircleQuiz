import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  login: null,
};

if (typeof window !== "undefined") {
  const storedUser = localStorage.getItem("user");
  initialState = {
    login: storedUser ? JSON.parse(storedUser) : null,
  };
}

export const userSlice = createSlice({
  name: "Login",
  initialState,
  reducers: {
    Loginuser: (state, action) => {
      state.login = action.payload;
    },
  },
});
export const { Loginuser } = userSlice.actions;
export default userSlice.reducer;
