import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Country, State, City } from "country-state-city";
import CheckoutProcess from "./CheckoutProcess";
import { saveShippingDetails } from "../../../actions/cartAction";
import { toast } from "react-toastify";

const ShippingDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { shippingDetails } = useSelector((state) => state.cart);
  const { cart } = useSelector((state) => ({
    cart: state.cart.cart,
  }));

  const [address, setAddress] = useState("");
  const [name, setName] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [phoneNo, setPhoneNo] = useState("");

  const [prevaddress, setPrevAddress] = useState(shippingDetails.address);
  const [prevname, setPrevName] = useState(shippingDetails.name);
  const [prevstate, setPrevState] = useState(shippingDetails.state);
  const [prevcity, setPrevCity] = useState(shippingDetails.city);
  const [prevphoneNo, setPrevPhoneNo] = useState(shippingDetails.phoneNo);

  const [country, setCountry] = useState(Country.getCountryByCode("NP"));

  const handleCopy = () => {
    setName(shippingDetails.name);
    setState(shippingDetails.state);
    setCity(shippingDetails.city);
    setAddress(shippingDetails.address);
    setPhoneNo(shippingDetails.phoneNo);
    toast.success("Shipping Details Copied Successfully");
  };

  const ShippingDetailsHandler = () => {
    dispatch(saveShippingDetails({ name, state, city, address, phoneNo }));
    navigate("/confirmorder");
  };

  const isEmptyCart =
    !cart?.cart?.cartItems || cart?.cart?.cartItems?.length === 0;

  if (isEmptyCart) {
    navigate("/"); // Navigate to home page
    return null;
  }

  return (
    <>
      <CheckoutProcess activeProcess={0} />
      <div className=" px-[1rem] md:px-[2rem] lg:px-[2rem] xl:px-[8rem] py-[1rem] min-h-[60vh] flex flex-col justify-center items-center">
        <div className=" w-full md:w-[80%] h-full bg-white border-2 shadow-lg rounded-lg flex flex-col justify-center items-center p-4">
          {/* <h1 className=" text-4xl font-medium">Shipping Details</h1> */}

          <div className=" w-full flex flex-col md:flex-row justify-around">
            <form
              className="  md:w-[50%] h-full m-4 flex flex-col gap-3"
              encType="multipart/form-data"
              onSubmit={ShippingDetailsHandler}
            >
              <div className=" flex flex-col gap-2">
                <label className=" text-lg">Enter Name</label>
                <input
                  className=" bg-[#f5f5f5] w-full h-10 rounded-md border-2 pl-2 outline-none"
                  type="text"
                  placeholder="Enter Name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className=" flex flex-col gap-2">
                <label className=" text-lg">Select State</label>
                <select
                  className=" bg-[#f5f5f5] w-full h-10 rounded-md border-2 pl-2 outline-none"
                  required
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                >
                  <option>State</option>
                  {country &&
                    State.getStatesOfCountry(country.isoCode).map((item) => (
                      <option key={item.isoCode} value={item.name}>
                        {item.name}
                      </option>
                    ))}
                </select>
              </div>
              <div className=" flex flex-col gap-2">
                <label className=" text-lg">Enter City</label>
                <input
                  className=" bg-[#f5f5f5] w-full h-10 rounded-md border-2 pl-2 outline-none"
                  type="text"
                  placeholder="Enter City"
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>
              <div className=" flex flex-col gap-2">
                <label className=" text-lg">Enter Address</label>
                <input
                  className=" bg-[#f5f5f5] w-full h-10 rounded-md border-2 pl-2 outline-none"
                  type="text"
                  placeholder="Enter Address"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
              <div className=" flex flex-col gap-2">
                <label className=" text-lg">Enter PhoneNo</label>
                <input
                  className=" bg-[#f5f5f5] w-full h-10 rounded-md border-2 pl-2 outline-none"
                  type="number"
                  placeholder="Enter PhoneNumber"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  required
                  value={phoneNo}
                  onChange={(e) => setPhoneNo(e.target.value)}
                />
              </div>
              <div className="w-full mt-2">
                <input
                  className=" cursor-pointer w-full bg-[#141414] text-white font-semibold text-xl py-1.5 rounded-[10px] hover:bg-[#eddb8e] hover:text-black"
                  type="submit"
                  value="Continue"
                />
              </div>
            </form>

            <div className=" m-4">
              <h1 className=" text-lg md:text-2xl font-medium">
                {" "}
                Previous Shipping Detail
              </h1>
              {shippingDetails && Object.keys(shippingDetails).length > 0 && (
                <div className=" py-4">
                  <div className=" bg-[#f5f5f5] border-2 text-xs md:text-sm flex flex-col gap-2 p-2 rounded-md">
                    <p>{prevname}</p>
                    <p>{prevstate}</p>
                    <p>{prevcity}</p>
                    <p>{prevaddress}</p>
                    <p>{prevphoneNo}</p>
                  </div>
                  <button
                    onClick={handleCopy}
                    className=" mt-3 bg-[#141414] text-white font-medium px-3 py-1 rounded-md hover:bg-[#eddb8e] hover:text-black cursor-pointer"
                  >
                    Copy Details
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShippingDetails;
