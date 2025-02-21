import { useRoutes } from "react-router-dom";
import MainRoute from "../routes/mainRoute";
import AuthenticationRoute from "../routes/authenticationRoute";
import ProtectedRoute from "../routes/userRoute";

export default function useRouteElements() {
  const routeElements = useRoutes([
    {
      path: "",
      children: [ProtectedRoute, AuthenticationRoute, MainRoute],
    },
  ]);
  return routeElements;
}
