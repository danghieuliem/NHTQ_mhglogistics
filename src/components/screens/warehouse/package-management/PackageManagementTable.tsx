import { Pagination, Space, Tag } from "antd";
import router from "next/router";
import React from "react";
import { bigPackage } from "~/api";
import { ActionButton, DataTable, toast } from "~/components";
import { bigPackageStatusData } from "~/configs/appConfigs";
import { TColumnsType, TTable } from "~/types/table";
import { _format } from "~/utils";
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
    },
    {
      dataIndex: "Code",
      title: "Mã bao hàng",
    },
    {
      dataIndex: "Total",
      title: "Tổng kiện",
      align: "right",
    },
    {
      dataIndex: "Weight",
      title: "Cân nặng kg",
      align: "right",
    },
    {
      dataIndex: "Volume",
      title: "Khối m3",
      align: "right",
    },
    {
      dataIndex: "Status",
      title: "Trạng thái",
      align: "center",
      render: (status, record) => (
        <Tag color={bigPackageStatusData.find((x) => x.id === status)?.color}>
          {record.StatusName}
        </Tag>
      ),
    },
    {
      dataIndex: "Created",
      title: "Ngày tạo",
      align: "center",
      render: (date) => _format.getVNDate(date),
    },
    {
      dataIndex: "action",
      title: "Thao tác",
      align: "right",
      render: (_, record) => (
        <Space>
          <ActionButton
            onClick={() =>
              router.push({
                pathname: "/manager/warehouse/package-management/detail",
                query: { id: record?.Id },
              })
            }
            icon="fas fa-sack"
            title="Cho vào bao lớn"
          />

          <ActionButton
            onClick={() => {
              toast.info("Đang xử lý, vui lòng chờ ...");
              return _onExportExcel(record.Id);
            }}
            icon="fad fa-download"
            title="Xuất Thống Kê"
          />
        </Space>
      ),
    },
  ];

  // const expandable = {
  //   expandedRowRender: (record) => (
  //     <ul className="px-2 text-xs">
  //       <li className="sm:hidden justify-between flex py-2">
  //         <span className="font-medium mr-4">Cận nặng kg:</span>
  //         {record.Weight}
  //       </li>
  //       <li className="md:hidden justify-between flex py-2">
  //         <span className="font-medium mr-4">Khối m3:</span>
  //         {record.Volume}
  //       </li>
  //       <li className="lg:hidden justify-between flex py-2">
  //         <span className="font-medium mr-4">Trạng thái:</span>
  //         <div>
  //           <Tag
  //             color={
  //               bigPackageStatusData.find((x) => x.id === record?.Status)?.color
  //             }
  //           >
  //             {record.StatusName}
  //           </Tag>
  //         </div>
  //       </li>
  //       <li className="xl:hidden justify-between flex py-2">
  //         <span className="font-medium mr-4">Ngày tạo:</span>
  //         {_format.getVNDate(record.Created)}
  //       </li>
  //       <li className="xl:hidden justify-between flex py-2">
  //         <span className="font-medium mr-4">Thao tác:</span>
  //         <Space>
  //           <ActionButton
  //             onClick={() =>
  //               router.push({
  //                 pathname: "/manager/warehouse/package-management/detail",
  //                 query: { id: record?.Id },
  //               })
  //             }
  //             icon="fas fa-sack"
  //             title="Cho vào bao lớn"
  //           />
  //           <ActionButton
  //             onClick={() => _onExportExcel(record.Id)}
  //             icon="fad fa-download"
  //             title="Xuất Thống Kê"
  //           />
  //         </Space>
  //       </li>
  //     </ul>
  //   ),
  // };

  return (
    <>
      <DataTable
        {...{
          loading: loading,
          columns,
          data,
          bordered: true,
          // expandable: expandable,
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
    </>
  );
};
