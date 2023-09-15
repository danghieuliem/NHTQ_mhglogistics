import { FormInput, FormSelect } from "~/components";
import { TControl } from "~/types/field";

type TProps = TControl<TUserPayment> & {
  control: any;
  // getValuesAddress: any;
  // addressWatch: any;
  // addressControl: any;
  warehouseTQ?: TBaseReponseParams[];
  warehouseVN?: TBaseReponseParams[];
  shippingTypeToWarehouse?: TBaseReponseParams[];
  userPayment: any;
};

export const ReceiveInfoForm: React.FC<TProps> = ({
  control,
  warehouseTQ,
  warehouseVN,
  shippingTypeToWarehouse,
  userPayment,
}) => {
  return (
    <div className="col-span-8 grid grid-cols-2 gap-2">
      <span className="col-span-2 text-[#1582F5] text-[18px] font-bold">
        Thông tin nhận hàng
      </span>
      <div className="col-span-8 grid grid-cols-3 gap-2 h-fit">
        <div className="col-span-1">
          <FormSelect
            data={warehouseTQ}
            select={{ label: "Name", value: "Id" }}
            name={`WarehouseTQ`}
            label="Kho Trung Quốc"
            defaultValue={warehouseTQ?.find(
              (x) => x.Id === Number(userPayment?.Data?.WarehouseFrom)
            )}
            placeholder="Kho TQ"
            control={control}
            required={
              !warehouseTQ?.find(
                (x) => x.Id === Number(userPayment?.Data?.WarehouseFrom)
              )
            }
            rules={
              !warehouseTQ?.find(
                (x) => x.Id === Number(userPayment?.Data?.WarehouseFrom)
              )
                ? { required: "Vui lòng chọn Kho TQ" }
                : { required: false }
            }
          />
        </div>
        <div className="col-span-1">
          <FormSelect
            data={warehouseVN}
            select={{ label: "Name", value: "Id" }}
            name={`WarehouseVN`}
            label="Kho Việt Nam"
            placeholder="Kho VN"
            defaultValue={warehouseVN?.find(
              (x) => x.Id === Number(userPayment?.Data?.WarehouseTo)
            )}
            control={control}
            required={
              !warehouseVN?.find(
                (x) => x.Id === Number(userPayment?.Data?.WarehouseTo)
              )
            }
            rules={
              !warehouseVN?.find(
                (x) => x.Id === Number(userPayment?.Data?.WarehouseTo)
              )
                ? { required: "Vui lòng chọn kho VN" }
                : { required: false }
            }
          />
        </div>
        <div className="col-span-1">
          <FormSelect
            data={shippingTypeToWarehouse}
            select={{ label: "Name", value: "Id" }}
            name={`ShippingType`}
            label="Phương thức vận chuyển"
            placeholder="Phương thức vận chuyển"
            defaultValue={shippingTypeToWarehouse?.find(
              (x) => x.Id === Number(userPayment?.Data?.ShippingType)
            )}
            control={control}
            required={
              !shippingTypeToWarehouse?.find(
                (x) => x.Id === Number(userPayment?.Data?.ShippingType)
              )
            }
            rules={
              !shippingTypeToWarehouse?.find(
                (x) => x.Id === Number(userPayment?.Data?.ShippingType)
              )
                ? { required: "Vui lòng chọn PTVC" }
                : { required: false }
            }
          />
        </div>
      </div>
      <div className="col-span-8 grid grid-cols-4 gap-2 h-fit">
        <FormInput
          name="FullName"
          placeholder="Nhập họ và tên"
          control={control}
          label="Họ và tên"
          inputContainerClassName="col-span-2"
          rules={{ required: "Vui lòng điền thông tin!" }}
        />
        <FormInput
          name="Phone"
          placeholder="Nhập số điện thoại"
          control={control}
          label="Số điện thoại"
          inputContainerClassName="col-span-2"
          rules={{ required: "Vui lòng điền thông tin!" }}
        />
        <FormInput
          name="Email"
          placeholder="Nhập email"
          control={control}
          label="Email"
          inputContainerClassName="col-span-2"
          rules={{ required: "Vui lòng điền thông tin!" }}
        />
        <FormInput
          name="Address"
          placeholder="Nhập địa chỉ nhận hàng"
          control={control}
          label="Địa chỉ nhận hàng"
          inputContainerClassName="col-span-2"
          rules={{ required: "Vui lòng điền thông tin!" }}
        />
      </div>
    </div>
  );
};
