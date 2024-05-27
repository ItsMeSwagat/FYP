import React, { useState } from "react";

const Accordion = ({ title, answer }) => {
  const [accordionOpen, setAccordionOpen] = useState(false);
  return (
    <div className=" grid py-2">
      <button
        onClick={() => setAccordionOpen(!accordionOpen)}
        className=" flex items-center justify-between w-full"
      >
        <span className=" text-xs md:text-lg lg:text-xl xl:text-2xl font-medium">{title}</span>
        {accordionOpen ? <span className=" text-xl lg:text-3xl">-</span> : <span className=" text-xl lg:text-3xl">+</span>}
      </button>

      <div
        className={`grid overflow-hidden transition-all duration-300 ease-in-out text-sm ${
          accordionOpen
            ? " grid-rows-[1fr] opacity-100"
            : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className=" overflow-hidden text-xs md:text-sm lg:text-lg text-justify">{answer}</div>
      </div>
    </div>
  );
};

export default Accordion;
