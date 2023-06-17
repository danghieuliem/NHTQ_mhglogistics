import React from "react";
import Lottie from "react-lottie";
import * as finding from "~/assets/json/finding.json";

export const Finding = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: finding,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className="bg-white rounded-xl h-[calc(100vh-54px-12px-45px-8px-32px-32px)] flex items-center justify-center">
      <Lottie options={defaultOptions} width="auto" height={300} />
    </div>
  );
};
