import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "./userSlice";
import ExamResult from "./resultSlice";

const store = configureStore({
  reducer: {
    loginSlice: UserSlice,
    examResult: ExamResult,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
