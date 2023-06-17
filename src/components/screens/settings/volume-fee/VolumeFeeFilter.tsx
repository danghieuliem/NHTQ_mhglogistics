import { FC } from "react";
import { useForm } from "react-hook-form";
import { useQuery } from "react-query";
import { shipping, warehouseFrom, warehouseTo } from "~/api";
import { FormSelect } from "~/components";
import { IconButton } from "~/components/globals/button/IconButton";
import { categoryData } from "~/configs";

type TProps = {
  handleFilter: (newFilter) => void;
  handleAddStaff: () => void;
};

export const VolumeFeeFilter: FC<TProps> = (props) => {
  const { handleSubmit, reset, control } = useForm<TFilterVolumeFee>({
    defaultValues: {
      WarehouseFromId: null,
      WarehouseId: null,
      ShippingTypeToWareHouseId: null,
      IsHelpMoving: null,
    },
    mode: "onBlur",
  });

  const _onFilter = (data: TFilterVolumeFee) => {
    props.handleFilter({ ...data });
  };

  const { data: wareHouse } = useQuery(["warehouseTo"], () =>
    warehouseTo
      .getList({
        PageSize: 999999,
        PageIndex: 1,
      })
      .then((res) => res.Data.Items)
  );

  const { data: wareHouseFrom } = useQuery(["warehouseFrom"], () =>
    warehouseFrom
      .getList({
        PageSize: 999999,
        PageIndex: 1,
      })
      .then((res) => res.Data.Items)
  );

  const { data: shippingType } = useQuery(
    ["shippingType"],
    () =>
      shipping
        .getList({
          PageSize: 999999,
          PageIndex: 1,
        })
        .then((res) => res.Data.Items),
    {
      retry: false,
    }
  );

  return (
    <div className="flex items-end relative justify-between w-full pb-6 md:flex-col">
      <div className="grid grid-cols-5 gap-2 !w-[88%] md:!w-full">
        <div className="col-span-1">
          <FormSelect
            isClearable={true}
            data={wareHouseFrom}
            control={control}
            name="WarehouseFromId"
            placeholder="Kho Trung Quốc"
            select={{ label: "Name", value: "Id" }}
            label="Kho Trung Quốc"
            required={false}
          />
        </div>
        <div className="col-span-1">
          <FormSelect
            isClearable={true}
            data={wareHouse}
            control={control}
            name="WarehouseId"
            placeholder="Kho Việt Nam"
            select={{ label: "Name", value: "Id" }}
            label="Kho Việt Nam"
            required={false}
          />
        </div>
        <div className="col-span-1">
          <FormSelect
            isClearable={true}
            data={shippingType}
            control={control}
            name="ShippingTypeToWareHouseId"
            placeholder="Hình thức v/c"
            select={{ label: "Name", value: "Id" }}
            label="Hình thức vận chuyển"
            required={false}
          />
        </div>
        <div className="col-span-1">
          <FormSelect
            isClearable={true}
            control={control}
            name="IsHelpMoving"
            data={categoryData}
            select={{ label: "Name", value: "Id" }}
            placeholder="Loại đơn hàng"
            label="Loại đơn hàng"
            required={false}
          />
        </div>
        <div className="col-span-1 flex items-end">
          <IconButton
            onClick={handleSubmit(_onFilter)}
            icon="fas fa-filter"
            title="Lọc"
            btnClass="!mr-4 md:text-[12px] xl:text-[16px]"
            showLoading
            toolip="Lọc"
          />
          <IconButton
            onClick={props.handleAddStaff}
            title="Thêm"
            icon="fas fa-plus"
            showLoading
            toolip="Thêm phí TQ-VN"
            btnClass="md:text-[12px] xl:text-[16px]"
            green
          />
        </div>
      </div>
    </div>
  );
};
