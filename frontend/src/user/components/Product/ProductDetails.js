import React, { Fragment, useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProductDetails } from "../../../actions/productAction";
import { useParams, useNavigate } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import { ToastContainer, toast } from "react-toastify";
import Loader from "../Loader/Loader";
import { addToCart } from "../../../actions/cartAction";

const ProductDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();

  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );

  const {isAuthenticated} = useSelector((state) => state.user);

  const options = {
    edit: false,
    color: "#141414",
    activeColor: "#Eddb8d",
    size: window.innerWidth < 600 ? 20 : 25,
    value: product.ratings,
    isHalf: true,
  };


  const [selectedSize, setSelectedSize] = useState("");

  const handleSizeChange = (size) => {
    setSelectedSize(size);
  };

  const AddCart = () => {
    if(!isAuthenticated) {
      navigate('/login')
    }
    const data = { productId: id, size: selectedSize };
    dispatch(addToCart(data));
    toast.success("Product Added to Cart");
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProductDetails(id));
  }, [dispatch, id, error]);

  useEffect(() => {
    if (product.sizes && product.sizes.length > 0) {
      setSelectedSize(product.sizes[0].name);
    }
  }, [product]);

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
                <Carousel className=" w-[80%] m-4">
                  {product.images &&
                    product.images.map((item, i) => (
                      <div key={i} className=" w-full h-[30rem]">
                        <img
                          key={item.url}
                          src={item.url}
                          alt={item.name}
                          className=" w-full h-full object-scale-down object-center"
                        />
                      </div>
                    ))}
                </Carousel>

                <div className=" w-full my-4 px-4 flex justify-center gap-4">
                  <button
                    onClick={AddCart}
                    disabled={product.stock < 1}
                    className={` bg-[#eddb8e] w-full h-[3rem] rounded-[10px] text-lg font-medium ${
                      product.stock < 1 ? " bg-red-400" : ""
                    }`}
                  >
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
                  <div className="flex gap-2">
                    <p
                      className=" text-xl text-red-400 font-medium line-through"
                      style={{ textDecorationColor: "red" }}
                    >
                      Rs {product.price}
                    </p>
                    <p className=" text-xl font-medium">
                      Rs {product.discountedPrice}
                    </p>
                  </div>
                </div>

                {/* ratings */}
                <div className=" py-1 border-b-2">
                  <ReactStars {...options} />
                  <p>({product.numOfReviews} Reviews)</p>
                </div>

                <div className=" flex gap-4 py-3 text-lg font-medium border-b-2">
                  <div className=" flex flex-col gap-1">
                    Status:
                    <p
                      className={
                        product.stock === 0
                          ? " text-red-500"
                          : " text-green-500"
                      }
                    >
                      {product.stock === 0 ? "Out of Stock" : "In Stock"}
                    </p>
                    {product.stock > 0 && product.stock <= 10 && (
                      <span className=" text-[#eddb8e] font-normal">{`(${product.stock}) product remaining`}</span>
                    )}
                  </div>
                </div>

                {/* color */}
                <div className=" py-2 text-lg font-medium border-b-2">
                  Color
                  <div className={` text-${product.color}-500`}>
                    <div
                      className=" w-[1.5rem] h-[1.5rem] rounded-full"
                      style={{ backgroundColor: product.color }}
                    ></div>
                  </div>
                </div>

                {/* sizes */}
                <div className=" py-[1rem] border-b-2 text-lg">
                  <p className=" text-lg font-medium">Sizes</p>
                  <div className=" flex gap-4">
                    {product.sizes &&
                      product.sizes.map((size, index) => (
                        <button
                          key={size.name}
                          className={` px-3 py-1 rounded-[10px] flex items-center justify-center cursor-pointer font-medium ${
                            selectedSize === size.name
                              ? "bg-[#eddb8e] text-black"
                              : "bg-gray-200 text-gray-700"
                          }`}
                          onClick={() => handleSizeChange(size.name)}
                        >
                          {size.name}
                        </button>
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
