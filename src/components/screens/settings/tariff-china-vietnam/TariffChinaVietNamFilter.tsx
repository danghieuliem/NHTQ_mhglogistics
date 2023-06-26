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

export const TariffChinaVietNamFilter: FC<TProps> = (props) => {
  const { handleSubmit, reset, control } = useForm<TFilterWareHouseFee>({
    defaultValues: {
      WarehouseFromId: null,
      WarehouseId: null,
      ShippingTypeToWareHouseId: null,
      IsHelpMoving: null,
    },
    mode: "onBlur",
  });

  const _onFilter = (data: TFilterWareHouseFee) => {
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
    <div className="w-fit ml-auto">
      <Popover
        placement="bottomLeft"
        trigger={"click"}
        content={
          <div className="grid grid-cols-2 gap-4 !p-4">
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
            <div className="col-span-1">
              <IconButton
                onClick={handleSubmit(_onFilter)}
                icon="fas fa-filter"
                title="Lọc"
                showLoading
                btnClass="mr-2"
                toolip="Lọc"
              />
            </div>
          </div>
        }
      >
        <IconButton
          icon="fas fa-filter"
          title="Lọc"
          showLoading
          btnClass="mr-2"
          toolip="Bộ lọc"
        />
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
