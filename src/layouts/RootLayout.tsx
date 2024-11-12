import { Provider } from "react-redux";
import { store } from "../store/store";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; //

export const RootLayout = () => {
  return (
    <Provider store={store}>
      <ToastContainer theme="colored" />
      <Outlet />
    </Provider>
  );
};
