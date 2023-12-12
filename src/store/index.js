import { configureStore } from "@reduxjs/toolkit";

import authService from "./services/authService";

import authReducer from "./reducers/authReducer";
import globalReducer from "./reducers/globalReducer";

const Store = configureStore({
  reducer: {
    [authService.reducerPath]: authService.reducer,

    authReducer: authReducer,
    globalReducer: globalReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([]),
});

export default Store;
