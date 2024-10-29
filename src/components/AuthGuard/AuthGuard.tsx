import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectIsLoggedIn } from "../../features/auth/authSlice";

interface AuthGuardProps {
  children: React.ReactNode;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  if (!isLoggedIn) {
    // If the user is not logged in, redirect them to the login page
    return <Navigate to="/login" />;
  }

  // If the user is logged in, render the children components (protected routes)
  return <>{children}</>;
};

export default AuthGuard;
