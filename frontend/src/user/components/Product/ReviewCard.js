import { Rating } from "@mui/material";
import React from "react";

const ReviewCard = ({ review }) => {
  const options = {
    value: review.rating,
    readOnly: true,
    precision: 0.5,
  };

  return (
    <div className=" flex-shrink-0 bg-[#f5f5f5] w-[30rem] min-h-[10rem] flex flex-col gap-[2rem] rounded-md border-2 p-4">
      <div className=" flex flex-col gap-1">
        <p className=" font-medium">{review.name}(User)</p>
        <Rating {...options} />
      </div>
      <span className="reviewCardComment">{review.comment}</span>
    </div>
  );
};

export default ReviewCard;
