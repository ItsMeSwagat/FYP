import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Layout/Layout.jsx";
import Home from "./user/components/Home/Home.jsx";
import { Provider } from "react-redux";
import store from "./store.js";
import Login from "./user/components/Form/Login.jsx";
import Signup from "./user/components/Form/Signup.jsx";
import ProductDetails from "./user/components/Product/ProductDetails.js";
import Products from "./user/components/Product/Products.js";
import Search from "./user/components/Search/Search.js";
import Account from "./user/components/Account/Account.jsx";
import ErrorPage from "./route/ErrorPage.js";
import ProtectedRoute from "./route/ProtectedRoute.js";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "/products",
        element: <Products />,
      },
      {
        path: "/product/:id",
        element: <ProductDetails />,
      },
      {
        path: "/products/:keyword",
        element: <Products />,
      },
      {
        path: "/search",
        element: <Search />,
      },
      {
        path: "/account",
        element: <ProtectedRoute component={Account} />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
