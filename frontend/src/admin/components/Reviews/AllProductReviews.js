import React, { Fragment, useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import Loader from "../../../user/components/Loader/Loader";
import { ADMIN_DELETE_PRODUCT_RESET } from "../../../constants/productConstants";
import {
  adminDeleteReview,
  adminGetAllReviews,
  clearErrors,
} from "../../../actions/reviewAction";
import { ADMIN_DELETE_REVIEW_RESET } from "../../../constants/reviewConstants";

const AllProductReviews = () => {
  const dispatch = useDispatch();

  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.adminReview
  );
  const { loading, error, reviews } = useSelector(
    (state) => state.adminProductReviews
  );

  const [productID, setProductID] = useState("");

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
      toast.success("Review Deleted Successfully");
      dispatch({ type: ADMIN_DELETE_REVIEW_RESET });
    }
  }, [dispatch, error, deleteError, isDeleted]);

  const deleteReviewHandler = (id) => {
    dispatch(adminDeleteReview(id, productID));
  };

  const reviewHandler = (e) => {
    e.preventDefault();

    if (productID.length !== 24) {
      toast.error("Product ID must have exactly 24 characters");
      return;
    }

    dispatch(adminGetAllReviews(productID));
  };

  const columnData = [
    { field: "id", headerName: "REVIEW ID", minWidth: 200, flex: 0.5 },

    {
      field: "name",
      headerName: "USER",
      type: "number",
      minWidth: 200,
      flex: 0.3,
    },
    {
      field: "comment",
      headerName: "Review Comment",
      minWidth: 350,
      flex: 1,
    },

    {
      field: "rating",
      headerName: "RATING",
      type: "number",
      minWidth: 150,
      flex: 0.5,
    },

    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 100,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <button
              onClick={() => deleteReviewHandler(params.id)}
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

  reviews &&
    reviews.forEach((item) => {
      rowData.push({
        id: item._id,
        name: item.name,
        rating: item.rating,
        comment: item.comment,
      });
    });
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className=" my-[5rem]">
          <div className=" mx-[8rem] mb-[2rem] flex flex-col gap-3 bg-white rounded-md border-2 p-4">
            <h1 className=" text-3xl text-center font-bold">REVIEWS</h1>
            <form className=" flex flex-col gap-5" onSubmit={reviewHandler}>
              <div className=" bg-[#f5f5f5] flex flex-col gap-1 p-2 rounded-md border-2 ">
                <label className=" text-lg font-medium">Product Name</label>
                <input
                  className=" p-1 border-2 outline-none"
                  type="text"
                  placeholder="Enter Product ID"
                  required
                  value={productID}
                  onChange={(e) => setProductID(e.target.value)}
                />
              </div>

              <div>
                <input
                  className=" cursor-pointer w-full mt-2 py-1.5 bg-[#141414] text-white rounded-md font-medium"
                  type="submit"
                  value="Search Reviews"
                  disabled={
                    loading ? true : false || productID === "" ? true : false
                  }
                />
              </div>
            </form>
          </div>
          {reviews && reviews.length > 0 ? (
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
          ) : (
            <div className=" flex justify-center my-[2rem]">
              <h1 className=" bg-white px-3 py-1 border-2 rounded-md">
                No review Available
              </h1>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default AllProductReviews;
