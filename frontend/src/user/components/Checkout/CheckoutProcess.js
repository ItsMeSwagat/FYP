import React, { Fragment } from "react";
import { FaShippingFast } from "react-icons/fa";
import { GiConfirmed } from "react-icons/gi";
import { MdOutlinePayment, MdConfirmationNumber } from "react-icons/md";
import { Stepper, Step, StepLabel } from "@mui/material";

const CheckoutProcess = ({ activeProcess }) => {
  const process = [
    {
      label: "Shipping Details",
      icon: <FaShippingFast size={25} />,
    },
    {
      label: "Confirm Order",
      icon: <GiConfirmed size={25} />,
    },
    {
      label: "Payment",
      icon: <MdOutlinePayment size={25} />,
    },
    {
      label: "Completed",
      icon: <MdConfirmationNumber size={25} />,
    },
  ];

  return (
    <Fragment>
      <div className=" px-[8rem] pt-[2rem]">
        <Stepper activeStep={activeProcess} alternativeLabel>
          {process.map((item, i) => (
            <Step
              key={i}
              active={activeProcess === i ? true : false}
              completed={activeProcess >= i ? true : false}
            >
              <StepLabel
                style={{ color: activeProcess >= i ? "#eddb8e" : "" }}
                icon={item.icon}
              >
                {item.label}
              </StepLabel>
            </Step>
          ))}
        </Stepper>
      </div>
    </Fragment>
  );
};

export default CheckoutProcess;
