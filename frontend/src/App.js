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
import AllProducts from "./admin/components/Product/AllProducts";
import CreateProduct from "./admin/components/Product/CreateProduct";
import UpdateProduct from "./admin/components/Product/UpdateProduct";
import OrderList from "./admin/components/Order/OrderList";
import UpdateOrder from "./admin/components/Order/UpdateOrder";
import AllUsers from "./admin/components/User/AllUsers";
import UpdateUserRole from "./admin/components/User/UpdateUserRole";
import AllProductReviews from "./admin/components/Reviews/AllProductReviews";
import AllVoucher from "./admin/components/Voucher/AllVoucher";
import CreateVoucher from "./admin/components/Voucher/CreateVoucher";
import UpdateVoucher from "./admin/components/Voucher/UpdateVoucher";
import OrderFail from "./user/components/Order/OrderFail";

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

        {/* Admin Route */}
        <Route element={<AdminLayout />}>
          <Route element={<ProtectedRoute isAdmin={true} />}>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
          </Route>
          <Route element={<ProtectedRoute isAdmin={true} />}>
            <Route path="/admin/products/all" element={<AllProducts />} />
          </Route>
          <Route element={<ProtectedRoute isAdmin={true} />}>
            <Route path="/admin/product/create" element={<CreateProduct />} />
          </Route>
          <Route element={<ProtectedRoute isAdmin={true} />}>
            <Route path="/admin/product/:id" element={<UpdateProduct />} />
          </Route>
          <Route element={<ProtectedRoute isAdmin={true} />}>
            <Route path="/admin/orders/all" element={<OrderList />} />
          </Route>
          <Route element={<ProtectedRoute isAdmin={true} />}>
            <Route path="/admin/order/:id" element={<UpdateOrder />} />
          </Route>
          <Route element={<ProtectedRoute isAdmin={true} />}>
            <Route path="/admin/users" element={<AllUsers />} />
          </Route>
          <Route element={<ProtectedRoute isAdmin={true} />}>
            <Route path="/admin/user/:id" element={<UpdateUserRole />} />
          </Route>
          <Route element={<ProtectedRoute isAdmin={true} />}>
            <Route
              path="/admin/allProductReview"
              element={<AllProductReviews />}
            />
          </Route>
          <Route element={<ProtectedRoute isAdmin={true} />}>
            <Route path="/admin/allVouchers" element={<AllVoucher />} />
          </Route>
          <Route element={<ProtectedRoute isAdmin={true} />}>
            <Route path="/admin/voucher/create" element={<CreateVoucher />} />
          </Route>
          <Route element={<ProtectedRoute isAdmin={true} />}>
            <Route path="/admin/voucher/:id" element={<UpdateVoucher />} />
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
            <Route path="/payment/Fail" element={<OrderFail />} />
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
