import React, { useRef } from "react";
import { FilterSelect } from "~/components";
import { IconButton } from "~/components/globals/button/IconButton";
import { typeOfUserData } from "~/configs/appConfigs";

type TProps = {
  handleFilter: (typeOfUser: number) => void;
};

export const SurplusFilter: React.FC<TProps> = ({ handleFilter }) => {
  const typeOfUser = useRef<number>(null);

  return (
    <div className="flex items-end">
      <div className="max-w-md w-full mb-4 lg:mb-0">
        <FilterSelect
          data={typeOfUserData}
          placeholder="Chọn loại user"
          label="Loại user"
          handleSearch={(val: number) => {
            typeOfUser.current = val;
          }}
        />
      </div>
      <IconButton
        onClick={() => handleFilter(typeOfUser.current)}
        btnClass="ml-4"
        btnIconClass="!mr-2"
        icon="fas fa-filter"
        title="Lọc"
        showLoading
        toolip="Lọc kết quả"
      />
    </div>
  );
};
