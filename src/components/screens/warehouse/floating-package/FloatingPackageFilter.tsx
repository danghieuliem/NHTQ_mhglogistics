import React from "react";
import { FilterInput } from "~/components";

const codeProps = {
  id: "code",
  name: "code",
  placeholder: "Nhập mã vận đơn",
};

export const FloatingPackageFilter = () => {
  return (
    <div className="max-w-[500px] mb-4">
      <FilterInput {...{ ...codeProps, handleSubmit: () => null }} />
    </div>
  );
};
