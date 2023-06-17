import React from "react";
import Lottie from "react-lottie";
import * as loading from "~/assets/json/loading.json";

export const Loading = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: loading,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className="fixed inset-0 w-full h-full z-[999999] bg-white flex items-center justify-center">
      <Lottie options={defaultOptions} height={400} width={400} />
    </div>
  );
};
