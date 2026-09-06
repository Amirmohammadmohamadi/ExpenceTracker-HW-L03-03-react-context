import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import TransactionContextProvider from "./context/TransactionsContext";
import CategoriesContextProvider from "./context/CategoriesContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <TransactionContextProvider>
      <CategoriesContextProvider>
        <RouterProvider router={router} />
      </CategoriesContextProvider>
    </TransactionContextProvider>
  </StrictMode>
);
