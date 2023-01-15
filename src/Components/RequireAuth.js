import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./Auth";
function RequireAuth({ children }) {
  const Auth = useAuth();
  if (!Auth.user) {
    return <Navigate to="login" />;
  }
  return (
    <>
      {children} <Outlet />
    </>
  );
}

export default RequireAuth;
