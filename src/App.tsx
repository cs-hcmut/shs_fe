import { useContext } from "react";
import "./App.css";
import ScrollToTop from "./components/utils/ScrollToTop";
import useRouteElements from "./routes/useRouteElements";
import { PrimeReactProvider } from "primereact/api";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import { AppProvider } from "./contexts/app.context";
import LoadingPage from "./components/_loadingComponents/LoadingPage";
import { AppContext } from "./contexts/app.context";
import { CartProvider } from "./contexts/cart.context";
import { OrderProvider } from "./contexts/order.context";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

function AppIner() {
  const routes = useRouteElements();
  const { loadingPage } = useContext(AppContext);

  return (
    <div
      style={{
        minHeight: "inherit",
      }}
    >
      {routes}
      {loadingPage && <LoadingPage />}
    </div>
  );
}

function App() {
  return (
    <ScrollToTop>
      <PrimeReactProvider>
        <AppProvider>
          <CartProvider>
            <OrderProvider>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <AppIner />
              </LocalizationProvider>
            </OrderProvider>
          </CartProvider>
        </AppProvider>
      </PrimeReactProvider>
    </ScrollToTop>
  );
}

export default App;
