import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../../../user/components/Loader/Loader";
import {
  clearErrors,
  deleteOrder,
  getAllOrders,
} from "../../../actions/orderAction";
import { ADMIN_DELETE_ORDER_RESET } from "../../../constants/orderConstants";

const OrderList = () => {
  const dispatch = useDispatch();

  const { loading, error, orders } = useSelector((state) => state.allOrders);
  const { error: deleteError, isDeleted } = useSelector((state) => state.order);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (deleteError) {
      toast.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      toast.success("Order Deleted Successfully");
      dispatch({ type: ADMIN_DELETE_ORDER_RESET });
    }
    dispatch(getAllOrders());
  }, [dispatch, error, deleteError, isDeleted]);

  const deleteOrderHandler = (id) => {
    dispatch(deleteOrder(id));
  };

  const columnData = [
    { field: "id", headerName: "ORDER ID", minWidth: 250, flex: 1 },
    {
      field: "status",
      headerName: "Status",
      minWidth: 150,
      flex: 0.5,
    },
    {
      field: "quantity",
      headerName: "Order Quantity",
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
      minWidth: 250,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            {params.row.status !== "Cancelled" && params.row.status !== "Delivered" && (
              <Link
                className=" bg-[#141414] text-white hover:bg-[#eddb8e] hover:text-black px-2 py-1.5 rounded-md border-2 font-medium"
                to={`/admin/order/${params.id}`}
              >
                UPDATE
              </Link>
            )}

            <button
              onClick={() => deleteOrderHandler(params.id)}
              className=" bg-[#141414] text-white hover:bg-[#eddb8e] hover:text-black px-2 py-1.5 rounded-md border-2 font-medium"
            >
              DELETE
            </button>
          </Fragment>
        );
      },
    },
  ];

  const rowData = [];

  orders &&
    orders.forEach((item) => {
      rowData.push({
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
        <div className=" my-3">
          <DataGrid
            initialState={{
              pagination: {
                paginationModel: { pageSize: 10, page: 0 },
              },
            }}
            rows={rowData}
            columns={columnData}
            disableSelectionOnClick
          />
        </div>
      )}
    </>
  );
};

export default OrderList;
