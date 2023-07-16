import { Card, Switch } from "antd";
import clsx from "clsx";
import React, { useState } from "react";
import { FormDate, FormInput, FormSelect, FormTextarea } from "~/components";
import { IconButton } from "~/components/globals/button/IconButton";
import { genderData } from "~/configs";
import { useCatalogue } from "~/hooks/useCatalogue";
import { _format } from "~/utils";
import { EUnique, checkUnique, createComplain } from "../../auth/method";


export const InfoUserForm: React.FC<any> = ({
  data,
  control,
  onPress,
  handleSubmit,
  loading,
  getValues,
  reset,
  oriEmail,
  oriPhone,
}) => {
  const {
    warehouseVN,
    shippingTypeToWarehouse,
    warehouseTQ,
    userOrder,
    userSale,
  } = useCatalogue({
    warehouseVNEnabled: true,
    shippingTypeToWarehouseEnabled: true,
    warehouseTQEnabled: true,
    userOrderEnabled: true,
    userSaleEnabled: true,
  });

  console.log(warehouseTQ);

  const [changePass, setChangePass] = useState(false);
  const [showPass, setShowPass] = useState(false);

  return (
    <div className="mt-6">
      <div className="flex justify-between items-end mb-6">
        <div className="font-bold text-md sm:text-xl">
          <p>THÔNG TIN TÀI KHOẢN</p>
        </div>
        <IconButton
          onClick={handleSubmit(onPress)}
          btnClass="!bg-main hover:!bg-sec shadow-lg"
          icon={"fas fa-check"}
          btnIconClass="!mr-2"
          title="Cập nhật"
          disabled={loading}
        />
      </div>
      <div className="grid grid-cols-12 gap-4">
        <Card
          title="Thông tin cá nhân"
          className="h-fit tableBox col-span-12 sm:col-span-6 md:col-span-4"
          headStyle={{ fontWeight: "bold" }}
        >
          <div className="grid grid-cols-2 gap-2 h-fit">
            <div className="col-span-2">
              <FormInput
                control={control}
                name="UserName"
                label="Username"
                placeholder=""
                disabled
                required={false}
              />
            </div>
            <div className="col-span-2">
              <FormInput
                control={control}
                name="FullName"
                label="Họ & tên của bạn"
                placeholder=""
                required={false}
              />
            </div>
            <div className="md:col-span-2 lg:col-span-1">
              <FormSelect
                control={control}
                label="Giới tính"
                placeholder=""
                name="Gender"
                data={genderData}
                select={{ label: "Name", value: "Id" }}
                defaultValue={genderData?.[data?.Gender]}
                required={false}
                selectContainerClassName="md:w-full lg:w-3/4"
              />
            </div>
            <div className="md:col-span-2 lg:col-span-1">
              <FormDate
                control={control}
                label="Ngày sinh"
                placeholder=""
                name="Birthday"
                required={false}
              />
            </div>
            {/* Quên mật khẩu */}
            <div className="col-span-2 grid grid-cols-2 gap-4 mt-[12px] pt-[12px] border-t border-gray">
              <div className="md:col-span-2 lg:col-span-1 relative">
                <FormInput
                  control={control}
                  name="PasswordNew"
                  label="Mật khẩu mới"
                  type={showPass ? "text" : "password"}
                  placeholder=""
                  required={changePass}
                  disabled={!changePass}
                  suffix={
                    <div
                      className="show-pass"
                      onClick={() => setShowPass(!showPass)}
                    >
                      <i
                        className={clsx(
                          !showPass ? "fas fa-eye-slash" : "fas fa-eye"
                        )}
                      ></i>
                    </div>
                  }
                  rules={
                    changePass
                      ? {
                          minLength: {
                            value: 8,
                            message: "Mật khẩu ít nhất 8 kí tự",
                          },
                          validate: {
                            check: (value) => {
                              const check = _format.checkUserNameVNese(
                                value.trim()
                              );

                              if (value.trim() === "") {
                                return "Vui lòng điền mật khẩu";
                              }

                              if (value.trim().includes(" ")) {
                                return "Mật khẩu không chứa khoảng trắng giữa 2 chữ!";
                              }
                              if (check) {
                                return "Mật khẩu không được chứa Tiếng Việt";
                              }
                            },
                          },
                        }
                      : {}
                  }
                />
              </div>
              <div className="md:col-span-2 lg:col-span-1">
                <FormInput
                  control={control}
                  name="PasswordAgain"
                  label="Nhập lại mật khẩu"
                  placeholder=""
                  type={showPass ? "text" : "password"}
                  required={changePass}
                  disabled={!changePass}
                  rules={
                    changePass
                      ? {
                          required: "Vui lòng xác nhận mật khẩu..",
                          validate: {
                            checkEqualPassword: (value) => {
                              const check = _format.checkUserNameVNese(value);

                              if (value.trim() === "") {
                                return "Vui lòng điền mật khẩu";
                              }

                              if (value.trim().includes(" ")) {
                                return "Mật khẩu không chứa khoảng trắng giữa 2 chữ!";
                              }
                              if (check) {
                                return "Mật khẩu không được chứa Tiếng Việt";
                              }
                              return (
                                getValues("PasswordNew") === value.trim() ||
                                createComplain()
                              );
                            },
                          },
                        }
                      : {}
                  }
                />
              </div>
              <div className="col-span-2 flex items-center justify-end">
                <label className="mr-3">Đổi mật khẩu?</label>
                <Switch
                  size="small"
                  onChange={() => {
                    setChangePass(!changePass);
                    reset();
                  }}
                />
              </div>
            </div>
          </div>
        </Card>

        <Card
          title="Thông tin liên hệ"
          className="h-fit tableBox col-span-12 sm:col-span-6 md:col-span-4"
          headStyle={{ fontWeight: "bold" }}
        >
          <div className="grid grid-cols-2 gap-2">
            <div className="col-span-2">
              <FormInput
                control={control}
                name="Phone"
                label="Số điện thoại"
                placeholder=""
                rules={{
                  required: "Vui lòng điền số điện thoại..",
                  pattern: {
                    value:
                      /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/,
                    message: "Sđt không đúng định dạng",
                  },
                  validate: {
                    check: (value) => {
                      if (value !== oriPhone.current) {
                        return checkUnique(value.trim(), EUnique.phone);
                      } else return;
                    },
                  },
                }}
              />
            </div>
            <div className="col-span-2">
              <FormInput
                control={control}
                name="Email"
                label="Địa chỉ Email"
                placeholder=""
                rules={{
                  required: "Vui lòng điền email..",
                  pattern: {
                    value: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                    message: "email không đúng định dạng",
                  },
                  validate: {
                    check: (value) => {
                      if (value !== oriEmail.current) {
                        return checkUnique(value, EUnique.email);
                      } else return;
                    },
                  },
                }}
              />
            </div>
            <div className="col-span-2">
              <FormTextarea
                control={control}
                // autoSize={{minRows: 2, maxRows: }}
                name="Address"
                label="Địa chỉ"
                placeholder=""
                rows={2}
                required={false}
              />
            </div>
          </div>
        </Card>

        <Card
          title="Thông tin đơn hàng"
          className="h-fit tableBox col-span-12 sm:col-span-6 md:col-span-4"
          headStyle={{ fontWeight: "bold" }}
        >
          <div className="grid grid-cols-2 gap-2">
            <div className="col-span-2">
              <FormSelect
                control={control}
                name="WarehouseFrom"
                label="Kho Trung Quốc"
                placeholder="Vui lòng chọn"
                required={false}
                isClearable
                isLoading={warehouseTQ === undefined}
                data={warehouseTQ}
                select={{ label: "Name", value: "Id" }}
                defaultValue={warehouseTQ?.find(
                  (x) => x.Id === data?.WarehouseFrom
                )}
              />
            </div>
            <div className="col-span-2">
              <FormSelect
                control={control}
                label="Kho Việt Nam"
                // isLoading={wareh}
                placeholder="Vui lòng chọn"
                isClearable
                select={{ label: "Name", value: "Id" }}
                name="WarehouseTo"
                isLoading={warehouseVN === undefined}
                required={false}
                data={warehouseVN}
                defaultValue={warehouseVN?.find(
                  (x) => x.Id === data?.WarehouseTo
                )}
              />
            </div>
            <div className="col-span-2">
              <FormSelect
                control={control}
                name="ShippingType"
                label="Hình Thức VC"
                placeholder="Vui lòng chọn"
                isClearable
                required={false}
                isLoading={shippingTypeToWarehouse === undefined}
                data={shippingTypeToWarehouse}
                select={{ label: "Name", value: "Id" }}
                defaultValue={shippingTypeToWarehouse?.find(
                  (x) => x.Id === data?.ShippingType
                )}
              />
            </div>
            <div className="col-span-2">
              <FormSelect
                control={control}
                placeholder=""
                name="DatHangId"
                label="Nhân viên đặt hàng"
                data={[]}
                disabled
                required={false}
                select={{ label: "UserName", value: "Id" }}
                defaultValue={{
                  UserName:
                    userOrder?.find((item) => item.Id === data?.DatHangId)
                      ?.UserName ?? "Chưa có",
                  Id: data?.DatHangId ?? 0,
                }}
              />
            </div>
            <div className="col-span-2">
              <FormSelect
                control={control}
                placeholder=""
                name="SaleId"
                label="Nhân viên kinh doanh"
                data={[]}
                required={false}
                select={{ label: "UserName", value: "Id" }}
                disabled
                defaultValue={{
                  UserName:
                    userSale?.find((item) => item.Id === data?.SaleId)
                      ?.UserName ?? "Chưa có",
                  Id: data?.SaleId ?? 0,
                }}
              />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
