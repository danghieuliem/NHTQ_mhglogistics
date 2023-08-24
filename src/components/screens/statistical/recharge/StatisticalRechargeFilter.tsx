import React, { useRef } from "react";
import { ActionButton, FilterInput, FilterRangeDate, FilterSelect } from "~/components";
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
    <div className="grid grid-cols-1 gap-2">
      <FilterInput
        id="username"
        name="username"
        placeholder="Nhập username"
        label="Username"
        handleSearch={(val: string) => {
          username.current = val;
        }}
      />
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
      <FilterRangeDate
        handleDate={(val: string[]) => {
          fromDate.current = val[0];
          toDate.current = val[1];
        }}
        placeholder="Từ ngày/đến ngày"
        format="DD/MM/YYYY"
      />
      <div className="col-span-1 flex items-end justify-end mt-4">
        <ActionButton
          onClick={() =>
            handleFilter(
              username.current,
              bankId.current,
              fromDate.current,
              toDate.current
            )
          }
          icon="fas fa-filter"
          title="Lọc"
          isButton
          isButtonClassName="bg-green !text-white"
        />
      </div>
    </div>
  );
};
