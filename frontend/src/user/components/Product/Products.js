import React, { Fragment, useEffect, useReducer, useState } from "react";
import { clearErrors, getProduct } from "../../../actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../Loader/Loader";
import ProductCard from "./ProductCard";
import { useParams } from "react-router-dom";
import Pagination from "react-js-pagination";
import { Slider } from "@mui/material";

const Products = () => {
  const dispatch = useDispatch();
  const {
    products,
    loading,
    error,
    productsCount,
    resultPerPage,
    filteredProductsCount,
  } = useSelector((state) => state.products);

  const { keyword } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 50000]);

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  const priceHandler = (e, newPrice) => {
    setPrice(newPrice);
  };

  let count = filteredProductsCount;

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct(keyword, currentPage, price));
  }, [dispatch, keyword, currentPage, price, error]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <ToastContainer />
          <div className=" flex justify-center min-h-screen">
            {!keyword && (
              <div className=" w-1/4 px-8 py-4 flex flex-col gap-5">
                <div className=" flex flex-col gap-1">
                  <p className=" font-semibold text-xl text-[#141414]">Price</p>
                  <div className=" flex justify-between">
                    <span>Rs 0</span>
                    <span>Rs 50000</span>
                  </div>
                  <Slider
                    value={price}
                    onChange={priceHandler}
                    valueLabelDisplay="auto"
                    aria-labelledby="range-slider"
                    min={0}
                    max={50000}
                    sx={{
                      color: "#eddb8e",
                      "& .MuiSlider-thumb": {
                        backgroundColor: "#141414",
                      },
                      "& .MuiSlider-track": {
                        backgroundColor: "#eddb8e",
                      },
                      "& .MuiSlider-rail": {
                        backgroundColor: "#eddb8e",
                      },
                    }}
                  />
                </div>

                <div>
                  <p className=" font-semibold text-xl text-[#141414]">
                    Category
                  </p>
                </div>
              </div>
            )}

            {/* products */}
            <div className=" w-[70%] flex flex-col justify-center items-center">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4 py-4">
                {products &&
                  products.map((product) => (
                    <ProductCard key={product._id} product={product} />
                  ))}
              </div>

              {resultPerPage < count && (
                <div className=" flex justify-center items-center my-4">
                  <Pagination
                    activePage={currentPage}
                    itemsCountPerPage={resultPerPage}
                    totalItemsCount={productsCount}
                    onChange={setCurrentPageNo}
                    nextPageText="Next"
                    prevPageText="Prev"
                    itemClass="inline-block mx-1 bg-[#141414] text-white hover:bg-[#eddb8e] rounded-md px-2 py-1"
                    activeClass=" rounded-md px-2 py-1"
                    activeLinkClass=" text-[#eddb8e] rounded-md px-3 py-1"
                    linkClass="font-bold rounded-md px-3 py-1"
                    itemClassPrev="bg-[#eddb8e] rounded-md px-3 py-1"
                    itemClassNext="bg-[#eddb8e] rounded-md px-3 py-1"
                    itemClassFirst=" hidden "
                    itemClassLast=" hidden "
                  />
                </div>
              )}
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Products;
