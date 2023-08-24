import { Divider, Pagination } from "antd";
import TextArea from "antd/lib/input/TextArea";
import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import ReactToPrint, { PrintContextConsumer } from "react-to-print";
import { toast } from "react-toastify";
import { withdraw } from "~/api";
import { ActionButton, DataTable } from "~/components";
import { moneyStatus } from "~/configs";
import { RootState } from "~/store";
import { TColumnsType, TTable } from "~/types/table";
import { _format } from "~/utils";
import TagStatus from "../../status/TagStatus";
type TProps = {
  filter;
  handleFilter: (newFilter) => void;
};
export const WithDrawalHistoryTable: React.FC<TTable<TWithDraw> & TProps> = ({
  data,
  handleModal,
  filter,
  handleFilter,
  loading,
}) => {
  const [dataEx, setDataEx] = useState<TWithDraw>(null);
  const componentRef = useRef<ReactToPrint>(null);

  const dataGlobal: TConfig = useSelector(
    (state: RootState) => state.dataGlobal
  );

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
          PHIẾU CHI
          <div className="text-sm text-black font-normal text-center">
            Thời gian xuất phiếu: {_format.getVNDate(new Date())}
          </div>
        </div>
        <div className="w-[80vw] m-auto mb-4">
          <div className="border-b border-b-[rgba(0,0,0,.3)] text-black text-sm my-3 border-dashed flex">
            Họ và tên người nhận tiền:{" "}
            <p className="ml-3 font-bold">{dataEx?.Beneficiary}</p>
          </div>
          <div className="border-b border-b-[rgba(0,0,0,.3)] text-black text-sm my-3 border-dashed flex">
            Địa chỉ:
          </div>
          <div className="border-b border-b-[rgba(0,0,0,.3)] text-black text-sm my-3 border-dashed flex">
            Lý do chi: <p className="ml-3 font-bold">{dataEx?.Note}</p>
          </div>
          <div className="border-b border-b-[rgba(0,0,0,.3)] text-black text-sm my-3 border-dashed flex">
            Số tiền:{" "}
            <p className="ml-3 font-bold">{_format.getVND(dataEx?.Amount)}</p>
          </div>
          <div className="border-b border-b-[rgba(0,0,0,.3)] text-black text-sm my-3 border-dashed flex">
            Bằng chữ:{" "}
            <p className="ml-3 font-bold">
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
            <div className="text-center text-base">Người nhận tiền</div>
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

  const columns: TColumnsType<TWithDraw> = [
    {
      dataIndex: "Id",
      title: "ID",
      fixed: "left",
      width: 50,
      align: "right",
    },
    {
      dataIndex: "UserName",
      title: "Thông tin tạo GD",
      width: 230,
      render: (_, record) => {
        return (
          <div>
            <div className="flex justify-between mb-1">
              <span className="font-semibold">Thực hiện GD:</span>
              <span>{record?.UserName}</span>
            </div>
            <div className="flex justify-between mb-1">
              <TextArea rows={2} disabled value={record?.Note} />
            </div>
          </div>
        );
      },
    },
    {
      dataIndex: "Beneficiary",
      title: "Thông tin nhận GD",
      width: 230,
      render: (_, record) => {
        return (
          <div>
            <div className="flex justify-between mb-1 text-red">
              <span className="font-semibold">Số tiền (VNĐ):</span>
              <span>{_format.getVND(record?.Amount, " ")}</span>
            </div>
            <Divider className="!my-1" />
            <div className="flex justify-between mb-1">
              <span className="font-semibold">Người nhận:</span>
              <span>{record?.Beneficiary || "--"}</span>
            </div>
            <div className="flex justify-between mb-1">
              <span className="font-semibold">Số TK:</span>
              <span>{record?.BankNumber || "--"}</span>
            </div>
            <div className="flex justify-between mb-1">
              <span className="font-semibold">Ngân hàng:</span>
              <span>{record?.BankAddress || "--"}</span>
            </div>
          </div>
        );
      },
    },
    {
      dataIndex: "Created",
      title: "Ngày rút",
      width: 200,
      render: (_, record) => {
        return (
          <div>
            <div> {_format.getVNDate(record.Created)}</div>
            <div> {record.CreatedBy ?? "--"}</div>
          </div>
        );
      },
    },
    {
      dataIndex: "Updated",
      title: "Ngày duyệt",
      width: 200,
      render: (_, record) => {
        return (
          <div>
            <div> {_format.getVNDate(record.Updated)}</div>
            <div> {record.UpdatedBy}</div>
          </div>
        );
      },
    },
    {
      dataIndex: "Status",
      title: "Trạng thái",
      width: 120,
      render: (status, record) => {
        const color = moneyStatus.find((x) => x.id === status);
        return (
          <TagStatus color={color?.color} statusName={record.StatusName} />
        );
      },
    },
    {
      dataIndex: "action",
      key: "action",
      title: "Thao tác",
      fixed: "right",
      width: 90,
      render: (_, record) => (
        <div className="flex flex-wrap gap-2">
          {record?.Status === 1 && (
            <ActionButton
              onClick={() => handleModal(record)}
              icon="fad fa-edit" // fas fa-sync fa-spin
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
                      toast.info("Đang xử lý. Chờ xíu nhé ...");
                      withdraw.getByID(record.Id).then((res) => {
                        setDataEx(res.Data);
                        handlePrint();
                      });
                    }}
                    icon="fas fa-print"
                    title="In phiếu"
                    isButton
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
          loading,
          scroll: { y: 700, x: 1200 },
        }}
      />
      <Pagination
        total={filter?.TotalItems}
        current={filter?.PageIndex}
        pageSize={filter?.PageSize}
        onChange={(page, pageSize) =>
          handleFilter({ ...filter, PageIndex: page, PageSize: pageSize })
        }
      />
      ˝{" "}
    </React.Fragment>
  );
};
