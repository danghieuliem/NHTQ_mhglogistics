import { FormInput, FormSelect } from "~/components";
import { TControl } from "~/types/field";
import data from "../../../../../utils/Address.json";
import { Card, Divider } from "antd";

type TProps = TControl<TUserPayment> & {
  control: any;
  // getValuesAddress: any;
  // addressWatch: any;
  // addressControl: any;
};

export const ReceiveInfoForm: React.FC<TProps> = ({ control }) => {
  return (
      <div className="grid grid-cols-2 gap-3 bg-[#EBF4FE] p-4 rounded-[6px]">
        <span className="col-span-2 text-[#1582F5] text-[18px] font-bold">Thông tin nhận hàng</span>
        <Divider className="!my-2 col-span-2"/>
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
          name="Adrress"
          placeholder="Nhập địa chỉ nhận hàng"
          control={control}
          label="Địa chỉ nhận hàng"
          inputContainerClassName="col-span-2"
          rules={{ required: "Vui lòng điền thông tin!" }}
        />
        {/* <FormSelect
        control={addressControl}
        name="districts"
        label="Tỉnh"
        placeholder="Chọn tỉnh"
        data={data?.data.map((add) => ({
          name: add.name,
          id: add.name,
        }))}
      />
      <FormSelect
        control={addressControl}
        name="city"
        label="Thành phố/Quận"
        placeholder="Chọn thành phố"
        data={data.data
          .find((x) => x.name === allw.districts)
          ?.districts.map((y) => ({ name: y.name, id: y.name }))}
      />
      <FormInput
        control={addressControl}
        name="address"
        placeholder=""
        label="Địa chỉ"
        inputContainerClassName="col-span-2"
        rules={{ required: "Vui lòng điền thông tin!" }}
      /> */}
      </div>
  );
};
