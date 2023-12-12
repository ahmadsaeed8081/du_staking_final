import React from "react";
import { ThreeCircles } from "react-loader-spinner";

const Loader = () => {
  return (
    <div className="loader-cmp flex items-center absolute h-full w-full">
      {/* <div className="lds-dual-ring"></div> */}
      <ThreeCircles
        height="80"
        width="80"
        color="#a465fc"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        ariaLabel="three-circles-rotating"
        outerCircleColor=""
        innerCircleColor=""
        middleCircleColor=""
      />
    </div>
  );
};

export default Loader;
