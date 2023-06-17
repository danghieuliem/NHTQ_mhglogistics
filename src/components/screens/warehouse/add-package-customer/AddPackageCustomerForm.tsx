import { Tooltip } from "antd";
import { differenceWith, isEqual } from "lodash";
import router from "next/router";
import React from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { smallPackage, user } from "~/api";
import { FormInput, FormSelect, showToast } from "~/components";
import { useDeepEffect } from "~/hooks";
import { useCatalogue } from "~/hooks/useCatalogue";
import { selectUser, useAppSelector } from "~/store";
import { AddPackageCustomerTable } from "./AddPackageCustomerTable";

let newKey = new Date().getTime().toString();

type TForm = TWarehouseVN & TAddtionalFieldWarehouse;

export const AddPackageCustomerForm = () => {
  const { user: userStore } = useAppSelector(selectUser);
  if (!userStore) return null;

  const { warehouseTQ, warehouseVN, shippingTypeToWarehouse } = useCatalogue({
    warehouseTQEnabled: !!userStore,
    warehouseVNEnabled: !!userStore,
    shippingTypeToWarehouseEnabled: !!userStore,
  });

  const { control, handleSubmit, getValues, reset } = useForm<TForm>({
    mode: "onBlur",
  });

  const { data } = useQuery(
    "clientData",
    () =>
      user.getList({
        PageIndex: 1,
        PageSize: 1000000,
        OrderBy: "Id desc",
      }),
    {
      select: (data) => data.Data.Items,
    }
  );

  useDeepEffect(() => {
    reset({
      AssignUID: 0,
      WareHouseFromId: 0,
      WareHouseId: 0,
      ShippingTypeId: 0,
    });
  }, [warehouseTQ, warehouseVN, shippingTypeToWarehouse]);

  const {
    control: controlArray,
    watch: watchArray,
    setValue: setValueArray,
    handleSubmit: handleSubmitArray,
    unregister: unregisterArray,
  } = useForm<{ [key: string]: TWarehouseVN[] }>({
    mode: "onBlur",
  });

  const handleData = (newData: TWarehouseVN[], key: string) => {
    if (!Object.keys(watchArray()).length) {
      setValueArray(key, newData);
    } else {
      if (watchArray().hasOwnProperty(key)) {
        const diffData = differenceWith(
          [...newData.map((item) => item.Id)],
          [...watchArray(key).map((item) => item.Id)],
          isEqual
        );
        if (!!diffData.length) {
          setValueArray(key, [
            ...newData.filter((item) => !!diffData.find((x) => item.Id === x)),
            ...watchArray(key),
          ]);
        } else {
          alert("Mã này đã scan rồi!");
        }
      } else {
        setValueArray(key, newData);
      }
    }
  };

  const queryClient = useQueryClient();
  const _onCreate = async (newData: TWarehouseVN) => {
    try {
      const res = await queryClient.fetchQuery(
        [
          "smallPackageList",
          {
            PageIndex: 1,
            PageSize: 1,
            Menu: 0,
            SearchContent: newData.OrderTransactionCode.trim(),
          },
        ],
        () =>
          smallPackage
            .getByTransactionCode({
              TransactionCode: newData.OrderTransactionCode.trim(),
              IsAssign: true,
            })
            .then((res) => res.Data)
      );

      handleData(
        res?.map((item) => ({
          ...item,
          // Status: ESmallPackageStatusData.ArrivedToVietNamWarehouse,
          // Status: 2,
        })),
        newKey
      );
    } catch (error) {
      toast.info("Không tìm thấy thông tin kiện này");
    }
    reset();
  };

  const mutationUpdate = useMutation(smallPackage.update, {
    onSuccess: () => {
      toast.success("Gán kiện thành công");
    },
    onError: (error) =>
      showToast({
        title: (error as any)?.response?.data?.ResultCode,
        message: (error as any)?.response?.data?.ResultMessage,
        type: "error",
      }),
  });

  const _onHide = (data: TWarehouseVN[]) => {
    const newData = watchArray(newKey).filter(
      (item) => !data.find((x) => x.Id === item.Id)
    );
    if (!!newData.length) {
      setValueArray(newKey, newData);
    } else {
      unregisterArray(newKey);
    }
  };

  const _onPress = async (data: TWarehouseVN[]) => {
    console.log(data);
    if (
      !getValues("AssignUID") ||
      !getValues("WareHouseId") ||
      !getValues("WareHouseFromId") ||
      !getValues("ShippingTypeId")
    ) {
      toast.warn(
        "Vui lòng chọn UserName, Kho TQ, Kho VN, Phương thức vận chuyển!"
      );
      return;
    } else {
      try {
        await mutationUpdate.mutateAsync(
          data.map((item) => ({
            ...item,
            IsAssign: true,
            AssignType: 2,
            AssignUID: getValues("AssignUID"),
            WareHouseId: getValues("WareHouseId"),
            WareHouseFromId: getValues("WareHouseFromId"),
            ShippingTypeId: getValues("ShippingTypeId"),
          }))
        );
        router.push("/manager/deposit/deposit-list");
      } catch (error) {}
    }
  };
  return (
    <React.Fragment>
      <div className="">
        <div className="max-w-[500px]">
          <FormInput
            control={control}
            name="OrderTransactionCode"
            placeholder="Nhập mã vận đơn"
            label="Nhập mã vận đơn"
            inputClassName="barcode"
            prefix={
              <Tooltip placement="topLeft" title={"Open barcode!"}>
                <div className="pl-2">
                  <i className="fas fa-barcode text-2xl"></i>
                </div>
              </Tooltip>
            }
            rules={{ required: "This field is required" }}
            onEnter={handleSubmit(_onCreate)}
          />
        </div>
        {!!Object.keys(watchArray()).length && (
          <div className="grid grid-cols-2 gap-4 pt-4 mt-4 border-t border-[#cccccc]">
            <div className="col-span-1 flex items-center">
              <div className="w-full">
                <FormSelect
                  control={control}
                  name="AssignUID"
                  placeholder="Chọn UserName"
                  label="Username"
                  data={data}
                  isClearable
                  select={{ label: "UserName", value: "Id" }}
                />
              </div>
            </div>
            <div className="col-span-1 flex items-center">
              <div className="w-full">
                <FormSelect
                  control={control}
                  name="WareHouseFromId"
                  placeholder="Chọn kho Trung Quốc"
                  data={warehouseTQ}
                  isClearable
                  label="Kho Trung Quốc"
                  select={{ label: "Name", value: "Id" }}
                />
              </div>
            </div>
            <div className="col-span-1 flex items-center">
              <div className="w-full">
                <FormSelect
                  control={control}
                  name="WareHouseId"
                  placeholder="Chọn kho Việt Nam"
                  isClearable
                  data={warehouseVN}
                  label="Kho Việt Nam"
                  select={{ label: "Name", value: "Id" }}
                  required={true}
                />
              </div>
            </div>
            <div className="col-span-1 flex items-center">
              <div className="w-full">
                <FormSelect
                  control={control}
                  name="ShippingTypeId"
                  placeholder="Chọn phương thức vận chuyển"
                  data={shippingTypeToWarehouse}
                  isClearable
                  label="Phương thức vận chuyển"
                  select={{ label: "Name", value: "Id" }}
                />
              </div>
            </div>
          </div>
        )}
      </div>
      {!!Object.keys(watchArray()).length &&
        Object.keys(watchArray()).map((key) => (
          <AddPackageCustomerTable
            data={watchArray(key)}
            name={key}
            key={key}
            handleSubmit={handleSubmitArray}
            onPress={_onPress}
            onHide={_onHide}
            control={controlArray}
          />
        ))}
    </React.Fragment>
  );
};
