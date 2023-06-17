import { Pagination, Space, Tag } from "antd";
import React, { useRef, useState } from "react";
import { useQuery } from "react-query";
import ReactToPrint, { PrintContextConsumer } from "react-to-print";
import { toast } from "react-toastify";
import { withdraw } from "~/api";
import configHomeData from "~/api/config-home";
import { ActionButton, DataTable } from "~/components";
import { moneyStatus } from "~/configs";
import { TColumnsType, TTable } from "~/types/table";
import { _format } from "~/utils";
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

  const { data: configData } = useQuery(
    ["configData"],
    () => configHomeData.get(),
    {
      onSuccess: (res) => {
        return res?.Data;
      },
      retry: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    }
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
              {configData?.Data?.CompanyLongName}
            </div>
            <div className="text-xs text-black">
              <span
                dangerouslySetInnerHTML={{
                  __html: configData?.Data?.Address,
                }}
              ></span>
            </div>
            <div className="text-xs text-black">
              Website: {configData?.Data?.WebsiteName}
            </div>
            <div className="text-xs text-black">
              Điện thoại: {configData?.Data?.Hotline}
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
    },
    {
      dataIndex: "UserName",
      title: () => (
        <div>
          Người <br /> thực hiện GD
        </div>
      ),
      fixed: "left",
    },
    {
      dataIndex: "Beneficiary",
      title: "Người nhận",
      fixed: "left",
    },
    {
      dataIndex: "BankNumber",
      title: "STK khách",
      align: "right",
    },
    {
      dataIndex: "BankAddress",
      title: "Ngân hàng",
    },
    {
      dataIndex: "Amount",
      title: "Số tiền rút (VNĐ)",
      align: "right",
      render: (money) => _format.getVND(money, " "),
    },
    {
      dataIndex: "Note",
      title: "Nội dung rút tiền",
      responsive: ["xl"],
    },
    {
      dataIndex: "Created",
      title: "Ngày nạp",
      render: (_, record) => {
        return (
          <>
            <div> {_format.getVNDate(record.Created)}</div>
            <div> {record.CreatedBy ?? "--"}</div>
          </>
        );
      },
      responsive: ["xl"],
    },
    {
      dataIndex: "Updated",
      title: "Ngày duyệt",
      render: (_, record) => {
        return (
          <>
            <div> {_format.getVNDate(record.Updated)}</div>
            <div> {record.UpdatedBy}</div>
          </>
        );
      },
      responsive: ["xl"],
    },
    {
      dataIndex: "Status",
      title: "Trạng thái",
      render: (status, record) => {
        const color = moneyStatus.find((x) => x.id === status);
        return <Tag color={color?.color}>{record.StatusName}</Tag>;
      },
    },
    {
      dataIndex: "action",
      key: "action",
      title: "Thao tác",
      align: "right",
      render: (_, record) => (
        <Space>
          {record?.Status !== 3 && (
            <ActionButton
              onClick={() => handleModal(record)}
              icon="fad fa-edit" // fas fa-sync fa-spin
              title="Cập nhật"
            />
          )}

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
                  icon="fad fa-print"
                  title="In phiếu xuất"
                />
              )}
            </PrintContextConsumer>
          </ReactToPrint>
        </Space>
      ),
      fixed: "right",
    },
  ];

  const expandable = {
    expandedRowRender: (record) => (
      <ul className="px-2 text-xs">
        <li className="justify-between flex py-2">
          <span className="font-medium mr-4">Ngày rút:</span>
          {_format.getVNDate(record.Created)}
        </li>
        <li className="justify-between flex py-2">
          <span className="font-medium mr-4">Người duyệt:</span>
          {record.UpdatedBy}
        </li>
        <li className="justify-between flex py-2">
          <span className="font-medium mr-4">Ngày duyệt:</span>
          {_format.getVNDate(record.Updated)}
        </li>
        <li className="justify-between flex py-2">
          <span className="font-medium mr-4">Nội dung rút:</span>
          {record.Note}
        </li>
      </ul>
    ),
  };

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
          expandable: expandable,
          loading,
        }}
      />
      <div className="mt-4 text-right">
        <Pagination
          total={filter?.TotalItems}
          current={filter?.PageIndex}
          pageSize={filter?.PageSize}
          onChange={(page, pageSize) =>
            handleFilter({ ...filter, PageIndex: page, PageSize: pageSize })
          }
        />
      </div>
    </React.Fragment>
  );
};
