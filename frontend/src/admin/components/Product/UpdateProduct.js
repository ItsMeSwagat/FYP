import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  clearErrors,
  getProductDetails,
  updateProduct,
} from "../../../actions/productAction";
import { useNavigate, useParams } from "react-router-dom";
import { ADMIN_UPDATE_PRODUCT_RESET } from "../../../constants/productConstants";
import Loader from "../../../user/components/Loader/Loader";

const UpdateProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const productId = id;

  const {
    loading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.product);
  const {
    loading: detailsLoading,
    error,
    product,
  } = useSelector((state) => state.productDetails);

  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState(0);
  const [productDiscountedPrice, setProductDiscountedPrice] = useState(0);
  const [productDiscountPercent, setProductDiscountPercent] = useState(0);
  const [productColor, setProductColor] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [productStock, setProductStock] = useState(0);
  const [images, setImages] = useState([]);
  const [oldImages, setOldImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);
  const [sizes, setSizes] = useState([{ name: "", stock: "" }]);

  const categories = [
    "Shiffon Saree",
    "Silk Saree",
    "Paithani Saree",
    "Banarasi Saree",
    "Chanderi Saree",
    "Sambalpuri Saree",
    "Organza Saree",
  ];

  useEffect(() => {
    if (product && product._id !== productId) {
      dispatch(getProductDetails(productId));
    } else {
      setProductName(product.name);
      setProductDescription(product.description);
      setProductPrice(product.price);
      setProductDiscountedPrice(product.discountedPrice);
      setProductDiscountPercent(product.discountPercent);
      setProductCategory(product.category);
      setProductColor(product.color);
      setOldImages(product.images);
      setSizes(product.sizes);
      setProductStock(product.stock);
    }

    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (updateError) {
      toast.error(updateError);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      toast.success("Product Update Successful");
      navigate("/admin/products/all");
      dispatch({ type: ADMIN_UPDATE_PRODUCT_RESET });
    }
  }, [error, dispatch, navigate, isUpdated, product, productId, updateError]);

  const updateProductImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setOldImages([]);
    setImagesPreview([]);

    files.forEach((file) => {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size should not exceed 5MB");
      } else {
        const reader = new FileReader();

        reader.onload = () => {
          if (reader.readyState === 2) {
            setImagesPreview((old) => [...old, reader.result]);
            setImages((old) => [...old, reader.result]);
          }
        };

        reader.readAsDataURL(file);
      }
    });
  };

  const handleAddSize = () => {
    setSizes([...sizes, { name: "", stock: "" }]);
  };

  const handleRemoveSize = (index) => {
    const updatedSizes = [...sizes];
    updatedSizes.splice(index, 1);
    setSizes(updatedSizes);
  };

  const handleSizeChange = (index, e) => {
    const { name, value } = e.target;
    const updatedSizes = [...sizes];
    updatedSizes[index] = {
      ...updatedSizes[index],
      [name]: name === "stock" ? parseInt(value) : value,
    };
    setSizes(updatedSizes);
  };

  const updateProductSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", productName);
    myForm.set("description", productDescription);
    myForm.set("price", productPrice);
    myForm.set("discountedPrice", productDiscountedPrice);
    myForm.set("discountPercent", productDiscountPercent);
    myForm.set("stock", productStock);
    myForm.set("category", productCategory);
    myForm.set("color", productColor);

    sizes.forEach((size, index) => {
      myForm.append(`sizes[${index}][name]`, size.name);
      myForm.append(`sizes[${index}][stock]`, size.stock);
    });

    images.forEach((image) => {
      myForm.append("images", image);
    });
    dispatch(updateProduct(productId, myForm));
  };

  return (
    <>
      {detailsLoading ? (
        <Loader />
      ) : (
        <div className=" my-3">
          <div className=" flex flex-col gap-2 bg-white rounded-md border-2 p-4">
            <h1 className=" text-3xl text-center font-bold">UPDATE PRODUCT</h1>
            <form
              className=" flex flex-col gap-2"
              encType="multipart/form-data"
              onSubmit={updateProductSubmitHandler}
            >
              <div className=" bg-[#f5f5f5] flex flex-col gap-1 p-2 rounded-md border-2 ">
                <label className=" text-lg font-medium">Product Name</label>
                <input
                  className=" p-1 border-2 outline-none"
                  type="text"
                  placeholder="Enter Product Name"
                  required
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                />
              </div>
              <div className=" bg-[#f5f5f5] flex flex-col gap-1 p-2 rounded-md border-2 ">
                <label className=" text-lg font-medium">
                  Product Description
                </label>
                <textarea
                  className=" p-1 border-2 outline-none"
                  rows={5}
                  type="text"
                  placeholder="Enter Product Description"
                  required
                  value={productDescription}
                  onChange={(e) => setProductDescription(e.target.value)}
                />
              </div>
              <div className=" grid xl:grid-flow-col gap-3">
                <div className=" bg-[#f5f5f5] flex flex-col gap-1 p-2 rounded-md border-2 ">
                  <label className=" text-lg font-medium">Product Price</label>
                  <input
                    className=" p-1 border-2 outline-none"
                    type="number"
                    placeholder="Enter Product Price"
                    required
                    value={productPrice}
                    onChange={(e) => setProductPrice(e.target.value)}
                  />
                </div>
                <div className=" bg-[#f5f5f5] flex flex-col gap-1 p-2 rounded-md border-2 ">
                  <label className=" text-lg font-medium">
                    Product DiscountedPrice
                  </label>
                  <input
                    className=" p-1 border-2 outline-none"
                    type="number"
                    placeholder="Enter Product DiscountedPrice"
                    required
                    value={productDiscountedPrice}
                    onChange={(e) => setProductDiscountedPrice(e.target.value)}
                  />
                </div>
                <div className=" bg-[#f5f5f5] flex flex-col gap-1 p-2 rounded-md border-2 ">
                  <label className=" text-lg font-medium">
                    Product DiscountPercent
                  </label>
                  <input
                    className=" p-1 border-2 outline-none"
                    type="number"
                    placeholder="Enter Product DiscountPercent"
                    required
                    value={productDiscountPercent}
                    onChange={(e) => setProductDiscountPercent(e.target.value)}
                  />
                </div>
              </div>

              {/*  */}

              <div className=" bg-[#f5f5f5] flex flex-col gap-1 p-2 rounded-md border-2 ">
                <select
                  value={productCategory}
                  className=" p-1 border-2 outline-none"
                  onChange={(e) => setProductCategory(e.target.value)}
                >
                  <option value="">Choose Category</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div className=" grid xl:grid-flow-col gap-3">
                <div className=" bg-[#f5f5f5] flex flex-col gap-1 p-2 rounded-md border-2 ">
                  <label className=" text-lg font-medium">Product Color</label>
                  <input
                    className=" p-1 border-2 outline-none"
                    type="text"
                    placeholder="Enter Product Color"
                    required
                    value={productColor}
                    onChange={(e) => setProductColor(e.target.value)}
                  />
                </div>
                <div className=" bg-[#f5f5f5] flex flex-col gap-1 p-2 rounded-md border-2 ">
                  <label className=" text-lg font-medium">Product Stock</label>
                  <input
                    className=" p-1 border-2 outline-none"
                    type="text"
                    placeholder="Enter Product Stock"
                    required
                    value={productStock}
                    onChange={(e) => setProductStock(e.target.value)}
                  />
                </div>
              </div>

              <div className=" bg-[#f5f5f5] flex flex-col gap-1 p-2 rounded-md border-2 ">
                <label className=" text-lg font-medium">ADD SIZES</label>
                {sizes.map((size, index) => (
                  <div
                    key={index}
                    className=" grid lg:grid-flow-col items-center gap-3"
                  >
                    <div className=" flex flex-col gap-2">
                      <label className=" text-sm font-medium">Size Name</label>
                      <input
                        className=" p-1 border-2 outline-none"
                        type="text"
                        placeholder="Enter Size Name"
                        value={size.name}
                        onChange={(e) => handleSizeChange(index, e)}
                        name="name"
                      />
                    </div>
                    <div className=" flex flex-col gap-2">
                      <label className=" text-sm font-medium">Size Stock</label>
                      <input
                        className=" p-1 border-2 outline-none"
                        type="number"
                        placeholder="Enter Size Stock"
                        value={size.stock}
                        onChange={(e) => handleSizeChange(index, e)}
                        name="stock"
                      />
                    </div>
                    {index > 0 && (
                      <div className=" flex flex-col gap-2">
                        <button
                          className=" w-[10rem] p-1 rounded-md bg-[#141414] text-white"
                          type="button"
                          onClick={() => handleRemoveSize(index)}
                        >
                          Remove
                        </button>
                      </div>
                    )}
                  </div>
                ))}
                <input
                  className=" w-[20rem] mt-2 py-1 bg-[#141414] text-white rounded-md font-medium cursor-pointer"
                  type="button"
                  value="Add Size"
                  onClick={handleAddSize}
                />

                <div>
                  <h3>Added Sizes:</h3>
                  {sizes.map((size, index) => (
                    <div key={index}>
                      <span>{`Size: ${size.name}, Stock: ${size.stock}`}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className=" bg-[#f5f5f5] flex flex-col gap-1 p-2 rounded-md border-2 ">
                <label className=" text-lg font-medium">
                  Select Product Images
                </label>
                <input
                  className=" file:h-[2rem] rounded-md file:bg-[#141414] file:text-white file:border-none file:cursor-pointer file:hover:bg-[#eddb8e] file:hover:text-black font-medium"
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={updateProductImagesChange}
                />
              </div>
              <div className=" w-full flex gap-2 overflow-x-auto">
                {oldImages &&
                  oldImages.map((image, i) => (
                    <img
                      key={i}
                      src={image.url}
                      alt="OldproductImg"
                      className=" w-[5rem] object-cover"
                    />
                  ))}
              </div>

              <div className=" w-full flex gap-2 overflow-x-auto">
                {imagesPreview.map((image, i) => (
                  <img
                    key={i}
                    src={image}
                    alt="productImg"
                    className=" w-[5rem] object-cover"
                  />
                ))}
              </div>

              <div>
                <input
                  className=" cursor-pointer w-full mt-2 py-1.5 bg-[#141414] hover:bg-[#eddb8e] hover:text-black text-white rounded-md font-medium"
                  type="submit"
                  value="Update Product"
                  disabled={loading ? true : false}
                />
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default UpdateProduct;
