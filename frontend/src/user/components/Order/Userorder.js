import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, myOrders } from "../../../actions/orderAction";
import Loader from "../Loader/Loader";
import { toast } from "react-toastify";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";

const UserOrder = () => {
  const dispatch = useDispatch();

  const { loading, error, orders } = useSelector((state) => state.userOrder);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    dispatch(myOrders());
  }, [dispatch, error]);

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

  orders &&
    orders.forEach((item, i) => {
      dataRows.push({
        quantity: item.orderItems.length,
        id: item._id,
        status: item.orderStatus,
        amount: item.totalOrderPrice,
      });
    });

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className=" min-h-[50vh] px-[1rem] md:px-[2rem] lg:px-[2rem] xl:px-[8rem] py-[3rem]">
            <DataGrid
              rows={dataRows}
              columns={dataColumns}
              pageSize={10}
              disableSelectionOnClick
              className=" bg-white border-2 shadow-sm rounded-md"
              autoHeight
            />
          </div>
        </Fragment>
      )}
    </>
  );
};

export default UserOrder;
