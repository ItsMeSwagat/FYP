import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthLayout from "./Layout/AuthLayout";
import Login from "./user/components/Form/Login";
import Signup from "./user/components/Form/Signup";
import Layout from "./Layout/Layout";
import AdminLayout from "./Layout/AdminLayout";
import Home from "./user/components/Home/Home";
import Products from "./user/components/Product/Products";
import ProductDetails from "./user/components/Product/ProductDetails";
import Search from "./user/components/Search/Search";
import { ProtectedRoute } from "./route/ProtectedRoute";
import Account from "./user/components/Account/Account";
import EditProfile from "./user/components/Account/EditProfile";
import ChangePassword from "./user/components/Account/ChangePassword";
import { useEffect } from "react";
import { loadUser } from "./actions/userAction";
import { store } from "./store";
import ForgotPassword from "./user/components/Account/ForgotPassword";
import ResetPassword from "./user/components/Account/ResetPassword";
import ErrorPage from "./route/ErrorPage";
import Cart from "./user/components/Cart/Cart";
import ShippingDetails from "./user/components/Checkout/ShippingDetails";
import ConfirmOrder from "./user/components/Checkout/ConfirmOrder";
import Payment from "./user/components/Checkout/Payment";
import Success from "./user/components/Checkout/Success";
import Userorder from "./user/components/Order/Userorder";
import OrderDetail from "./user/components/Order/OrderDetail";
import AdminDashboard from "./admin/components/Dashboard/AdminDashboard";

function App() {
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

        <Route element={<AdminLayout />}>
          <Route element={<ProtectedRoute isAdmin={true} />}>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
          </Route>
        </Route>

        <Route path="/" element={<Layout />}>
          <Route path="" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/products/:keyword" element={<Products />} />
          <Route path="/search" element={<Search />} />

          <Route element={<ProtectedRoute />} errorElement={<ErrorPage />}>
            <Route path="/account" element={<Account />} />
            <Route path="/customer/update" element={<EditProfile />} />
            <Route path="/password/update" element={<ChangePassword />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/shipping" element={<ShippingDetails />} />
            <Route path="/confirmorder" element={<ConfirmOrder />} />
            <Route path="/payment/process" element={<Payment />} />
            <Route path="/payment/success" element={<Success />} />
            <Route path="/orders/user" element={<Userorder />} />
            <Route path="/order/details/:id" element={<OrderDetail />} />
          </Route>
        </Route>
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
