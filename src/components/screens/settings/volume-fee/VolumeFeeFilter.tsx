import { Popover } from "antd";
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
        Active: true
      })
      .then((res) => res.Data.Items)
  );

  const { data: wareHouseFrom } = useQuery(["warehouseFrom"], () =>
    warehouseFrom
      .getList({
        PageSize: 999999,
        PageIndex: 1,
        Active: true
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
          Active: true
        })
        .then((res) => res.Data.Items),
    {
      retry: false,
    }
  );

  return (
    <div className="ml-auto w-fit">
      <Popover
        trigger={"click"}
        placement="bottomLeft"
        content={
          <div className="p-4 grid grid-cols-2 gap-4">
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
            <div>
              <IconButton
                onClick={handleSubmit(_onFilter)}
                icon="mr-0"
                title="Lọc"
                showLoading
                toolip="Lọc"
              />
            </div>
          </div>
        }
      >
        <IconButton icon="fas fa-filter" title="Bộ lọc" btnClass="mr-2" showLoading toolip="Lọc" />
      </Popover>
      <IconButton
        onClick={props.handleAddStaff}
        title="Thêm"
        icon="fas fa-plus"
        showLoading
        toolip="Thêm phí TQ-VN"
        green
      />
    </div>
  );
};
