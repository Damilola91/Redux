import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import booksReducer from "./reducers/booksSlice.js";
import App from "./App.jsx";

const reducer = combineReducers({
  bookSlice: booksReducer,
});
const store = configureStore({ reducer });

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
