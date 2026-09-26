import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function AuthLayout({
  children,
  authentication = true,
}) {
  const authStatus = useSelector((state) => state.auth.status);

  // Protected route:
  // Example: /all-posts, /add-post, /edit-post
  // If user is not logged in, send them to login.
  if (authentication && !authStatus) {
    return <Navigate to="/login" replace />;
  }

  // Guest-only route:
  // Example: /login and /signup
  // If user is already logged in, send them home.
  if (!authentication && authStatus) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}