import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout";
import Dashbord from "../pages/Dashbord";
import LoginPage from "../pages/LoginPage";
import Transactions from "../pages/Transactions";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Dashbord />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "transactions",
        element: <Transactions />,
      },
    ],
  },
]);
