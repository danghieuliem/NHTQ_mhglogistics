import { Pagination, Space, Tag } from "antd";
import { useRouter } from "next/router";
import { FC } from "react";
import { ActionButton, DataTable } from "~/components";
import { activeData, getLevelId } from "~/configs/appConfigs";
import { TColumnsType, TTable } from "~/types/table";
import { _format } from "~/utils";
type TProps = {
  filter: {
    TotalItems: number;
    PageIndex: number;
    PageSize: number;
  };
  handleFilter: (newFilter) => void;
  userGroupCatalogue;
  refetch: () => void;
  UserGroupId: number;
};

export const EmployeeManagementTable: FC<TTable<TEmployee> & TProps> = ({
  data,
  loading,
  filter,
  handleFilter,
  UserGroupId,
}) => {
  // const { warehouseVN, warehouseTQ } = useCatalogue({
  //   warehouseVNEnabled: true,
  //   warehouseTQEnabled: true,
  // });
  const router = useRouter();

  const columns: TColumnsType<TEmployee> = [
    {
      dataIndex: "Id",
      title: "ID",
      width: 60,
      fixed: "left"
    },
    {
      dataIndex: "UserName",
      title: "Username",
      fixed: "left"
    },
    {
      dataIndex: "FullName",
      title: "Họ và tên",
    },
    {
      dataIndex: "UserGroupName",
      title: "Quyền hạn",
      className: router?.pathname.includes("admin") ? "hidden" : "",
      key: "UserGroupName",
    },
    {
      dataIndex: "LevelId",
      title: "VIP",
      width: 70,
      responsive: ["xl"],
      render: (_, record) => {
        return (
          <span
            className={`${
              record?.LevelId > 3 ? "text-[#8a64e3]" : "text-orange"
            } font-semibold text-xs`}
          >
            {getLevelId[record?.LevelId]?.Name}
          </span>
        );
      },
    },
    {
      dataIndex: "Phone",
      title: "Số điện thoại",
      align: "right",
    },
    {
      dataIndex: "Wallet",
      title: "Số dư VNĐ",
      align: "right",
      render: (_, record) => _format.getVND(record?.Wallet, " "),
    },
    {
      dataIndex: "Email",
      title: "Email",
    },
    // {
    //   dataIndex: "DatHangId",
    //   title: "Nhân viên",
    //   render: (_, record) => {
    //     const orderEm = dathangList?.Data?.Items.filter(
    //       (item) => item.Id === record?.DatHangId
    //     )[0];
    //     const salerEm = saleList?.Data?.Items.filter(
    //       (item) => item.Id === record?.SaleId
    //     )[0];
    //     return (
    //       <div className="flex flex-col">
    //         <span className="flex justify-between">
    //           Đặt hàng:
    //           <span className="font-bold">{orderEm?.UserName ?? "--"}</span>
    //         </span>
    //         <span className="flex justify-between">
    //           Kinh doanh:
    //           <span className="font-bold">{salerEm?.UserName ?? "--"}</span>
    //         </span>
    //       </div>
    //     );
    //   },
    //   responsive: ["xl"],
    // },
    // {
    //   dataIndex: "WarehouseFrom",
    //   title: "Thông tin kho",
    //   render: (_, record) => {
    //     return (
    //       <div>
    //         <div className="flex flex-col">
    //           <span className="flex justify-between">
    //             Trung Quốc:
    //             <span className="font-bold">
    //               {
    //                 warehouseTQ?.find(
    //                   (x) => x.Id === Number(record?.WarehouseFrom)
    //                 )?.Name
    //               }
    //             </span>
    //           </span>
    //           <span className="flex justify-between">
    //             Việt Nam:
    //             <span className="font-bold">
    //               {
    //                 warehouseVN?.find(
    //                   (x) => x.Id === Number(record?.WarehouseTo)
    //                 )?.Name
    //               }
    //             </span>
    //           </span>
    //         </div>
    //       </div>
    //     );
    //   },
    //   responsive: ["xl"],
    // },
    {
      dataIndex: "Status",
      title: "Trạng thái",
      render: (status: number) => (
        <Tag color={activeData[status].color}>{activeData[status].name}</Tag>
      ),
    },
    {
      dataIndex: "Created",
      title: "Ngày tạo",
      render: (_, record) => {
        return (
          <>
            <div>{_format.getVNDate(record.Created)}</div>
            <div>{record.CreatedBy}</div>
          </>
        );
      },
      responsive: ["xl"],
    },
    {
      dataIndex: "Updated",
      title: "Ngày cập nhật",
      render: (_, record) => {
        return (
          <>
            <div>{_format.getVNDate(record?.Updated)}</div>
            <div>{record?.UpdatedBy}</div>
          </>
        );
      },
      responsive: ["xl"],
    },
    {
      dataIndex: "action",
      title: "Thao tác",
      align: "right",
      className: '',
      fixed: "right",
      // width: 200,
      render: (_, record) => (
        <Space>
          {UserGroupId === 1 && (
            <ActionButton
              onClick={() =>
                router.push({
                  pathname: "/manager/employee/employee-management/detail",
                  query: { id: record?.Id },
                })
              }
              icon="fas fa-edit"
              title="Cập nhật"
            />
          )}

          <ActionButton
            onClick={() =>
              router.push({
                pathname: "/manager/money/vietnam-recharge",
                query: { id: record?.Id },
              })
            }
            icon="fas fa-funnel-dollar"
            title="Nạp tiền"
            iconContainerClassName="iconBlue"
            btnBlue
          />

          <ActionButton
            onClick={() =>
              router.push({
                pathname: "/manager/money/vietnam-withdrawal",
                query: { id: record?.Id },
              })
            }
            icon="fas fa-money-check-edit-alt"
            title="Rút tiền"
            iconContainerClassName="iconBlue"
            btnBlue
          />

          <ActionButton
            onClick={() =>
              router.push({
                pathname: "/manager/client/transaction-history/",
                query: { id: record?.Id },
              })
            }
            icon="fas fa-usd-square"
            title="Lịch sử giao dịch"
            iconContainerClassName="iconBlue"
            btnBlue
          />
        </Space>
      ),
      responsive: ["xl"],
    },
  ];

  const expandable = {
    expandedRowRender: (record) => (
      <ul className="px-2 text-xs">
        <li className="xl:hidden flex justify-between py-2">
          <span className="font-medium mr-4">Ngày tạo:</span>
          {_format.getVNDate(record.Created)}
        </li>
        <li className="xl:hidden flex justify-between py-2">
          <span className="font-medium mr-4">Ngày cập nhật:</span>
          {_format.getVNDate(record.Updated)}
        </li>
        <li className="xl:hidden flex justify-between py-2">
          <span className="font-medium mr-4">Thao tác:</span>
          <Space>
            {UserGroupId === 1 && (
              <ActionButton
                onClick={() =>
                  router.push({
                    pathname: "/manager/employee/employee-management/detail",
                    query: { id: record?.Id },
                  })
                }
                icon="fas fa-edit"
                title="Cập nhật"
              />
            )}

            <ActionButton
              onClick={() =>
                router.push({
                  pathname: "/manager/money/vietnam-recharge",
                  query: { id: record?.Id },
                })
              }
              icon="fas fa-badge-dollar"
              title="Nạp tiền"
              iconContainerClassName="iconBlue"
              btnBlue
            />
          </Space>
        </li>
      </ul>
    ),
  };

  return (
    <>
      <DataTable
        {...{
          loading,
          columns,
          data,
          bordered: true,
          expandable: expandable,
          // scroll: {x: 1200, y: 600}
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
