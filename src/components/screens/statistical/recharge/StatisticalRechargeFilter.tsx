import React, { useRef } from "react";
import { FilterInput, FilterRangeDate, FilterSelect } from "~/components";
import { IconButton } from "~/components/globals/button/IconButton";
import { useCatalogue } from "~/hooks/useCatalogue";

type TProps = {
  handleFilter: (
    username: string,
    bankId: number,
    fromDate: string,
    toDate: string
  ) => void;
};

export const StatisticalRechargeFilter: React.FC<TProps> = ({
  handleFilter,
}) => {
  const username = useRef<string>(null);
  const bankId = useRef<number>(null);
  const fromDate = useRef<string>(null);
  const toDate = useRef<string>(null);
  const { bank } = useCatalogue({ bankEnabled: true });

  return (
    <div className="grid grid-cols-1 gap-4 mb-4 content-start">
      <div className="col-span-1 lg:mb-0">
        <FilterInput
          id="username"
          name="username"
          placeholder="Nhập username"
          label="Username"
          handleSearch={(val: string) => {
            username.current = val;
          }}
        />
      </div>
      <div className="col-span-1 lg:mb-0">
        <FilterSelect
          isClearable={true}
          data={bank}
          label="Ngân hàng"
          placeholder="Chọn ngân hàng"
          select={{ label: "BankInfo", value: "Id" }}
          handleSearch={(val: number) => {
            bankId.current = val;
          }}
        />
      </div>
      <div className="col-span-1 lg:mb-0">
        <FilterRangeDate
          handleDate={(val: string[]) => {
            fromDate.current = val[0];
            toDate.current = val[1];
          }}
          placeholder="Từ ngày/đến ngày"
          format="DD/MM/YYYY"
        />
      </div>
      <div className="col-span-1 lg:mb-0 flex items-end pb-2">
        <IconButton
          onClick={() =>
            handleFilter(
              username.current,
              bankId.current,
              fromDate.current,
              toDate.current
            )
          }
          btnClass={"mr-4"}
          icon="fas fa-filter"
          title="Lọc"
          showLoading
        />
      </div>
    </div>
  );
};
