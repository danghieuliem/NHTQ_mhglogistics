import Link from "next/link";
import router from "next/router";
import React from "react";
import { bigPackage } from "~/api";
import { ActionButton, DataTable, toast } from "~/components";
import { bigPackageStatus } from "~/configs";
import { TColumnsType, TTable } from "~/types/table";
import { _format } from "~/utils";
import TagStatus from "../../status/TagStatus";
type TProps = {
  filter;
  handleFilter: (newFilter) => void;
};
export const PackageManagementTable: React.FC<TTable<TPackage> & TProps> = ({
  data,
  loading,
  filter,
  handleFilter,
}) => {
  //Export data excel
  const _onExportExcel = async (Id: any) => {
    try {
      bigPackage.exportExcel({ Id }).then((res) => {
        router.push(`${res.Data}`);
      });
    } catch (error) {
      toast.error(error);
    }
  };

  const columns: TColumnsType<TPackage> = [
    {
      dataIndex: "Id",
      title: "ID",
      width: 50,
      fixed: "left",
      render: (_) => {
        return (
          <Link
            passHref
            href={`/manager/warehouse/package-management/detail/?id=${_}`}
          >
            <a target="_blank">{_}</a>
          </Link>
        );
      },
    },
    {
      dataIndex: "Created",
      title: "Ngày tạo",
      width: 200,
      render: (date) => _format.getVNDate(date),
    },
    {
      dataIndex: "Code",
      title: "Mã bao hàng",
      width: 120,
    },
    {
      dataIndex: "Total",
      title: "Tổng kiện",
      align: "right",
      width: 100,
      render: (_) => <>{_format.getVND(_, " ")}</>,
    },
    {
      dataIndex: "Weight",
      title: "Cân nặng (Kg)",
      align: "right",
      width: 100,
      render: (_) => <>{_format.getVND(_, " ")}</>,
    },
    {
      dataIndex: "Volume",
      title: "Khối (m3)",
      align: "right",
      width: 100,
      render: (_) => <>{_format.getVND(_, " ")}</>,
    },
    {
      dataIndex: "Status",
      title: "Trạng thái",
      width: 180,
      render: (status) => {
        const color = bigPackageStatus.find((x) => x.id === status);
        return <TagStatus color={color?.color} statusName={color?.name} />;
      },
    },
    {
      dataIndex: "action",
      title: "Thao tác",
      width: 100,
      fixed: "right",
      render: (_, record) => (
        <div className="flex flex-wrap gap-2">
          <Link
            passHref
            href={`/manager/warehouse/package-management/detail/?id=${record?.Id}`}
          >
            <a target="_blank">
              <ActionButton
                icon="fas fa-info-square"
                title="Chi tiết"
                isButton
              />
            </a>
          </Link>

          <ActionButton
            onClick={() => {
              toast.info("Đang xử lý, vui lòng chờ ...");
              return _onExportExcel(record.Id);
            }}
            icon="fas fa-download"
            title="Xuất excel"
            isButton
          />
        </div>
      ),
    },
  ];

  return (
    <>
      <DataTable
        {...{
          loading: loading,
          columns,
          data,
          bordered: true,
          // expandable: expandable,
          scroll: { y: 700, x: 1200 },
          pagination: {
            current: filter.PageIndex,
            total: filter.TotalItems,
            pageSize: filter.PageSize,
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
    </>
  );
};
