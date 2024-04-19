import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  clearErrors,
  getAllProductAdmin,
  deleteProduct
} from "../../../actions/productAction";
import Loader from "../../../user/components/Loader/Loader";
import { ADMIN_DELETE_PRODUCT_RESET } from "../../../constants/productConstants";

const AllProducts = () => {
  const dispatch = useDispatch();

  const { loading, error, products } = useSelector((state) => state.products);
  const {error: deleteError, isDeleted} = useSelector((state) => state.product);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (deleteError) {
      toast.error(deleteError);
      dispatch(clearErrors());
    }

    if(isDeleted){
      toast.success("Product Deleted Successfully")
      dispatch({type: ADMIN_DELETE_PRODUCT_RESET})
    }
    dispatch(getAllProductAdmin());
  }, [dispatch, error, deleteError, isDeleted]);

  const deleteProductHandler = (id) => {
    dispatch(deleteProduct(id));
  }

  const columnData = [
    { field: "id", headerName: "Product ID", minWidth: 300, flex: 0.5 },

    {
      field: "name",
      headerName: "Name",
      minWidth: 200,
      flex: 1,
    },
    {
      field: "stock",
      headerName: "Stock",
      type: "number",
      minWidth: 100,
      flex: 0.3,
    },

    {
      field: "price",
      headerName: "Price",
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
            <Link
              className=" bg-[#141414] text-white hover:bg-[#eddb8e] hover:text-black px-2 py-1.5 rounded-md border-2 font-medium"
              to={`/admin/product/${params.id}`}
            >
              EDIT
            </Link>

            <button onClick={() => deleteProductHandler(params.id)} className=" bg-[#141414] text-white hover:bg-[#eddb8e] hover:text-black px-2 py-1.5 rounded-md border-2 font-medium">
              DELETE
            </button>
          </Fragment>
        );
      },
    },
  ];

  const rowData = [];

  products &&
    products.forEach((item) => {
      rowData.push({
        id: item._id,
        stock: item.stock,
        price: item.price,
        name: item.name,
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

export default AllProducts;
