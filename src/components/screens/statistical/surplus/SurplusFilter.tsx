import React from "react";
import { FilterSelect } from "~/components";
import { typeOfUserData } from "~/configs/appConfigs";
import { _format } from "~/utils";

type TProps = {
  handleFilter: (typeOfUser: number) => void;
  totalWallet: number;
};

export const SurplusFilter: React.FC<TProps> = ({
  handleFilter,
  totalWallet,
}) => {
  return (
    <div className="flex items-center justify-between">
      <div className="w-[300px]">
        <FilterSelect
          data={typeOfUserData}
          isClearable
          placeholder="Chọn loại user"
          label="Loại user"
          handleSearch={(val: number) => {
            handleFilter(val);
          }}
        />
      </div>
      <div className="text-lg py-4">
        <span className="text-base">Tổng số dư:</span>
        <span className="text-main font-bold">
          {" "}
          {_format.getVND(totalWallet)}
        </span>
      </div>
    </div>
  );
};
