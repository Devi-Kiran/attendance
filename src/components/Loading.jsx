import React from "react";
import { InfinitySpin } from "react-loader-spinner";

function Loading() {
  return (
    <>
      <div style={{ height: "50vh" }} className="flex justify-center items-center">
      <InfinitySpin
        visible={true}
        width="200"
        color="#4F46E5"
        ariaLabel="infinity-spin-loading"
        />
      </div>
    </>
  );
}

export default Loading;
