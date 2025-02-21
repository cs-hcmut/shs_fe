import { useContext } from "react";
import { Navigate, Outlet, RouteObject } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import { AppContext } from "../contexts/app.context";

function ProtectedRouteWrapper() {
  const { isAuthenticated } = useContext(AppContext);
  return isAuthenticated ? (
    <MainLayout>
      <Outlet />
    </MainLayout>
  ) : (
    <Navigate
      to="/login"
      state={{ context: "AccessProtectedRouteDenied", from: "user" }}
    />
  );
}

const ProtectedRoute: RouteObject = {
  path: "",
  element: <ProtectedRouteWrapper />,
  children: [],
};

export default ProtectedRoute;
