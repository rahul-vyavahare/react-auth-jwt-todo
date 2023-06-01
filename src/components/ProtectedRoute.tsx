import { Navigate, Outlet, Route } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import React from "react";

export  const ProtectedRoute  = () => {
  const { token } = useAuth();

  return token ? <Outlet /> : <Navigate  to="/login" />;
};
