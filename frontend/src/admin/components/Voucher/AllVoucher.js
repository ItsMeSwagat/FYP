import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../../../user/components/Loader/Loader";


import { clearVoucherErrors, deleteVoucher, getAllVouchers } from "../../../actions/voucherAction";
import { DELETE_VOUCHER_RESET } from "../../../constants/voucherConstants";

const AllVoucher = () => {
  const dispatch = useDispatch();

  const { loading, error, vouchers } = useSelector((state) => state.allVouchers);
  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.adminVoucher
  );

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearVoucherErrors());
    }
    if (deleteError) {
      toast.error(deleteError);
      dispatch(clearVoucherErrors());
    }

    if (isDeleted) {
      toast.success("Voucher Deleted Successfully");
      dispatch({ type: DELETE_VOUCHER_RESET });
    }
    dispatch(getAllVouchers());
  }, [dispatch, error, deleteError, isDeleted]);

  const deleteVoucherHandler = (id) => {
    dispatch(deleteVoucher(id));
  };

  const columnData = [
    { field: "id", headerName: "VOUCHER ID", minWidth: 250, flex: 0.5 },

    {
      field: "name",
      headerName: "VOUCHER CODE",
      minWidth: 150,
      flex: 1,
    },
    {
      field: "expiry",
      headerName: "EXPIRY",
      minWidth: 200,
      flex: 0.3,
    },

    {
      field: "discount",
      headerName: "DISCOUNT",
      type: "number",
      minWidth: 150,
      flex: 0.5,
    },

    {
        field: "discountType",
        headerName: "DISCOUNT TYPE",
        minWidth: 150,
        flex: 0.3,
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
            <Link
              className=" bg-[#141414] text-white hover:bg-[#eddb8e] hover:text-black px-2 py-1.5 rounded-md border-2 font-medium"
              to={`/admin/voucher/${params.id}`}
            >
              EDIT
            </Link>

            <button
              onClick={() => deleteVoucherHandler(params.id)}
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

  vouchers &&
    vouchers.forEach((item) => {
      rowData.push({
        id: item._id,
        name: item.name,
        expiry: item.expiry,
        discount: item.discount,
        discountType: item.discountType,
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




export default AllVoucher