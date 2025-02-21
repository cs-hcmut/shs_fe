import { useRoutes } from "react-router-dom";
import MainRoute from "./mainRoute";
import AuthenticationRoute from "./authenticationRoute";
import ProtectedRoute from "./protectedRoute";

export default function useRouteElements() {
  const routeElements = useRoutes([
    {
      path: "",
      children: [ProtectedRoute, AuthenticationRoute, MainRoute],
    },
  ]);
  return routeElements;
}
