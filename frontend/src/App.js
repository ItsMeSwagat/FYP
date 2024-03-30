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
import store from "./store";
import ForgotPassword from "./user/components/Account/ForgotPassword";
import ResetPassword from "./user/components/Account/ResetPassword";

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
          <Route path="/password/forgot" element={<ForgotPassword/>} />
          <Route path="/password/reset/:resettoken" element={<ResetPassword/>} />
        </Route>

        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/products/:keyword" element={<Products />} />
          <Route path="/search" element={<Search />} />
          

          <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
            <Route path="/account" element={<Account />} />
            <Route path="/customer/update" element={<EditProfile />} />
            <Route path="/password/update" element={<ChangePassword />} />
            
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
