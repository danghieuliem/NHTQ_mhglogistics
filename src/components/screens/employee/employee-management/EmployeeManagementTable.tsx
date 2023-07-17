import { Pagination, Space, Tag } from "antd";
import { useRouter } from "next/router";
import { FC } from "react";
import { ActionButton, DataTable, IconButton } from "~/components";
import { activeData, getLevelId } from "~/configs/appConfigs";
import { TColumnsType, TTable } from "~/types/table";
import { _format } from "~/utils";
import TagStatus from "../../status/TagStatus";
import Link from "next/link";
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

export const EmployeeManagementTable: FC<TTable<TEmployee | any> & TProps> = ({
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

  const colEmployee: TColumnsType<TEmployee> = [
    {
      dataIndex: "Id",
      title: "ID",
      width: 60,
      align: "right",
      fixed: "left",
    },
    {
      dataIndex: "UserName",
      title: "Thông tin hệ thống",
      render: (_, record) => {
        return (
          <div className="flex flex-col gap-[4px]">
            <div className="font-bold">
              <i className="fas fa-user mr-1"></i>
              {record?.UserName}
            </div>
            <div className="flex items-center">
              <TagStatus
                color={activeData[record?.Status].color}
                statusName={activeData[record?.Status].name}
              />
              <span
                className={`${
                  record?.LevelId > 3 ? "text-[#8a64e3]" : "text-orange"
                } font-semibold ml-1 text-xs`}
              >
                {" - "}
                {getLevelId[record?.LevelId]?.Name}
              </span>
            </div>
            <div className="font-bold text-sec text-xs">
              <i className="fas fa-coins mr-1"></i>
              {_format.getVND(record?.Wallet)}
            </div>
          </div>
        );
      },
      fixed: "left",
    },
    {
      dataIndex: "FullName",
      title: "Thông tin cá nhân",
      width: 300,
      render: (_, record) => {
        return (
          <div className="flex flex-col">
            <span className="font-bold">
              <i className="fas fa-user mr-1"></i>
              {record?.FullName}
            </span>
            <span className="text-green">
              <i className="fas fa-phone mr-1"></i>
              {record?.Phone}
            </span>
            <span>
              <i className="fas fa-at mr-1"></i>
              {record?.Email}
            </span>
          </div>
        );
      },
    },
    {
      dataIndex: "UserGroupName",
      title: "Quyền hạn",
      key: "UserGroupName",
    },
    {
      dataIndex: "Created",
      title: "Ngày tạo",
      render: (_, record) => {
        return (
          <div>
            <div>{_format.getVNDate(record.Created)}</div>
            <div>{record.CreatedBy}</div>
          </div>
        );
      },
    },
    {
      dataIndex: "Updated",
      title: "Ngày cập nhật",
      render: (_, record) => {
        return (
          <div>
            <div>{_format.getVNDate(record.Updated)}</div>
            <div>{record.UpdatedBy}</div>
          </div>
        );
      },
    },
    {
      dataIndex: "action",
      title: "Thao tác",
      align: "right",
      width: 220,
      render: (_, record) => (
        <div className="grid grid-cols-2 gap-1">
          {UserGroupId === 1 && (
            <Link
              href={`/manager/employee/employee-management/detail/?id=${record?.Id}`}
            >
              <a target="_blank">
                <ActionButton
                  icon="!mr-0"
                  title="Cập nhật"
                  isButton
                  isButtonClassName="!justify-center !w-full"
                />
              </a>
            </Link>
          )}
          <Link href={`/manager/money/vietnam-recharge/?id=${record?.Id}`}>
            <a target="_blank">
              <ActionButton
                icon="!mr-0"
                title="Nạp tiền"
                isButton
                isButtonClassName="!justify-center !w-full"
              />
            </a>
          </Link>

          <Link href={`/manager/money/vietnam-withdrawal/?id=${record?.Id}`}>
            <a target="_blank">
              <ActionButton
                icon="!mr-0"
                title="Rút tiền"
                isButton
                isButtonClassName="!justify-center !w-full"
              />
            </a>
          </Link>

          <Link href={`/manager/client/transaction-history/?id=${record?.Id}`}>
            <a target="_blank">
              <ActionButton
                icon="!mr-0"
                title="Giao dịch"
                isButton
                isButtonClassName="!justify-center !w-full"
              />
            </a>
          </Link>
        </div>
      ),
    },
  ];

  const colAdmin: TColumnsType<TEmployee> = [
    {
      dataIndex: "Id",
      title: "ID",
      width: 60,
      align: "right",
      fixed: "left",
    },
    {
      dataIndex: "UserName",
      title: "Thông tin hệ thống",
      render: (_, record) => {
        return (
          <div className="flex flex-col gap-[4px]">
            <div className="font-bold">
              <i className="fas fa-user mr-1"></i>
              {record?.UserName}
            </div>
            <div className="flex items-center">
              <TagStatus
                color={activeData[record?.Status].color}
                statusName={activeData[record?.Status].name}
              />
              <span
                className={`${
                  record?.LevelId > 3 ? "text-[#8a64e3]" : "text-orange"
                } font-semibold ml-1 text-xs`}
              >
                {" - "}
                {getLevelId[record?.LevelId]?.Name}
              </span>
            </div>
            <div className="font-bold text-sec text-xs">
              <i className="fas fa-coins mr-1"></i>
              {_format.getVND(record?.Wallet)}
            </div>
          </div>
        );
      },
      fixed: "left",
    },
    {
      dataIndex: "FullName",
      title: "Thông tin cá nhân",
      width: 300,
      render: (_, record) => {
        return (
          <div className="flex flex-col">
            <span className="font-bold">
              <i className="fas fa-user mr-1"></i>
              {record?.FullName}
            </span>
            <span className="text-green">
              <i className="fas fa-phone mr-1"></i>
              {record?.Phone}
            </span>
            <span>
              <i className="fas fa-at mr-1"></i>
              {record?.Email}
            </span>
          </div>
        );
      },
    },
    {
      dataIndex: "Created",
      title: "Ngày tạo",
      render: (_, record) => {
        return (
          <div>
            <div>{_format.getVNDate(record.Created)}</div>
            <div>{record.CreatedBy}</div>
          </div>
        );
      },
    },
    {
      dataIndex: "Updated",
      title: "Ngày cập nhật",
      render: (_, record) => {
        return (
          <div>
            <div>{_format.getVNDate(record.Updated)}</div>
            <div>{record.UpdatedBy}</div>
          </div>
        );
      },
    },
    {
      dataIndex: "action",
      title: "Thao tác",
      align: "right",
      width: 220,
      fixed: "right",
      render: (_, record) => (
        <div className="grid grid-cols-2 gap-1">
          {UserGroupId === 1 && (
            <Link
              href={`/manager/employee/employee-management/detail/?id=${record?.Id}`}
            >
              <a target="_blank">
                <ActionButton
                  icon="!mr-0"
                  title="Cập nhật"
                  isButton
                  isButtonClassName="!justify-center !w-full"
                />
              </a>
            </Link>
          )}
          <Link href={`/manager/money/vietnam-recharge/?id=${record?.Id}`}>
            <a target="_blank">
              <ActionButton
                icon="!mr-0"
                title="Nạp tiền"
                isButton
                isButtonClassName="!justify-center !w-full"
              />
            </a>
          </Link>

          <Link href={`/manager/money/vietnam-withdrawal/?id=${record?.Id}`}>
            <a target="_blank">
              <ActionButton
                icon="!mr-0"
                title="Rút tiền"
                isButton
                isButtonClassName="!justify-center !w-full"
              />
            </a>
          </Link>

          <Link href={`/manager/client/transaction-history/?id=${record?.Id}`}>
            <a target="_blank">
              <ActionButton
                icon="!mr-0"
                title="Giao dịch"
                isButton
                isButtonClassName="!justify-center !w-full"
              />
            </a>
          </Link>
        </div>
      ),
    },
  ];

  return (
    <>
      <DataTable
        {...{
          loading,
          columns: router?.pathname.includes("admin") ? colAdmin : colEmployee,
          data,
          bordered: true,
          scroll: { x: 1200, y: 700 },
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
