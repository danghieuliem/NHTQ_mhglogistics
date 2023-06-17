import { useRouter } from "next/router";
import { FC, useRef } from "react";
import { FilterInput, FilterSelect } from "~/components";
import { IconButton } from "~/components/globals/button/IconButton";

type TProps = {
  handleFilter: (newFilter: {}) => void;
  userGroupCatalogue: TUserGroupCatalogue[];
  handleAddStaff: () => void;
  onExportExcel?: (data: any) => void;
};

export const EmployeeManagementFilter: FC<TProps> = ({
  handleFilter,
  handleAddStaff,
  userGroupCatalogue,
  onExportExcel,
}) => {
  const router = useRouter();
  const UserName = useRef("");
  const UserGroupId = useRef<number | null>(null);

  return (
    <>
      <div className="grid grid-cols-5 gap-4 pb-4">
        <div className="col-span-1 mb-0">
          <FilterInput
            {...{
              id: "username",
              name: "username",
              placeholder: "UserName",
              label: "Username",
              handleSearch: (val: string) => (UserName.current = val.trim()),
            }}
          />
        </div>
        {!router.asPath.includes("admin-management") && (
          <div className="col-span-1 mb-0 ">
            <FilterSelect
              data={userGroupCatalogue?.filter(
                (x) => x.Code !== "USER" && x.Code !== "STOREKEEPERS"
              )}
              placeholder="Quyền hạn"
              label="Quyền hạn"
              isClearable
              select={{ value: "Id", label: "Description" }}
              handleSearch={(val: number) => {
                UserGroupId.current = val;
              }}
            />
          </div>
        )}

        <div
          className={`col-span-${
            router.asPath.includes("admin-management") ? "4" : "3"
          } mb-0 flex justify-between items-end`}
        >
          <IconButton
            onClick={() =>
              handleFilter({
                UserName: UserName.current,
                UserGroupId: UserGroupId.current,
                PageIndex: 1,
              })
            }
            title="Lọc"
            icon="fas fa-filter"
            showLoading
            btnClass="!mr-4"
            toolip="Lọc"
          />
          <div>
            <IconButton
              onClick={handleAddStaff}
              title="Thêm"
              icon="fas fa-plus"
              showLoading
              toolip="Thêm nhân viên"
              green
              btnClass="mr-4"
            />
            <IconButton
              onClick={(data) => onExportExcel(data)}
              title="Xuất"
              icon="fas fa-file-export"
              showLoading
              toolip="Xuất thống kê"
              green
            />
          </div>
        </div>
      </div>
    </>
  );
};
