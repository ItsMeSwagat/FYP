import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../Loader/Loader";
import { clearErrors, myOrders } from "../../../actions/orderAction";
import { toast } from "react-toastify";
import { DataGrid } from "@mui/x-data-grid";

const Account = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, user, loading } = useSelector((state) => state.user);
  const {
    loading: orderLoading,
    error,
    orders,
  } = useSelector((state) => state.userOrder);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      if (!isAuthenticated) {
        navigate("/login");
      }
    }
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    dispatch(myOrders());
  }, [isAuthenticated, navigate, user, loading, dispatch, error]);

  const getTop3Orders = () => {
    if (!orders) return [];
    return orders.slice(0, 3);
  };

  const dataColumns = [
    { field: "id", headerName: "ORDER ID", minWidth: 250, flex: 1 },
    {
      field: "status",
      headerName: "Status",
      minWidth: 150,
      flex: 0.5,
    },
    {
      field: "quantity",
      headerName: "Quantity",
      type: "number",
      minWidth: 150,
      flex: 0.2,
    },

    {
      field: "amount",
      headerName: "Order Total",
      type: "number",
      minWidth: 270,
      flex: 0.5,
      valueFormatter: (params) => `Rs ${params.value}`,
    },

    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Link
            to={`/order/details/${params.id}`}
            className=" bg-[#141414] text-white hover:bg-[#eddb8e] hover:text-black px-2 py-1.5 rounded-md border-2 font-medium"
          >
            View Order
          </Link>
        );
      },
    },
  ];

  const dataRows = [];

  getTop3Orders().forEach((item, i) => {
    dataRows.push({
      quantity: item.orderItems.length,
      id: item._id,
      status: item.orderStatus,
      amount: item.totalOrderPrice,
    });
  });

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <div className="px-[8rem] w-full min-h-[60vh] flex flex-col justify-center items-center">
          {/* Manage Account */}
          <div className=" flex gap-4 w-full py-4">
            <div className=" relative w-full h-[10rem] flex items-center justify-between bg-white rounded-md p-4 border-2">
              <h1 className=" text-xl font-medium">Personal Profile</h1>
              <div className=" w-[8rem] h-[8rem] rounded-full overflow-hidden">
                <img
                  src={user.avatar.url}
                  alt="img"
                  className=" w-full h-full object-cover"
                />
              </div>
              <div className=" flex flex-col gap-2 text-lg">
                <p>{user.name}</p>
                <p>{user.email}</p>
                <p className=" font-medium">
                  Joined At:{" "}
                  <span className=" font-normal">
                    {String(user.createdAt).substr(0, 10)}
                  </span>
                </p>
              </div>
              <div className=" flex flex-col gap-2">
                <Link
                  to={`/customer/update`}
                  className="bg-[#141414] w-[12rem] px-5 py-2 font-medium hover:bg-[#eddb8e] text-white hover:text-black"
                >
                  Edit Profile
                </Link>
                <Link
                  to={`/password/update`}
                  className="bg-[#141414] w-[12rem] px-5 py-2 font-medium hover:bg-[#eddb8e] text-white hover:text-black"
                >
                  Change Password
                </Link>
              </div>
            </div>
            {/* <div className=" flex flex-col justify-between w-[65%] h-[10rem] bg-white rounded-md border-2 p-4">
                  <h1 className=" text-xl font-medium">Private Profile</h1>
                  <div className=" flex flex-col gap-2">
                    <Link className="bg-[#141414] w-[8rem] px-5 py-2 font-medium hover:bg-[#eddb8e] text-white hover:text-black">
                      Edit Profile
                    </Link>
                    <Link className="bg-[#141414] w-[12rem] px-5 py-2 font-medium hover:bg-[#eddb8e] text-white hover:text-black">
                      Change Password
                    </Link>
                  </div>
                </div> */}
          </div>

          {/* Recent Orders */}
          <div className=" w-full min-h-[15rem] bg-white rounded-md border-2 p-4 mb-4">
            <h1 className=" text-xl font-medium">Recent Orders</h1>
            <div>
              {loading ? (
                <Loader />
              ) : (
                <div className=" py-4">
                  <DataGrid
                    rows={dataRows}
                    columns={dataColumns}
                    pageSize={3} // Show only 3 rows
                    disableSelectionOnClick
                    className=" bg-white border-2 shadow-sm rounded-md"
                    autoHeight
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default Account;
