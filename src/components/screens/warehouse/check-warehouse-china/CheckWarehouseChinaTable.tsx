import { Divider, Input } from "antd";
import JsBarcode from "jsbarcode";
import Link from "next/link";
import React, { useRef } from "react";
import ReactToPrint, { useReactToPrint } from "react-to-print";
import {
  ActionButton,
  DataTable,
  FormInputNumber,
  FormSelect,
  FormTextarea
} from "~/components";
import { ESmallPackageStatusData } from "~/configs/appConfigs";
import { TControl } from "~/types/field";
import { TColumnsType, TTable } from "~/types/table";

export const CheckWarehouseChinaTable: React.FC<
  TTable<TWarehouseCN> &
    TControl<{ [key: string]: TWarehouseVN[] }> & {
      type?: "china" | "vietnam";
      name: string;
      onPress: (data: (TWarehouseCN | TWarehouseVN)[]) => void;
      onHide: (key: string, item: TWarehouseCN | TWarehouseCN[]) => void;
      handleAssign?: (
        data?: TWarehouseVN,
        type?: "assign1" | "assign2"
      ) => void;
      onIsLost: (item?: any) => void;
      bigPackageList?: TPackage[];
      defaultIdBigPackageSelected?: number;
    }
> = ({
  data,
  name,
  control,
  bigPackageList,
  defaultIdBigPackageSelected,
  handleSubmit,
  onPress,
  onHide,
  handleAssign,
  onIsLost,
  type = "china",
}) => {
  const componentRef = useRef<ReactToPrint>(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  // của trung quốc
  const columns: TColumnsType<TWarehouseCN> = [
    {
      dataIndex: "MainOrderId",
      title: "Đơn hàng",
      width: 80,
      render: (_, record) => {
        let url = "";
        if (record?.OrderType === 3) {
          url = "/404";
        } else {
          url =
            record?.OrderType === 1
              ? `/manager/order/order-list/detail/?id=${record?.MainOrderId}`
              : `/manager/deposit/deposit-list/detail/?id=${record?.TransportationOrderId}`;
        }
        return (
          <div className="flex flex-col items-center justify-end">
            <Link href={url}>
              <a target={"_blank"}>
                {record?.MainOrderId
                  ? record?.MainOrderId
                  : record?.TransportationOrderId}
              </a>
            </Link>
            <div className="text-center">{record?.OrderTypeName}</div>
          </div>
        );
      },
      fixed: "left",
    },
    {
      dataIndex: "IsPackged",
      title: "Dịch vụ",
      render: (_, record) => (
        <div className="flex justify-center flex-col items-center">
          <div className="flex justify-evenly w-full">
            <p className="font-medium">KĐ</p>
            {record.IsCheckProduct ? (
              <i className="fas fa-check-circle text-xl text-success"></i>
            ) : (
              <i className="fas fa-times-circle text-xl text-warning"></i>
            )}
          </div>
          <div className="flex justify-evenly w-full">
            <p className="font-medium">ĐG</p>
            {record.IsPackged ? (
              <i className="fas fa-check-circle text-xl text-success"></i>
            ) : (
              <i className="fas fa-times-circle text-xl text-warning"></i>
            )}
          </div>
          <div className="flex justify-evenly w-full">
            <p className="font-medium">BH</p>
            {record.IsInsurance ? (
              <i className="fas fa-check-circle text-xl text-success"></i>
            ) : (
              <i className="fas fa-times-circle text-xl text-warning"></i>
            )}
          </div>
          <div className="flex justify-evenly w-full">
            <p className="font-medium">GH</p>
            {false ? (
              <i className="fas fa-check-circle text-xl text-success"></i>
            ) : (
              <i className="fas fa-times-circle text-xl text-warning"></i>
            )}
          </div>
        </div>
      ),
      fixed: "left",
    },
    {
      dataIndex: "OrderTransactionCode",
      title: "Mã vận đơn",
      fixed: "left",
    },
    {
      dataIndex: "TotalOrder",
      title: "Kiểm đếm",
      render: (_, record, index) => {
        return (
          <div className="flex flex-col gap-1">
            {record?.OrderType === 2 ? (
              <div>
                Loại: <span className="font-bold">{record?.ProductType}</span>
              </div>
            ) : (
              <div>
                Số loại: <span className="font-bold">{_}</span>
              </div>
            )}

            <div>
              Số lượng:{" "}
              <span className="font-bold">{record?.TotalOrderQuantity}</span>
            </div>
            {/* <FormInput
              control={control}
              name={`${name}.${index}.StaffNoteCheck` as any}
              label="Nv kho check"
              placeholder=""
              onEnter={handleSubmit((data) => onPress([data[name][index]]))}
            /> */}
          </div>
        );
      },
    },
    {
      dataIndex: "Weight",
      title: "Cân nặng (kg)",
      align: "center",
      render: (_, __, index) => (
        <FormInputNumber
          control={control}
          name={`${name}.${index}.Weight` as any}
          placeholder=""
          inputClassName="text-center w-[80px] text-center"
          onEnter={handleSubmit((data) => onPress([data[name][index]]))}
        />
      ),
    },
    {
      dataIndex: "Width",
      title: "Kích thước",
      align: "center",
      render: (_, __, index) => {
        return (
          <div className="flex flex-col gap-1">
            <FormInputNumber
              control={control}
              name={`${name}.${index}.Length` as any}
              placeholder=""
              inputClassName="text-center w-[80px] text-center"
              onEnter={handleSubmit((data) => onPress([data[name][index]]))}
              prefix="D = "
            />
            <FormInputNumber
              control={control}
              name={`${name}.${index}.Width` as any}
              placeholder=""
              inputClassName="text-center w-[80px] text-center"
              onEnter={handleSubmit((data) => onPress([data[name][index]]))}
              prefix="R = "
            />
            <FormInputNumber
              control={control}
              name={`${name}.${index}.Height` as any}
              placeholder=""
              inputClassName="text-center w-[80px] text-center"
              onEnter={handleSubmit((data) => onPress([data[name][index]]))}
              prefix="C = "
            />
            <div className="text-center font-bold">{__?.VolumePayment} m3</div>
          </div>
        );
      },
    },
    {
      dataIndex: "BigPackageId",
      title: () => <div className="text-center">Bao lớn</div>,
      render: (_, record, index) => {
        return (
          <FormSelect
            control={control}
            name={`${name}.${index}.BigPackageId` as any}
            data={bigPackageList}
            defaultValue={
              data[index]?.BigPackageId
                ? {
                    Name: bigPackageList?.filter(
                      (x) => x?.Id === data[index]?.BigPackageId
                    )[0]?.Name,
                    Id: data[index]?.BigPackageId,
                  }
                : {
                    Name: "Chưa chọn bao lớn!",
                    Id: 0,
                  }
            }
            placeholder=""
            select={{ label: "Name", value: "Id" }}
            isClearable
          />
        );
      },
    },
    {
      dataIndex: "Description",
      title: "Ghi chú",
      render: (_, __, index) => (
        <FormTextarea
          control={control}
          name={`${name}.${index}.Description` as any}
          placeholder=""
          rows={3}
          onEnter={handleSubmit((data) => onPress([data[name][index]]))}
        />
      ),
    },
    // {
    //   dataIndex: "UserNote",
    //   title: "Khách ghi chú",
    //   render: (_, __, index) => (
    //     <FormTextarea
    //       control={control}
    //       name={`${name}.${index}.UserNote` as any}
    //       placeholder=""
    //       onEnter={handleSubmit((data) => onPress([data[name][index]]))}
    //     />
    //   ),
    // },
    // {
    //   dataIndex: "IMG",
    //   title: "Hình ảnh",
    //   width: 120,
    //   align: "center",
    //   render: (_, __, index) => (
    //     <FormUpload
    //       control={control}
    //       name={`${name}.${index}.IMG` as any}
    //       image
    //     />
    //   ),
    // },
    {
      dataIndex: "action",
      title: "Thao tác",
      align: "right",
      width: 140,
      render: (_, record, index) => (
        <div className="flex flex-col gap-2">
          {record.Status <= ESmallPackageStatusData.ArrivedToChinaWarehouse && (
            <ActionButton
              icon="fas fa-sync-alt"
              onClick={handleSubmit((data) => onPress([data[name][index]]))}
              title="Cập nhật"
              isButton
              // isButtonClassName="bg-main !text-white"
            />
          )}
          <ActionButton
            icon="fas fa-barcode-read"
            onClick={() => {
              JsBarcode("#barcode", record?.OrderTransactionCode, {
                displayValue: false,
                width: 3,
              });
              handlePrint();
            }}
            title="In barcode"
            isButton
            // isButtonClassName="bg-sec !text-white"
          />
          <ActionButton
            icon="fas fa-eye-slash"
            onClick={() => onHide(name, record)}
            title="Ẩn đi"
            isButton
            // isButtonClassName="bg-red !text-white"
          />
        </div>
      ),
      fixed: "right",
    },
  ];

  // của việt nam
  const columnsVN: TColumnsType<TWarehouseVN> = [
    {
      dataIndex: "MainOrderId",
      title: "Đơn hàng",
      width: 80,
      render: (_, record) => {
        let url = "";
        if (record?.OrderType === 3) {
          url = "/404";
        } else {
          url =
            record?.OrderType === 1
              ? `/manager/order/order-list/detail/?id=${record?.MainOrderId}`
              : `/manager/deposit/deposit-list/detail/?id=${record?.TransportationOrderId}`;
        }
        return (
          <div className="flex flex-col items-center justify-end">
            <Link href={url}>
              <a target={"_blank"}>
                {record?.MainOrderId
                  ? record?.MainOrderId
                  : record?.TransportationOrderId}
              </a>
            </Link>
            <div className="text-center">{record?.OrderTypeName}</div>
          </div>
        );
      },
      fixed: "left",
    },
    {
      dataIndex: "IsPackged",
      title: "Dịch vụ",
      render: (_, record) => (
        <div className="flex justify-center flex-col items-center">
          <div className="flex justify-evenly w-full">
            <p className="font-medium">KĐ</p>
            {record.IsCheckProduct ? (
              <i className="fas fa-check-circle text-xl text-success"></i>
            ) : (
              <i className="fas fa-times-circle text-xl text-warning"></i>
            )}
          </div>
          <div className="flex justify-evenly w-full">
            <p className="font-medium">ĐG</p>
            {record.IsPackged ? (
              <i className="fas fa-check-circle text-xl text-success"></i>
            ) : (
              <i className="fas fa-times-circle text-xl text-warning"></i>
            )}
          </div>
          <div className="flex justify-evenly w-full">
            <p className="font-medium">BH</p>
            {record.IsInsurance ? (
              <i className="fas fa-check-circle text-xl text-success"></i>
            ) : (
              <i className="fas fa-times-circle text-xl text-warning"></i>
            )}
          </div>
          <div className="flex justify-evenly w-full">
            <p className="font-medium">GH</p>
            {false ? (
              <i className="fas fa-check-circle text-xl text-success"></i>
            ) : (
              <i className="fas fa-times-circle text-xl text-warning"></i>
            )}
          </div>
        </div>
      ),
      fixed: "left",
    },
    {
      dataIndex: "OrderTransactionCode",
      title: "Mã vận đơn",
      fixed: "left",
    },
    {
      dataIndex: "TotalOrder",
      title: "Kiểm đếm",
      render: (_, record, index) => {
        return (
          <div className="flex flex-col gap-1">
            {record?.OrderType === 2 ? (
              <div>
                Loại: <span className="font-bold">{record?.ProductType}</span>
              </div>
            ) : (
              <div>
                Số loại: <span className="font-bold">{_}</span>
              </div>
            )}
            <div>
              Số lượng:{" "}
              <span className="font-bold">{record?.TotalOrderQuantity}</span>
            </div>
            {/* <FormInput
              control={control}
              name={`${name}.${index}.StaffNoteCheck` as any}
              label="Nv kho check"
              placeholder=""
              onEnter={handleSubmit((data) => onPress([data[name][index]]))}
            /> */}
          </div>
        );
      },
    },
    {
      dataIndex: "Weight",
      title: "Cân nặng (kg)",
      align: "center",
      render: (_, __, index) => (
        <FormInputNumber
          control={control}
          name={`${name}.${index}.Weight` as any}
          placeholder=""
          inputClassName="text-center w-[80px] text-center"
          onEnter={handleSubmit((data) => onPress([data[name][index]]))}
        />
      ),
    },
    {
      dataIndex: "Width",
      title: "Kích thước",
      align: "center",
      render: (_, __, index) => {
        return (
          <div className="flex flex-col gap-1">
            <FormInputNumber
              control={control}
              name={`${name}.${index}.Length` as any}
              placeholder=""
              inputClassName="text-center w-[80px] text-center"
              onEnter={handleSubmit((data) => onPress([data[name][index]]))}
              prefix="D = "
            />
            <FormInputNumber
              control={control}
              name={`${name}.${index}.Width` as any}
              placeholder=""
              inputClassName="text-center w-[80px] text-center"
              onEnter={handleSubmit((data) => onPress([data[name][index]]))}
              prefix="R = "
            />
            <FormInputNumber
              control={control}
              name={`${name}.${index}.Height` as any}
              placeholder=""
              inputClassName="text-center w-[80px] text-center"
              onEnter={handleSubmit((data) => onPress([data[name][index]]))}
              prefix="C = "
            />
            <div className="text-center font-bold">{__?.VolumePayment} m3</div>
          </div>
        );
      },
    },
    {
      dataIndex: "BigPackageName",
      title: "Bao lớn",
      render: (_, record) => {
        return <Input.TextArea disabled value={_} readOnly rows={2}/>;
      },
    },
    {
      dataIndex: "Description",
      title: "Ghi chú",
      render: (_, __, index) => (
        <FormTextarea
          control={control}
          name={`${name}.${index}.Description` as any}
          placeholder=""
          rows={3}
          onEnter={handleSubmit((data) => onPress([data[name][index]]))}
        />
      ),
    },
    // {
    //   dataIndex: "UserNote",
    //   title: "Khách ghi chú",
    //   render: (_, __, index) => (
    //     <FormTextarea
    //       control={control}
    //       name={`${name}.${index}.UserNote` as any}
    //       placeholder=""
    //       onEnter={handleSubmit((data) => onPress([data[name][index]]))}
    //     />
    //   ),
    // },
    {
      dataIndex: "action",
      title: "Thao tác",
      align: "right",
      render: (_, record, index) => (
        <div className="flex flex-col gap-1">
          {record.Status <=
            ESmallPackageStatusData.ArrivedToVietNamWarehouse && (
            <ActionButton
              icon="fas fa-sync-alt"
              onClick={handleSubmit((data) => onPress([data[name][index]]))}
              title="Cập nhật"
              isButton
              // isButtonClassName="bg-main !text-white"
            />
          )}
          {/* <ActionButton
						icon="fas fa-map-marker-alt-slash"
						onClick={handleSubmit((data) => onIsLost(data[name]))}
						title="Thất lạc"
					/> */}
          {!record.MainOrderId && (
            <ActionButton
              icon="fas fa-plus-circle"
              onClick={handleSubmit((data) => {
                handleAssign(data[name][index], "assign1");
              })}
              title="Mua hộ"
              isButton
              // isButtonClassName="bg-green !text-white"
            />
          )}
          {/* <ActionButton
            icon="fas fa-plus-circle"
            onClick={handleSubmit((data) =>
              handleAssign(data[name][index], "assign2")
            )}
            title="Gán đơn cho khách ký gửi"
          /> */}
          <ActionButton
            icon="fas fa-barcode-read"
            onClick={() => {
              JsBarcode("#barcode", record?.OrderTransactionCode, {
                displayValue: false,
                width: 3,
              });
              handlePrint();
            }}
            title="In barcode"
            isButton
            // isButtonClassName="bg-blue !text-white"
          />
          <ActionButton
            icon="fas fa-eye-slash"
            onClick={() => onHide(name, record)}
            title="Ẩn kiện"
            isButton
            // isButtonClassName="bg-red !text-white"
          />
        </div>
      ),
      fixed: "right",
    },
  ];

  const ComponentToPrint = React.forwardRef<{}, {}>((props, ref: any) => {
    return (
      <div ref={ref} className="w-full">
        <svg className="w-full m-auto" id="barcode"></svg>
      </div>
    );
  });

  return (
    <div className="mt-4 ">
      <div className="hidden">
        <ComponentToPrint ref={componentRef} />
      </div>
      <div className="grid grid-cols-4 gap-4">
        <div className="col-span-3 bg-white w-fit px-4 shadow-md flex items-center !text-sec rounded-[6px]">
          <div className="mr-2 font-bold uppercase">
            {data?.[0]?.UserName || ""} | {data?.[0]?.Phone || ""}
          </div>
          <span className="text-red font-bold text-lg">{`(${data?.length})`}</span>
        </div>
        <div className="col-span-1 flex items-center justify-end">
          <ActionButton
            onClick={() => onHide(name, [])}
            title="Ẩn tất cả"
            icon="fas fa-eye-slash"
            isButton
            isButtonClassName="bg-red !text-white mr-2"
          />
          <ActionButton
            icon="fas fa-pencil"
            title="Cập nhật tất cả"
            onClick={handleSubmit((dataSubmit) => {
              onPress(dataSubmit[name]);
            })}
            isButton
            isButtonClassName="bg-blue !text-white"
          />
        </div>
      </div>

      <DataTable
        {...{
          data,
          columns: type === "china" ? columns : columnsVN,
        }}
      />
      <Divider />
    </div>
  );
};
