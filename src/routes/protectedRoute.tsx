import { useContext } from "react";
import { Navigate, Outlet, RouteObject } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import { AppContext } from "../contexts/app.context";
import { homeManagementPaths } from "../constants/path";
import HomeManagement from "../pages/HomeManagement";
import HouseDetail from "../pages/HouseDetail";
import RoomDetail from "../pages/RoomDetail";
import HouseConfig from "src/pages/HouseConfig";
import HouseSchedule from "src/pages/HouseSchedule";

export function ProtectedRouteWrapper() {
  const { isAuthenticated } = useContext(AppContext);
  return true ? (
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
  children: [
    {
      path: homeManagementPaths.homes,
      element: <HomeManagement />,
    },
    {
      path: homeManagementPaths.homesDetail,
      element: <HouseDetail />,
    },
    {
      path: homeManagementPaths.config,
      element: <HouseConfig />,
    },
    {
      path: homeManagementPaths.schedule,
      element: <HouseSchedule />,
    },
    {
      path: homeManagementPaths.roomDetail,
      element: <RoomDetail />,
    },
  ],
};

export default ProtectedRoute;
