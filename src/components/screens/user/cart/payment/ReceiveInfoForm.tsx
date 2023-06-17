import { FormInput, FormSelect } from "~/components";
import { TControl } from "~/types/field";
import data from "../../../../../utils/Address.json";

type TProps = TControl<TUserPayment> & {
  getValuesAddress: any;
  addressWatch: any;
  addressControl: any;
};

export const ReceiveInfoForm: React.FC<TProps> = ({
  control,
  addressControl,
  addressWatch,
}) => {
  const allw = addressWatch();
  return (
    <div className="grid grid-cols-2 gap-4 tableBox mb-4">
      <h2 className="col-span-2 text-[#141046] font-semibold !mb-0">
        Thông tin nhận hàng
      </h2>
      <FormInput
        name="FullName"
        placeholder="Nhập họ và tên"
        control={control}
        label="Họ và tên"
        inputContainerClassName=""
        rules={{ required: "Vui lòng điền thông tin!" }}
      />
      <FormInput
        name="Phone"
        placeholder="Nhập số điện thoại"
        control={control}
        label="Số điện thoại"
        inputContainerClassName=""
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
      <FormSelect
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
      />
    </div>
  );
};
