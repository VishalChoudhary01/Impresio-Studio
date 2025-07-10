'use client';

import { Provider } from "react-redux";
import { store } from "../../redux/store";
import ThemeLoader from "./ThemeLoader";

export default function Providers({ children }) {
  return (
    <Provider store={store}>
      <ThemeLoader />
      {children}
    </Provider>
  );
}