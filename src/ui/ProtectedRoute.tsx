import { PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";

export const ProtectRoute = ({ children }: PropsWithChildren) => {
  const token = localStorage.getItem("token");
  return <>{token ? <>{children}</> : <Navigate to={"/register"} />}</>;
};
