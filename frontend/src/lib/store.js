import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "./features/slice/userSlice";

const store = configureStore({
  reducer: {
    loginSlice: UserSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
