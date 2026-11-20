import { useEffect, useRef } from "react";
import { Navigate, Route, Routes } from "react-router";
import { useAuth } from "./features/auth/hooks/useAuth.js";
import { AuthLayout } from "./features/auth/UI/AuthLayout.jsx";
import { LoginPage } from "./features/auth/UI/LoginPage.jsx";
import { RegisterPage } from "./features/auth/UI/RegisterPage.jsx";
import { WelcomePage } from "./features/auth/UI/WelcomePage.jsx";
import { selectAuth } from "./features/auth/state/authSlice.js";
import { useSelector } from "react-redux";

function LoadingScreen() {
  return (
    <div className="grid min-h-screen place-items-center bg-[#f6f7f5]">
      <span className="size-6 animate-spin rounded-full border-2 border-[#d6ddd8] border-t-[#285b48]" />
    </div>
  );
}

function PublicRoute({ children }) {
  const { initialized, user } = useSelector(selectAuth);
  if (!initialized) return <LoadingScreen />;
  return user ? <Navigate to="/app" replace /> : children;
}

function PrivateRoute({ children }) {
  const { initialized, user } = useSelector(selectAuth);
  if (!initialized) return <LoadingScreen />;
  return user ? children : <Navigate to="/login" replace />;
}

const routeDefinitions = [
  {
    path: "/",
    element: <Navigate to="/app" replace />,
  },
  {
    path: "/login",
    element: <PublicRoute><AuthLayout><LoginPage /></AuthLayout></PublicRoute>,
  },
  {
    path: "/register",
    element: <PublicRoute><AuthLayout><RegisterPage /></AuthLayout></PublicRoute>,
  },
  {
    path: "/app",
    element: <PrivateRoute><WelcomePage /></PrivateRoute>,
  },
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
];

export default function App() {
  const { initialize } = useAuth();
  const initializationStarted = useRef(false);

  useEffect(() => {
    if (initializationStarted.current) return;
    initializationStarted.current = true;
    initialize();
  }, [initialize]);

  return (
    <Routes>
      {routeDefinitions.map(({ path, element }) => (
        <Route key={path} path={path} element={element} />
      ))}
    </Routes>
  );
}
