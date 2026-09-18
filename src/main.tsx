import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/index";
import CategoriesContextProvider from "./context/CategoriesContext";
import { Provider } from "react-redux";
import { store } from "./redux";
import LoginContextStatusProvider from "./context/LoginStatusContext";
import AuthenticationProvider from "./context/AuthentiactionContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <AuthenticationProvider>
        <LoginContextStatusProvider>
          <CategoriesContextProvider>
            <RouterProvider router={router} />
          </CategoriesContextProvider>
        </LoginContextStatusProvider>
      </AuthenticationProvider>
    </Provider>
  </StrictMode>
);
