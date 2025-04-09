import { useContext } from "react";
import "./App.css";
import ScrollToTop from "./components/utils/ScrollToTop";
import useRouteElements from "./routes/useRouteElements";
import { PrimeReactProvider } from "primereact/api";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import { AppProvider } from "./contexts/app.context";
import LoadingPage from "./components/_loadingComponents/LoadingPage";
import { AppContext } from "./contexts/app.context";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Toaster } from "sonner";

function AppIner() {
  const routes = useRouteElements();
  const { loadingPage } = useContext(AppContext);

  return (
    <div
      style={{
        minHeight: "inherit",
      }}
    >
      <Toaster position="top-center" duration={2000} />
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
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <AppIner />
          </LocalizationProvider>
        </AppProvider>
      </PrimeReactProvider>
    </ScrollToTop>
  );
}

export default App;
