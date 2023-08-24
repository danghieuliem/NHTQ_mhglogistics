import { ActionButton, DataTable } from "~/components";
import { TColumnsType } from "~/types/table";
import { _format } from "~/utils";
import TagStatus from "../../status/TagStatus";

export const StatisticalWithdrawTable = ({
  data,
  loading,
  handlePagination,
  pagination,
  handleExportExcelWithDraw,
}) => {
  const columns: TColumnsType<TStatisticalWithdrawList> = [
    {
      dataIndex: "Id",
      title: "ID",
      width: 70,
    },
    {
      dataIndex: "CreatedBy",
      title: "Người duyệt",
    },
    {
      dataIndex: "UserName",
      title: "Username",
    },
    {
      dataIndex: "Amount",
      title: "Số tiền (VNĐ)",
      align: "right",
      render: (money) => _format.getVND(money, " "),
    },
    {
      dataIndex: "Created",
      title: "Ngày tạo",
      width: 200,
      render: (date) => _format.getVNDate(date),
    },
    {
      dataIndex: "Status",
      title: "Trạng thái",
      fixed: "right",
      width: 100,
      render: () => <TagStatus color="green" statusName="Thành công" />,
    },
  ];

  return (
    <DataTable
      {...{
        columns,
        data,
        bordered: true,
        // expandable: expandable,
        loading,
        pagination,
        title: "Danh sách rút tiền",
        onChange: handlePagination,
        scroll: { y: 600, x: 1200 },
        extraElment: (
          <ActionButton
            onClick={() => handleExportExcelWithDraw()}
            icon="fas fa-file-export"
            title="Xuất"
            isButton
            isButtonClassName="bg-green !text-white"
          />
        ),
      }}
    />
  );
};
