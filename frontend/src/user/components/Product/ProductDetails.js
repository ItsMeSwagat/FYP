import React, { Fragment, useEffect } from "react";
import Carousel from "react-material-ui-carousel";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProductDetails } from "../../../actions/productAction";
import { useParams } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import { ToastContainer, toast } from "react-toastify";
import Loader from "../Loader/Loader";

const ProductDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProductDetails(id));
  }, [dispatch, id, error]);

  const options = {
    edit: false,
    color: "#141414",
    activeColor: "#Eddb8d",
    size: window.innerWidth < 600 ? 20 : 25,
    value: product.ratings,
    isHalf: true,
  };


  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <ToastContainer />
          <div className=" min-h-[80vh] mx-[8rem] my-[1rem]">
            <div className=" bg-white w-full flex">
              <div className=" w-[50%] flex flex-col justify-center items-center">
                <Carousel className=" w-[80%]">
                  {product.images &&
                    product.images.map((item, i) => (
                      <img
                        key={item.url}
                        src={item.url}
                        alt={item.name}
                        className=" object-cover object-center"
                      />
                    ))}
                </Carousel>

                <div className=" w-full my-4 px-4 flex justify-center gap-4">
                  <button className=" bg-[#eddb8e] w-full h-[3rem] rounded-[10px] text-lg font-medium">
                    Add to Cart
                  </button>
                  <button className=" bg-[#141414] w-full h-[3rem] rounded-[10px] text-white text-lg font-medium">
                    Buy Now
                  </button>
                </div>
              </div>

              {/* Product Details */}
              <div className=" w-[50%] px-[2rem]">
                <div className=" py-3 border-b-2">
                  <p className=" text-[#eddb8e] font-medium text-sm capitalize">
                    #PRODUCT {product._id}
                  </p>
                </div>
                <div className=" py-3 border-b-2">
                  <h1 className=" text-3xl font-semibold">{product.name}</h1>
                  <p className=" text-xl font-medium">Rs {product.price}</p>
                </div>

                {/* ratings */}
                <div className=" py-1 border-b-2">
                  <ReactStars {...options} />
                  <p>({product.numOfReviews} Reviews)</p>
                </div>

                {/* quantity or stock */}
                <div className=" py-3 border-b-2">
                  <p className=" font-medium text-lg">Quantity</p>
                  <div className=" w-[8rem] rounded-[10px] flex gap-4 border-2 overflow-hidden ">
                    <button className=" bg-[#eddb8e] w-8 h-8  text-center text-lg font-bold">
                      -
                    </button>
                    <input
                      value="1"
                      type=""
                      className=" w-[2rem] h-[2rem] text-lg text-center"
                    />
                    <button className=" bg-[#eddb8e] w-8 h-8  text-center text-lg font-bold ">
                      +
                    </button>
                  </div>
                </div>

                <div className=" flex gap-4 py-3 text-lg font-medium border-b-2">
                  Status:
                  <p
                    className={
                      product.stock < 1 ? " text-red-500" : " text-[#eddb8e]"
                    }
                  >
                    {product.stock < 1 ? "Out of Stock" : "In Stock"}
                  </p>
                </div>

                {/* color */}
                <div className=" py-2 text-lg font-medium border-b-2">
                  Color
                  <p className={` text-${product.color}-500`}>
                    <div className=" w-[1.5rem] h-[1.5rem] rounded-full" style={{ backgroundColor: product.color}}>
                    </div>
                  </p>
                </div>

                {/* sizes */}
                <div className=" py-[1rem] border-b-2 text-lg">
                  <p className=" text-lg font-medium">Sizes</p>
                  <div className=" flex gap-4">
                    {product.sizes &&
                      product.sizes.map((size, index) => (
                        <label
                          key={size.name}
                          className="flex items-center cursor-pointer"
                        >
                          <input
                            type="radio"
                            name="size"
                            value={size.name}
                            className=""
                          />
                          <div
                            className={` w-[3rem] h-[2rem] rounded-[10px] flex items-center justify-center cursor-pointer ${
                              size.checked
                                ? "bg-black text-white"
                                : "bg-[#eddb8e] hover:bg-black hover:text-white"
                            }`}
                          >
                            <span className="font-semibold">{size.name}</span>
                          </div>
                        </label>
                      ))}
                  </div>
                </div>

                <div className=" text-lg font-medium py-[1rem] border-b-2">
                  Description
                  <p className=" font-normal">{product.description}</p>
                </div>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default ProductDetails;







