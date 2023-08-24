import { Modal, Spin, Tooltip } from "antd";
import { differenceWith, isEqual } from "lodash";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { bigPackage, smallPackage } from "~/api";
import { FormInput, FormSelect, HookWrapper, IconButton } from "~/components";
import { toast } from "~/components/toast";
import { ESmallPackageStatusData } from "~/configs/appConfigs";
import { usePressKeyboard } from "~/hooks";
import {
  CheckWarehouseChinaNewBagForm,
  CheckWarehouseChinaNewCodeForm,
  CheckWarehouseChinaTable,
} from ".";

let newKey = new Date().getTime().toString();
type TForm = {
  [name: string]: TWarehouseCN[];
};

export const CheckWarehouseChinaForm = () => {
  const [bigPackages, setBigPackages] = useState([]);

  const queryClient = useQueryClient();
  const { isFetching, refetch } = useQuery(
    "bigPackageList",
    () =>
      bigPackage.getList({
        PageIndex: 1,
        PageSize: 1000000,
        OrderBy: "Id desc",
        Status: 1,
      }),
    {
      onSuccess: (data) => {
        setBigPackages(data?.Data?.Items);
      },
      onError: toast.error,
    }
  );

  const [loading, setLoading] = useState(false);
  const { control, handleSubmit, getValues, reset, resetField, setValue } =
    useForm<TWarehouseCN>({
      mode: "onBlur",
      defaultValues: {
        OrderTransactionCode: "",
      },
    });

  const [modalPackage, setModalPackage] = useState(false);
  const [modalCode, setModalCode] = useState(false);
  const newOrderTransactionCode = useRef<string>();

  const {
    control: controlArray,
    handleSubmit: handleSubmitArray,
    setValue: setValueArray,
    getValues: getValuesArray,
    watch: watchArray,
    unregister: unregisterArray,
  } = useForm<TForm>({
    mode: "onBlur",
  });

  const mutationAddOrderTransactionCode = useMutation(smallPackage.create, {
    onSuccess: (data) => {
      handleData(data.Data, data.Data[0].UserName + data.Data[0].Phone);
    },
  });

  const handleData = (newData: TWarehouseCN[], key: string) => {
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
          Modal.confirm({
            title: "Thông báo!",
            content: "Mã này đã scan rồi, bạn có muốn tạo thêm kiện?",
            onOk() {
              mutationAddOrderTransactionCode.mutateAsync({
                OrderTransactionCode: newData[0].OrderTransactionCode,
                IsWarehouseTQ: true,
              });
            },
          });
        } else {
          setValueArray(key, [
            ...newData.filter((item) => !!diffData.find((x) => x === item.Id)),
            ...watchArray(key),
          ]);
        }
      } else {
        setValueArray(key, newData);
      }
    }
  };

  const _onCreate = (newData: TWarehouseCN) => {
    setLoading(true);
    queryClient.fetchQuery(["barCodeCN", newData.OrderTransactionCode], () =>
      smallPackage
        .getByTransactionCode({
          TransactionCode: newData.OrderTransactionCode.trim(),
        })
        .then((res) => {
          if (res.Data[0].Status === 4) {
            toast.info("Đơn hàng đã HỦY!");
            return;
          }

          if (res.Data[0].Status === 5) {
            toast.info("Đơn hàng đã được giao!");
            return;
          }

          if (res.Data[0].Status === 1 || res.Data[0].Status === 2) {
            let key = res.Data[0].UserName + res.Data[0].Phone;

            handleData(
              res.Data.map((item) => ({
                ...item,
                BigPackageId: item?.BigPackageId
                  ? item?.BigPackageId
                  : getValues("BigPackageId"),
                Status:
                  item.Status <= ESmallPackageStatusData.ArrivedToChinaWarehouse
                    ? ESmallPackageStatusData.ArrivedToChinaWarehouse
                    : item.Status,
              })),
              key
            );
          } else {
            toast.warning("Đơn đã về kho VN, vui lòng kiểm tra tại kho VN!");
          }
          resetField("OrderTransactionCode");
        })
        .catch((error) => {
          Modal.confirm({
            title: "Thông báo!",
            content: "Kiện hàng này chưa có, bạn muốn thêm mới kiện này?",
            onOk() {
              newOrderTransactionCode.current = newData.OrderTransactionCode;
              setModalCode(true);
            },
          });
        })
        .finally(() => setLoading(false))
    );
  };

  const mutationUpdate = useMutation(smallPackage.update);

  const _onPress = async (data: TWarehouseCN[]) => {
    if (Object.keys(data).length) {
      data.forEach((d) => {
        d.VolumePayment = (d.Height * d.Width * d.Length) / 1000000;
      });
      mutationUpdate
        .mutateAsync(data)
        .then((res) => {
          toast.success("Cập nhật đơn kiện thành công");
        })
        .catch((error) => {
          toast.error((error as any)?.response?.data?.ResultMessage);
        });
    } else {
      toast.warning("Hiện tại chưa có mã kiện, vui lòng quét mã kiện trước");
    }
  };

  const _onHide = (key: string, item?: TWarehouseCN) => {
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

  return (
    <Spin
      spinning={
        loading ||
        mutationUpdate.isLoading ||
        mutationAddOrderTransactionCode.isLoading
      }
    >
      <div className="grid grid-cols-4 gap-4">
        <div className="tableBox col-span-3 h-fit">
          <div className="grid grid-cols-4 gap-4">
            <div className="col-span-3 grid grid-cols-3 gap-2">
              <FormSelect
                control={control}
                name="BigPackageId"
                isLoading={isFetching}
                placeholder="Chọn bao lớn"
                data={bigPackages}
                select={{
                  label: "Name",
                  value: "Id",
                }}
                selectContainerClassName="col-span-2"
                required={false}
                callback={(val) => {
                  setValue("BigPackageId", val);
                }}
              />
              <div className="col-span-1 flex items-center">
                <HookWrapper
                  hookList={[
                    () => {
                      usePressKeyboard(
                        [
                          {
                            keyList: ["Control", "b"],
                            cb: () => setModalPackage(true),
                          },
                        ],
                        {}
                      );
                    },
                  ]}
                >
                  <IconButton
                    onClick={() => setModalPackage(true)}
                    icon="fas fa-plus-circle"
                    title="Tạo mới"
                    toolip=""
                    btnClass="h-fit w-fit"
                  />
                </HookWrapper>
              </div>
            </div>
            <div className="col-span-3 grid grid-cols-3 gap-2">
              <FormInput
                control={control}
                name="OrderTransactionCode"
                placeholder="Nhập mã vận đơn"
                inputClassName="barcode"
                prefix={
                  <Tooltip placement="topLeft" title={"Open barcode!"}>
                    <i className="fas fa-barcode !text-sec"></i>
                  </Tooltip>
                }
                onEnter={handleSubmit(_onCreate)}
                rules={{
                  required: "Vui lòng nhập mã vận đơn!",
                }}
                inputContainerClassName="col-span-2"
              />
              <div className="col-span-1 flex items-center">
                <IconButton
                  onClick={handleSubmit(_onCreate)}
                  btnClass="h-fit"
                  icon="fas fa-barcode-read"
                  title="Quét mã"
                  toolip=""
                />
              </div>
            </div>
          </div>

          {!!Object.keys(watchArray()).length && (
            <div className="mt-4">
              <HookWrapper
                hookList={[
                  () => {
                    usePressKeyboard(
                      [
                        {
                          keyList: ["Control", "q"],
                          cb: handleSubmitArray((data) =>
                            _onPress(
                              Object.values(data).reduce(
                                (prev, cur) => [...prev, ...cur],
                                []
                              )
                            )
                          ),
                        },
                      ],
                      {}
                    );
                  },
                ]}
              >
                <IconButton
                  icon="fas fa-edit"
                  title="Cập nhật tất cả kiện"
                  btnClass="mr-4 mb-4 xl:mb-0"
                  onClick={handleSubmitArray((data) =>
                    _onPress(
                      Object.values(data).reduce(
                        (prev, cur) => [...prev, ...cur],
                        []
                      )
                    )
                  )}
                  toolip=""
                />
              </HookWrapper>
              {/* <HookWrapper
                  hookList={[
                    () => {
                      usePressKeyboard(
                        [
                          {
                            keyList: ["Control", "m"],
                            cb: () => setModalCode(true),
                          },
                        ],
                        {}
                      );
                    },
                  ]}
                >
                  <IconButton
                    icon="fas fa-plus-circle"
                    title="Thêm mã kiện (Ctrl + M)"
                    onClick={() => setModalCode(true)}
                    toolip=""
                  />
                </HookWrapper> */}
            </div>
          )}
        </div>

        <div className="tableBox col-span-1">
          <p className="font-bold">Phím tắt: </p>
          <p>Ctrl + B: Tạo bao mới</p>
          <p>Ctrl + Q: Cập nhật tất cả các kiện</p>
          <p>Enter: Quét mã vận đơn</p>
        </div>
      </div>

      <div>
        <CheckWarehouseChinaNewBagForm
          visible={modalPackage}
          refetch={refetch}
          onCancel={() => setModalPackage(false)}
        />
        <CheckWarehouseChinaNewCodeForm
          visible={modalCode}
          onCancel={() => setModalCode(false)}
          newOrderTransactionCode={newOrderTransactionCode.current}
          handleData={(newData: TWarehouseCN[], key: string) =>
            handleData(newData, key)
          }
        />
        {!!Object.keys(watchArray()).length &&
          Object.keys(watchArray())
            .reverse()
            .map((key) => (
              <CheckWarehouseChinaTable
                data={watchArray(key)}
                name={key}
                key={key}
                handleSubmit={handleSubmitArray}
                onPress={_onPress}
                onHide={_onHide}
                control={controlArray}
                onIsLost={null}
                bigPackageList={bigPackages || []}
                defaultIdBigPackageSelected={getValues("BigPackageId")}
              />
            ))}
      </div>
    </Spin>
  );
};
