import React, { Fragment, useEffect, useState } from "react";
import { clearErrors, getProduct } from "../../../actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../Loader/Loader";
import ProductCard from "./ProductCard";
import { useParams } from "react-router-dom";
import Pagination from "react-js-pagination";
import { FormControlLabel, Radio, Slider } from "@mui/material";

const categories = [
  "Shiffon Saree",
  "Silk Saree",
  "Paithani Saree",
  "Banarasi Saree",
  "Chanderi Saree",
  "Sambalpuri Saree",
  "Organza Saree",
];

const Products = () => {
  const dispatch = useDispatch();
  const {
    products,
    loading,
    error,
    productsCount,
    resultPerPage: perPage,
    filteredProductsCount,
  } = useSelector((state) => state.products);

  const { keyword } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 50000]);
  const [category, setCategory] = useState("");
  const [filtersActive, setFiltersActive] = useState(false);
  const [resultPerPage, setResultPerPage] = useState(8);

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  const priceHandler = (e, newPrice) => {
    setPrice(newPrice);
    setFiltersActive(true);
  };

  let count = filteredProductsCount;

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct(keyword, currentPage, resultPerPage, price, category));
  }, [dispatch, keyword, currentPage, price, error, category, resultPerPage]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <ToastContainer />
          <div className=" flex flex-col lg:flex-row justify-center min-h-screen">
            {!keyword && (
              <div className=" w-full lg:w-1/4 px-8 py-4 flex flex-col gap-5">
                <div className=" bg-white p-4 rounded-md border-2 flex flex-col gap-1">
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

                <div className="bg-white p-4 rounded-md border-2">
                  <p className=" font-semibold text-xl text-[#141414]">
                    Category
                  </p>
                  <div className=" grid grid-cols-3 md:grid-cols-5 lg:flex lg:flex-col py-2">
                    {categories.map((cat) => (
                      <FormControlLabel
                        key={cat}
                        value={cat}
                        control={
                          <Radio
                            className=""
                            // Set checked property based on active category
                            checked={category === cat}
                            onClick={() => setCategory(cat)}
                            sx={{
                              "&.Mui-checked": {
                                color: "#eddb8e",
                              },
                            }}
                          />
                        }
                        label={cat}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* products */}
            <div className=" w-full lg:w-[70%] h-full flex flex-col justify-center items-center">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4 py-4">
                {products &&
                  products.map((product) => (
                    <ProductCard key={product._id} product={product} />
                  ))}
              </div>

              {perPage < count && (
                <div className=" flex justify-center items-center my-4">
                  <Pagination
                    activePage={currentPage}
                    itemsCountPerPage={perPage}
                    totalItemsCount={
                      filtersActive || keyword
                        ? filteredProductsCount
                        : productsCount
                    }
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
