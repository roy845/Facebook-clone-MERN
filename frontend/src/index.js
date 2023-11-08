import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AuthContextProvider } from "./context/auth/AuthContext";
import { ModalContextProvider } from "./context/modals/ModalContext";
import { UsersContextProvider } from "./context/users/UsersContext";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { ItemsContextProvider } from "./context/items/ItemsContext";
import { VehiclesContextProvider } from "./context/vehicles/VehiclesContext";
import { PropertyContextProvider } from "./context/property/PropertyContext";
import { MarketContextProvider } from "./context/market/MarketContext";
import { ChatProvider } from "./context/chat/ChatContext";
import { ChakraProvider } from "@chakra-ui/react";

const theme = createTheme({
  common: {
    black: "#000",
    white: "#fff",
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <ChakraProvider>
          <AuthContextProvider>
            <UsersContextProvider>
              <PropertyContextProvider>
                <VehiclesContextProvider>
                  <ItemsContextProvider>
                    <MarketContextProvider>
                      <ModalContextProvider>
                        <Toaster />
                        <ThemeProvider theme={theme}>
                          <ChatProvider>
                            <App />
                          </ChatProvider>
                        </ThemeProvider>
                      </ModalContextProvider>
                    </MarketContextProvider>
                  </ItemsContextProvider>
                </VehiclesContextProvider>
              </PropertyContextProvider>
            </UsersContextProvider>
          </AuthContextProvider>
        </ChakraProvider>
      </LocalizationProvider>
    </Router>
  </React.StrictMode>
);
