import { TablePaginationConfig, Tooltip } from "antd";
import { differenceWith, isEqual } from "lodash";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useQuery, useQueryClient } from "react-query";
import { smallPackage, user } from "~/api";
import { FormInput, FormSelect, toast } from "~/components";
import { IconButton } from "~/components/globals/button/IconButton";
import {
  ESmallPackageStatusData,
  defaultPagination,
} from "~/configs/appConfigs";
import { RequestedDepositOutstockModal } from "./RequestedDepositOutstockModal";
import { RequestedDepositOutstockTable } from "./RequestedDepositOutstockTable";

type TProps = {
  type: "request" | "non-request";
};

const newKey = new Date().getTime().toString();

export const RequestedDepositOutstockForm: React.FC<TProps> = ({ type }) => {
  const { control, handleSubmit, getValues, reset } =
    useForm<TRequestDepositOutstock>({
      mode: "onBlur",
    });

  const {
    setValue: setValueArray,
    unregister: unregisterArray,
    control: controlArray,
    watch: watchArray,
    reset: resetArray,
  } = useForm<{ [key: string]: TSmallPackage[] }>();

  const handleData = (newData: TSmallPackage[], key: string) => {
    key = !!key.length ? key : newKey;
    if (!Object.keys(watchArray()).length) {
      setValueArray(key, newData);
    } else {
      if (watchArray().hasOwnProperty(key)) {
        const diffData: number[] = differenceWith(
          [...newData.map((item) => item.Id)],
          [...watchArray(key).map((item) => item.Id)],
          isEqual
        );

        if (!diffData.length) {
          alert("Bạn đã quét kiện này rồi");
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

  const [pagination, setPagination] =
    useState<TablePaginationConfig>(defaultPagination);

  const { isFetching, data } = useQuery(
    [
      "clientData",
      { Current: pagination.current, PageSize: pagination.pageSize },
    ],
    () =>
      user
        .getList({
          PageIndex: pagination.current,
          PageSize: 1000000,
          OrderBy: "Id desc",
        })
        .then((res) => res.Data),
    {
      refetchOnWindowFocus: false,
      onSuccess: (data) =>
        setPagination({ ...pagination, total: data?.TotalItem }),
      onError: toast.error,
    }
  );
  const queryClient = useQueryClient();
  const _onPress = async (newData: TRequestDepositOutstock) => {
    try {
      const res: TResponse<TSmallPackage[]> = await queryClient.fetchQuery(
        ["getExportForBarCode", newData.OrderTransactionCode, newData.UID],
        () =>
          smallPackage.getExportForBarcode({
            UID: newData.UID,
            Barcode: newData.OrderTransactionCode,
            StatusType: type === "non-request" ? 1 : 2,
          })
      );

      let key = res.Data[0].UserName;
      handleData(
        res.Data.map((item) => ({ ...item, Checked: true })),
        key
      );
    } catch (error) {
      if (type === "non-request") {
        alert("Không tìm thấy thông tin kiện này");
      } else {
        toast.error((error as any)?.response?.data?.ResultMessage);
      }
    }
    reset();
  };

  const _onHide = (key: string, item: TSmallPackage | TSmallPackage[]) => {
    if (Array.isArray(item)) {
      if (
        confirm(
          `Bạn muốn ẩn tất cả kiện của ${watchArray(key)[0].UserName}?`
        ) == true
      ) {
        unregisterArray(key);
      }
    } else {
      if (confirm("Bạn muốn ẩn kiện này?") == true) {
        let currentListOfKey = watchArray(key);
        currentListOfKey = currentListOfKey.filter((x) => x.Id !== item.Id);
        if (!currentListOfKey.length) {
          unregisterArray(key);
        } else {
          setValueArray(key, currentListOfKey);
        }
      }
    }
  };

  const _onGetPackage = async (newData: TRequestDepositOutstock) => {
    try {
      const res: TResponse<TSmallPackage[]> = await queryClient.fetchQuery(
        ["getExportForUsername", newData.UID],
        () =>
          smallPackage.getExportForUsername({
            UID: newData.UID,
            StatusType: type === "non-request" ? 1 : 2,
            OrderType: 2,
          })
      );

      let key = res.Data[0].UserName;
      handleData(
        res.Data.map((item) => ({ ...item, Checked: false })),
        key
      );
    } catch (error) {
      if (type === "non-request") {
        alert("Không tìm thấy thông tin kiện này");
      } else {
        alert((error as any)?.response?.data?.ResultMessage);
      }
    }
    reset();
  };

  const _onNonRequestExport = async () => {
    if (
      !!Object.keys(watchArray()).length &&
      Object.keys(watchArray()).find(
        (key) =>
          !!watchArray(key).find(
            (x) => x.Status != ESmallPackageStatusData.ArrivedToVietNamWarehouse
          )
      )
    ) {
      alert(
        "Chưa có kiện nào để xuất. Bạn phải scan kiện hàng trong danh sách bên dưới để xuất!"
      );
    } else {
      setModal(true);
    }
  };

  const _onRequestExport = async () => {};

  const [modal, setModal] = useState(false);

  return (
    <React.Fragment>
      <div className="grid grid-cols-1 gap-4 max-w-[500px] px-4">
        <div className="col-span-1">
          <FormSelect
            control={control}
            name="UID"
            select={{ label: "UserName", value: "Id" }}
            placeholder="Chọn username"
            data={data?.Items}
            rules={{ required: "This field is required" }}
            isLoading={isFetching}
          />
        </div>
        <div className="col-span-1">
          <FormInput
            control={control}
            name="OrderTransactionCode"
            placeholder="Nhập mã vận đơn"
            inputClassName="barcode"
            onEnter={handleSubmit(_onPress)}
            prefix={
              <Tooltip placement="topLeft" title={"Open barcode!"}>
                <div className="pl-2">
                  <i className="fas fa-barcode text-2xl"></i>
                </div>
              </Tooltip>
            }
          />
        </div>
        <div className="col-span-1">
          <IconButton
            onClick={handleSubmit(_onGetPackage)}
            btnClass={"mr-4"}
            icon="fas fa-hand-holding-box "
            title="Lấy kiện"
            showLoading
            toolip=""
          />
          {!!Object.keys(watchArray()).length &&
            Object.keys(watchArray()).find(
              (key) =>
                !!watchArray(key).find(
                  (x) =>
                    x.Status ===
                      ESmallPackageStatusData.ArrivedToVietNamWarehouse &&
                    x.Checked === true
                )
            ) && (
              <IconButton
                onClick={
                  type === "non-request"
                    ? _onNonRequestExport
                    : _onRequestExport
                }
                icon="fas fa-boxes"
                title="Xuất kho tất cả kiện"
                showLoading
                toolip=""
              />
            )}
        </div>
      </div>
      {!!Object.keys(watchArray()).length &&
        Object.keys(watchArray()).map((key) => (
          <RequestedDepositOutstockTable
            key={key}
            name={key}
            control={controlArray}
            onHide={_onHide}
          />
        ))}
      {type === "non-request" && (
        <RequestedDepositOutstockModal
          {...{
            visible: modal,
            onCancel: () => setModal(false),
            SmallPackageIds: Object.values(watchArray())
              .map((items) => items.map((item) => item?.Id))
              .reduce((prev, cur) => [...prev, ...cur], []),
          }}
        />
      )}
    </React.Fragment>
  );
};
