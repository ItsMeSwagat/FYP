import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthLayout from "./Layout/AuthLayout";
import Login from "./user/components/Form/Login";
import Signup from "./user/components/Form/Signup";
import Layout from "./Layout/Layout";
import Home from "./user/components/Home/Home";
import Products from "./user/components/Product/Products";
import ProductDetails from "./user/components/Product/ProductDetails";
import Search from "./user/components/Search/Search";
import ProtectedRoute from "./route/ProtectedRoute";
import Account from "./user/components/Account/Account";
import EditProfile from "./user/components/Account/EditProfile";
import ChangePassword from "./user/components/Account/ChangePassword";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { loadUser } from "./actions/userAction";
import { store } from "./store";
import ForgotPassword from "./user/components/Account/ForgotPassword";
import ResetPassword from "./user/components/Account/ResetPassword";
import ErrorPage from "./route/ErrorPage";
import Cart from "./user/components/Cart/Cart";
import { ToastContainer } from "react-toastify";

function App() {
  const { isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/password/forgot" element={<ForgotPassword />} />
          <Route
            path="/password/reset/:resettoken"
            element={<ResetPassword />}
          />
        </Route>

        <Route path="/" element={<Layout />} errorElement={<ErrorPage />}>
          <Route path="" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/products/:keyword" element={<Products />} />
          <Route path="/search" element={<Search />} />
          <Route path="/cart" element={<Cart />} />

          <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
            <Route path="/account" element={<Account />} />
            <Route path="/customer/update" element={<EditProfile />} />
            <Route path="/password/update" element={<ChangePassword />} />
          </Route>
        </Route>
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
