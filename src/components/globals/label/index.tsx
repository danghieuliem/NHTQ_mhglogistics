import clsx from "clsx";
import React from "react";

type TProps = {
  label: string;
  required?: boolean;
  className?: string;
};

const index: React.FC<TProps> = ({ label, required = true, className }) => {
  return (
    <label className={clsx("block text-gray-700 text-sm mb-1", className)}>
      {label} {required && <span className="text-red">*</span>}
    </label>
  );
};

export default index;
