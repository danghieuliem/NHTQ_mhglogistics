import { Spin, Tooltip } from "antd";
import Modal from "antd/lib/modal/Modal";
import { differenceWith, isEqual } from "lodash";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { smallPackage } from "~/api";
import { FormInput } from "~/components";
import { IconButton } from "~/components/globals/button/IconButton";
import { toast } from "~/components/toast";
import { ESmallPackage } from "~/configs";
import {
  EOrderTypeStatusData,
  EPermission,
  controllerList,
} from "~/configs/appConfigs";
import { usePressKeyboard } from "~/hooks";
import { selectIsAcceptRoles, useAppSelector } from "~/store";
import { CheckWarehouseChinaTable } from "../check-warehouse-china";
import { CheckWarehouseVietNamAssign1 } from "./CheckWarehouseVietNamAssign1";
import { CheckWarehouseVietNamAssign2 } from "./CheckWarehouseVietNamAssign2";

let newKey = new Date().getTime().toString();

type TForm = {
  [key: string]: TWarehouseVN[];
};

export const CheckWarehouseVietNamForm = ({ type }) => {
  const { handleSubmit, control, reset, resetField } = useForm<TWarehouseVN>({
    mode: "onBlur",
    defaultValues: {
      OrderTransactionCode: "",
    },
  });
  const { confirm }: any = Modal;

  const nameRef = useRef(null);

  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);
  const item = useRef<TWarehouseVN>();
  const modalType = useRef<"assign1" | "assign2">("assign1");
  const [modalAssign1, setModalAssign1] = useState(false);
  const [modalAssign2, setModalAssign2] = useState(false);

  const {
    control: controlArray,
    watch: watchArray,
    setValue: setValueArray,
    handleSubmit: handleSubmitArray,
    unregister: unregisterArray,
  } = useForm<TForm>({
    mode: "onBlur",
  });

  const mutationAddOrderTransactionCode = useMutation(smallPackage.create, {
    onSuccess: (data) => {
      handleData(data.Data, data.Data[0].UserName + data.Data[0].Phone);
    },
  });

  const handleData = (newData: TWarehouseVN[], key: string) => {
    key = !!key.length ? key : newKey;
    if (!Object.keys(watchArray()).length) {
      setValueArray(key, newData);
    } else {
      if (watchArray().hasOwnProperty(key)) {
        const diffData = differenceWith(
          [...newData.map((item) => item.Id)],
          [...watchArray(key).map((item) => item.Id)],
          isEqual
        );

        if (!diffData.length) {
          if (newData.length > 1) {
            toast.warning("Bạn đã quét bao hàng này rồi");
          } else if (newData.length === 1) {
            if (newData[0].OrderType === EOrderTypeStatusData.Transper) {
              toast.warning("Bạn đã quét đơn hàng ký gửi này rồi");
            } else if (newData[0].OrderType === EOrderTypeStatusData.Buy) {
              console.log("object");
              if (type === "toWarehouseVN") {
                confirm({
                  title: "Thông báo!",
                  content: "Mã này đã scan rồi, bạn có muốn tạo thêm kiện?",
                  onOk() {
                    mutationAddOrderTransactionCode.mutateAsync({
                      OrderTransactionCode:
                        newData[0].OrderTransactionCode.trim(),
                      IsWarehouseVN: true,
                    });
                  },
                });
              } else {
                toast.warning("Vui lòng quét kiện này tại kho TQ trươc!");
              }
            }
          }
        } else {
          setValueArray(key, [
            ...newData.filter((item) => !!diffData.find((x) => item.Id === x)),
            ...watchArray(key),
          ]);
        }
      } else {
        setValueArray(key, newData);
      }
    }
  };

  const _onCreate = async (newData: TWarehouseVN) => {
    try {
      setLoading(true);
      const res = await queryClient.fetchQuery(
        ["barCodeVN", newData.OrderTransactionCode],
        () =>
          smallPackage.getByTransactionCode({
            TransactionCode: newData.OrderTransactionCode.trim(),
          })
      );
      // set data scope
      // ===== begin =====

      // if (res?.Data[0].Status === 1) {
      //   showToast({
      //     title: "Không thể quét mã này!",
      //     message: "Kiện này chưa về kho TQ!",
      //     type: "warning",
      //   });
      //   resetField("OrderTransactionCode");
      //   return;
      // }

      if (res.Data[0].Status === ESmallPackage.DaHuy) {
        toast.error("Đơn nãy đã hủy!");
        resetField("OrderTransactionCode");
        return;
      }

      if (res.Data[0].Status === ESmallPackage.DaGiao) {
        toast.error("Đơn nãy đã giao khách!");
        resetField("OrderTransactionCode");
        return;
      }

      let key = res.Data[0].Phone;
      handleData(
        res.Data.map((item) => ({
          ...item,
          Status:
            item.Status <= ESmallPackage.VeKhoVN
              ? type === "toWarehouseVN"
                ? ESmallPackage.VeKhoVN
                : ESmallPackage.XuatKhoTQ
              : item.Status,
        })),
        key
      );
      // ===== end =====
    } catch (error) {
      toast.error("Không tìm thấy thông tin kiện này");
    } finally {
      setLoading(false);
    }
    resetField("OrderTransactionCode");
  };

  const mutationUpdate = useMutation(smallPackage.update, {
    onSuccess: () =>
      !modalAssign1 &&
      !modalAssign2 &&
      toast.success("Cập nhật đơn kiện thành công"),
    onError: toast.error,
  });

  const mutationUpdateLost = useMutation(smallPackage.updateIsLost, {
    onSuccess: () => toast.success("Cập nhật kiện thất lạc thành công"),
    onError: toast.error,
  });

  const _onPress = async (
    data: (TWarehouseVN & Partial<TAddtionalFieldWarehouse>)[]
  ) => {
    try {
      if (Object.keys(data).length) {
        try {
          data.forEach((d) => {
            d.VolumePayment = (d.Height * d.Width * d.Length) / 1000000;
          });

          // if (data[0]?.OrderType === 3) {
          //   const key: string = nameRef.current.name;
          //   // _onHide(nameRef.current.name, nameRef.current.record)
          // }

          await mutationUpdate.mutateAsync(data).then(() => {
            _onCreate(nameRef.current.record);
          });

          setModalAssign1(false);
          setModalAssign2(false);
        } catch (error) {}
      } else {
        toast.warning("Hiện tại chưa có mã kiện, vui lòng quét mã kiện trước");
      }
    } catch (error) {}
  };

  const _onHide = (key: string, item?: TWarehouseVN | TWarehouseVN[]) => {
    if (Array.isArray(item)) {
      unregisterArray(key);
    } else {
      let currentListOfKey = watchArray(key);
      currentListOfKey = currentListOfKey.filter((x) => x.Id !== item.Id);

      if (!currentListOfKey.length) {
        unregisterArray(key);
      } else {
        setValueArray(key, currentListOfKey);
      }
    }
  };

  const _onIsLost = (item?: TWarehouseVN[]) => {
    confirm({
      title: "Thông báo!",
      content: "Bạn muốn báo thất lạc kiện này?",
      onOk() {
        mutationUpdateLost.mutateAsync(item[0].Id);
      },
    });
  };

  const handleAssign = (
    data?: TWarehouseVN,
    type: "assign1" | "assign2" = "assign1",
    name?: string,
    record?: any
  ) => {
    if (data) {
      item.current = data;
    } else {
      item.current = undefined;
    }

    nameRef.current = {
      name: name,
      record: record,
    };

    if (type === "assign1") {
      modalType.current = "assign1";
      setModalAssign1(true);
    } else {
      modalType.current = "assign2";
      setModalAssign2(true);
    }
    // _onPress([data]);
    // item.current =
  };

  const canUpdateTatCaCacKien = useAppSelector(
    selectIsAcceptRoles({
      controller: controllerList.SmallPackage,
      permissionsRequired: [EPermission.Update],
    })
  );

  usePressKeyboard(
    [
      {
        keyList: ["Control", "q"],
        cb: handleSubmitArray((data) =>
          _onPress(
            Object.values(data).reduce((prev, cur) => [...prev, ...cur], [])
          )
        ),
      },
    ],
    { enabled: canUpdateTatCaCacKien }
  );

  return (
    <Spin
      spinning={
        loading ||
        mutationAddOrderTransactionCode.isLoading ||
        mutationUpdate.isLoading
      }
    >
      <div className="tableBox grid grid-cols-4 gap-4">
        <div className="col-span-2">
          <FormInput
            control={control}
            name="OrderTransactionCode"
            placeholder="Nhập mã vận đơn hoặc mã bao hàng"
            inputClassName="barcode"
            prefix={
              <Tooltip placement="topLeft" title={"Open barcode!"}>
                <i className="fas fa-barcode"></i>
              </Tooltip>
            }
            rules={{
              required: "This field is required",
            }}
            onEnter={handleSubmit((data) => _onCreate(data))}
          />
        </div>
        <div className="col-span-1 flex items-end">
          <IconButton
            onClick={handleSubmit((data) => _onCreate(data))}
            icon="fas fa-barcode-read"
            title="Quét mã (Enter)"
            toolip=""
          />
        </div>
        {!!Object.keys(watchArray()).length && (
          <div className="col-span-4 flex items-end">
            <IconButton
              onClick={handleSubmitArray((data) =>
                _onPress(
                  Object.values(data).reduce(
                    (prev, cur) => [...prev, ...cur],
                    []
                  )
                )
              )}
              icon="fas fa-pencil"
              title="Cập nhật tất cả kiện"
              toolip=""
            />
          </div>
        )}
      </div>

      {!!Object.keys(watchArray()).length &&
        Object.keys(watchArray()).map((key) => (
          <CheckWarehouseChinaTable
            key={key}
            type="vietnam"
            data={watchArray(key)}
            name={key}
            handleSubmit={handleSubmitArray}
            handleAssign={handleAssign}
            onPress={_onPress}
            onHide={_onHide}
            control={controlArray}
            onIsLost={_onIsLost}
            setValue={setValueArray}
          />
        ))}

      {/* modal của gán đơn cho khách mua hộ */}
      <CheckWarehouseVietNamAssign1
        item={item.current}
        visible={modalAssign1 && modalType.current === "assign1"}
        onCancel={() => setModalAssign1(false)}
        onPress={_onPress}
      />

      {/* modal của gán đơn cho khách ký gửi */}
      <CheckWarehouseVietNamAssign2
        item={item.current}
        visible={modalAssign2 && modalType.current === "assign2"}
        onCancel={() => setModalAssign2(false)}
        onPress={_onPress}
      />
    </Spin>
  );
};
