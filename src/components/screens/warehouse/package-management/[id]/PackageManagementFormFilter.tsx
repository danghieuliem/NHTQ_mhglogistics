import { Skeleton, Tooltip } from "antd";
import React from "react";
import { FilterInput } from "~/components/globals/filterBase";

type TProps = {
  handleFilter: (code: string) => void;
  loading: boolean;
};

export const PackageManagementFormFilter: React.FC<TProps> = ({
  handleFilter,
  loading,
}) => {
  return (
    <div className="flex max-w-[500px]">
      <Skeleton
        loading={loading}
        title={false}
        paragraph={{ rows: 1, width: "100%" }}
      >
        <FilterInput
          placeholder="Mã vận đơn"
          id="code"
          name="cde"
          inputClassName="barcode"
          handleSubmit={handleFilter}
        />
      </Skeleton>
    </div>
  );
};
