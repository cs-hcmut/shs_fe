import { Suspense } from "react";
import { Outlet, RouteObject } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import HomePage from "../pages/HomePage";
import mainPath from "../constants/path";
import NotFoundPage from "../pages/NotFoundPage";

function MainRouteWrapper() {
  return (
    <MainLayout>
      <Suspense fallback={<div>Loading...</div>}>
        <Outlet />
      </Suspense>
    </MainLayout>
  );
}

const MainRoute: RouteObject = {
  path: "",
  element: <MainRouteWrapper />,
  children: [
    {
      path: mainPath.home,
      element: <HomePage />,
      index: true,
    },
    {
      path: "*",
      element: (
        <MainLayout>
          <NotFoundPage />
        </MainLayout>
      ),
    },
  ],
};

export default MainRoute;
