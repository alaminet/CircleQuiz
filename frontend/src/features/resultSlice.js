import { createSlice } from "@reduxjs/toolkit";

export const resultSlice = createSlice({
  name: "Result",
  initialState: {
    results: localStorage.getItem("ExamResult")
      ? JSON.parse(localStorage.getItem("ExamResult"))
      : null,
  },
  reducers: {
    ExamResult: (state, action) => {
      state.results = action.payload;
    },
  },
});
export const { ExamResult } = resultSlice.actions;
export default resultSlice.reducer;
