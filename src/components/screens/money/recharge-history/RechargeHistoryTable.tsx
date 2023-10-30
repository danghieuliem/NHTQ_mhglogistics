import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import ReactToPrint, { PrintContextConsumer } from "react-to-print";
import { adminSendUserWallet } from "~/api";
import { ActionButton, DataTable } from "~/components";
import { moneyStatus } from "~/configs";
import { RootState } from "~/store";
import { TColumnsType, TTable } from "~/types/table";
import { _format } from "~/utils";
import TagStatus from "../../status/TagStatus";
import { toast } from "react-toastify";
import { useScreen } from "~/hooks";

type TProps = {
  filter: {
    TotalItems: number;
    PageIndex: number;
    PageSize: number;
  };
  handleFilter: (newFilter) => void;
};

export const RechargeHistoryTable: React.FC<
  TTable<TUserHistoryRechargeVND> & TProps
> = ({ data, handleModal, loading, filter, handleFilter }) => {
  const [dataEx, setDataEx] = useState<TUserHistoryRechargeVND>(null);
  const componentRef = useRef<ReactToPrint>(null);

  const dataGlobal: TConfig = useSelector(
    (state: RootState) => state.dataGlobal
  );

  const { isWidthMD } = useScreen();

  const columns: TColumnsType<TUserHistoryRechargeVND> = [
    {
      dataIndex: "Id",
      title: "ID",
      width: 50,
      align: "right",
      responsive: ["lg"],
    },
    {
      dataIndex: "UserName",
      title: "Username",
      width: 80,
    },
    {
      dataIndex: "Amount",
      title: "Số tiền nạp (VNĐ)",
      align: "right",
      responsive: ["md"],
      render: (money, __) => {
        return (
          <div>
            <div className="flex justify-between mb-1">
              <div className="font-semibold">Số tiền: </div>
              <div>{_format.getVND(money, " ")}</div>
            </div>
            <div className="flex justify-between">
              <div className="font-semibold">Ngân hàng: </div>
              <div>{__?.BankName}</div>
            </div>
          </div>
        );
      },
      width: 160,
    },
    {
      dataIndex: "Created",
      title: "Ngày nạp",
      render: (_, record) => {
        return (
          <div>
            <div className="font-semibold mb-1">
              {_format.getVNDate(record.Created)}
            </div>
            <div>{record?.CreatedBy}</div>
          </div>
        );
      },
      responsive: ["lg"],
      width: 160,
    },
    {
      dataIndex: "Updated",
      title: "Ngày duyệt",
      render: (_, record) => {
        return (
          <div>
            <div className="mb-1">{_format.getVNDate(record.Updated)}</div>
            <div>{record?.UpdatedBy}</div>
          </div>
        );
      },
      responsive: ["lg"],
      width: 160,
    },
    {
      dataIndex: "Status",
      title: "Trạng thái",
      render: (_, record) => {
        const color = moneyStatus.find((x) => x.id === _);
        return (
          <TagStatus color={color?.color} statusName={record.StatusName} />
        );
      },
      width: 120,
    },
    {
      dataIndex: "action",
      title: "Thao tác",
      align: "right",
      fixed: !isWidthMD ? "right" : null,
      responsive: ["md"],
      width: 90,
      render: (_, record) => (
        <div className="flex flex-wrap gap-1">
          {record?.Status === 1 && (
            <ActionButton
              onClick={() => handleModal(record)}
              icon="fas fa-edit"
              title="Cập nhật"
              isButton
              isButtonClassName="bg-blue !text-white"
            />
          )}
          {record?.Status === 2 && (
            <ReactToPrint content={() => componentRef.current}>
              <PrintContextConsumer>
                {({ handlePrint }) => (
                  <ActionButton
                    onClick={() => {
                      const id = toast.loading("Đang xử lý. Chờ xíu nhé ...");
                      adminSendUserWallet
                        .getByID(record.Id)
                        .then((res) => {
                          setDataEx(res?.Data);
                          handlePrint();
                          toast.update(id, {
                            render: "",
                            isLoading: false,
                            autoClose: 100,
                            type: "success",
                          });
                        })
                        .catch((error) => {
                          toast.update(id, {
                            render: "Vui lòng thử lại",
                            isLoading: false,
                            autoClose: 3000,
                            type: "error",
                          });
                        });
                    }}
                    isButton
                    icon="fas fa-print"
                    title="In phiếu"
                    isButtonClassName="bg-green !text-white"
                  />
                )}
              </PrintContextConsumer>
            </ReactToPrint>
          )}
        </div>
      ),
    },
  ];

  const ComponentToPrint = React.forwardRef<{}, {}>((props, ref: any) => {
    return (
      <div className="w-full mb-10 p-4" ref={ref}>
        <div className="text-xs text-black">
          {_format.getVNDate(new Date())}
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-1">
            <div className="text-xs text-black my-2 font-bold uppercase">
              {dataGlobal?.CompanyLongName}
            </div>
            <div className="text-xs text-black">
              <span
                dangerouslySetInnerHTML={{
                  __html: dataGlobal?.Address,
                }}
              ></span>
            </div>
            <div className="text-xs text-black">
              Website: {dataGlobal?.WebsiteName}
            </div>
            <div className="text-xs text-black">
              Điện thoại: {dataGlobal?.Hotline}
            </div>
          </div>
          <div className="col-span-1">
            <div className="text-right ml-auto max-w-[270px]">
              <div className="text-xs my-2 text-center text-black">
                Mẫu số 01 - TT
              </div>
              <div className="text-xs text-black text-center">
                (Ban hành theo Thông tư số 133/2016/TT-BTC ngày 26/8/2016 của Bộ
                tài chính)
              </div>
            </div>
          </div>
        </div>
        <div className="text-2xl my-8 text-black font-bold text-center">
          PHIẾU THU
          <div className="text-sm text-black font-normal text-center">
            Thời gian xuất phiếu: {_format.getVNDate(new Date())}
          </div>
        </div>
        <div className="w-[80vw] m-auto mb-4">
          <div className="border-b border-b-[rgba(0,0,0,.3)] text-black text-sm my-3 border-dashed flex">
            Họ và tên người nộp tiền:{" "}
            <p className="font-bold ml-3">{dataEx?.UserName}</p>
          </div>
          <div className="border-b border-b-[rgba(0,0,0,.3)] text-black text-sm my-3 border-dashed flex">
            Địa chỉ:
          </div>
          <div className="border-b border-b-[rgba(0,0,0,.3)] text-black text-sm my-3 border-dashed flex">
            Lý do chi:
          </div>
          <div className="border-b border-b-[rgba(0,0,0,.3)] text-black text-sm my-3 border-dashed flex">
            Số tiền:{" "}
            <p className="font-bold ml-3">{_format.getVND(dataEx?.Amount)}</p>
          </div>
          <div className="border-b border-b-[rgba(0,0,0,.3)] text-black text-sm my-3 border-dashed flex">
            Bằng chữ:{" "}
            <p className="font-bold ml-3">
              {_format.toVietnamese(dataEx?.Amount)}
            </p>
          </div>
          <div className="border-b border-b-[rgba(0,0,0,.3)] text-black text-sm my-3 border-dashed flex">
            Kèm theo:
          </div>
          <div className="border-b border-b-[rgba(0,0,0,.3)] text-black text-sm my-3 border-dashed flex">
            Chứng từ gốc:
          </div>
        </div>

        <div className="mt-4">
          <strong>***Lưu ý:</strong>
          <div className="text-sm">
            * Mọi chính sách được cập nhật tại mục CHÍNH SÁCH trên Website.
          </div>
        </div>
        <div className="grid grid-cols-4 gap-4 mt-4">
          <div className="col-span-1">
            <div className="text-center text-base">Giám đốc</div>
            <div className="text-center text-sm">(Ký, họ tên, đóng dấu)</div>
          </div>
          <div className="col-span-1">
            <div className="text-center text-base">Kế toán trưởng</div>
            <div className="text-center text-sm">(Ký, họ tên)</div>
          </div>
          <div className="col-span-1">
            <div className="text-center text-base">Người nộp tiền</div>
            <div className="text-center text-sm">(Ký, họ tên)</div>
          </div>
          <div className="col-span-1">
            <div className="text-center text-base">Thủ quỹ</div>
            <div className="text-center text-sm">(Ký, họ tên)</div>
          </div>
        </div>
      </div>
    );
  });

  return (
    <React.Fragment>
      <div className="hidden">
        <ComponentToPrint ref={componentRef} />
      </div>
      <DataTable
        {...{
          columns,
          data,
          bordered: true,
          loading: loading,
          scroll: isWidthMD ? { x: true } : { y: 700, x: 1200 },
          filter,
          handleFilter,
          pagination: {
            pageSize: filter.PageSize,
            total: filter.TotalItems,
            current: filter.PageIndex,
          },
          onChange: (page, pageSize) => {
            handleFilter({
              ...filter,
              PageIndex: page.current,
              PageSize: page.pageSize,
            });
          },
        }}
      />
    </React.Fragment>
  );
};
