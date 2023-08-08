import { Popconfirm, Space, Tooltip } from "antd";
import React, { useCallback, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { menu, pageType } from "~/api";
import {
  ActionButton,
  AddChildContentFormMemo,
  AddNewContentFormMemo,
  DataTable,
  EditContentFormMemo,
  toast,
} from "~/components";
import { IconButton } from "~/components/globals/button/IconButton";
import { TColumnsType, TTable } from "~/types/table";
import TagStatus from "../../status/TagStatus";

export const ContentMenuList: React.FC<TTable<any>> = ({ data }) => {
  const [addNewModal, setAddNewModal] = useState(false);
  const [edit, setEdit] = useState(0);
  const [child, setChild] = useState(0);

  const queryClient = useQueryClient();
  const mutationDelete = useMutation((id: any) => menu.delete(id), {
    onSuccess: () => {
      queryClient.invalidateQueries("menuData");
      toast.success("Xoá thành công");
    },
    onError: toast.error,
  });

  const _onRemove = async (id: any) => {
    try {
      await mutationDelete.mutateAsync(id);
    } catch (error) {}
  };

  const columns: TColumnsType<any> = [
    {
      dataIndex: "Position",
      title: "Vị trí",
      render: (_, __, index) => ++index,
      width: 80,
    },
    {
      dataIndex: "Name",
      title: "Tên menu",
      width: 120,
    },
    {
      dataIndex: "Active",
      title: "Trạng thái",
      render: (_, record) => (
        <TagStatus
          color={record?.Active ? "green" : "red"}
          statusName={record?.Active ? "Hiện" : "Ẩn"}
        />
      ),
      width: 120,
    },
    {
      dataIndex: "action",
      title: "Thao tác",
      render: (_, record) => (
        <div className="flex gap-1 flex-wrap justify-center">
          <ActionButton
            icon="fas fa-edit"
            onClick={() => setEdit(record?.Id)}
            title="Chỉnh sửa nội dung"
            iconContainerClassName="!text-sec p-0"
          />
          <ActionButton
            icon="fas fa-layer-plus"
            onClick={() => setChild(record?.Id)}
            title="Thêm menu con"
            iconContainerClassName="!text-sec p-0"
          />
          <Popconfirm
            onConfirm={() => _onRemove(record?.Id)}
            placement="topRight"
            title="Bạn muốn xoá menu này?"
            okText="Yes"
            cancelText="No"
          >
            <ActionButton
              icon="fas fa-trash-alt"
              title="Delete"
              iconContainerClassName="!text-sec p-0"
            />
          </Popconfirm>
        </div>
      ),
      width: 120,
    },
  ];

  const { data: categogyList, isFetching } = useQuery(
    [
      "pageType",
      {
        PageIndex: 1,
        PageSize: 1000,
        OrderBy: "Id desc",
      },
    ],
    () =>
      pageType
        .getList({
          PageIndex: 1,
          PageSize: 1000,
          OrderBy: "Id desc",
        })
        .then((res) => {
          return res?.Data;
        }),
    {
      onSuccess: (data) => data?.Items,
      onError: toast.error,
    }
  );

  const handleCloseEditModal = useCallback(() => setEdit(0), []);

  return (
    <React.Fragment>
      <DataTable
        {...{
          data: data,
          columns,
          isExpand: true,
          title: "Danh sách menu",
          scroll: { x: 100, y: 400 },
          extraElment: (
            <IconButton
              onClick={() => setAddNewModal(true)}
              title="Thêm"
              icon="far fa-plus"
              showLoading
              toolip="Thêm menu"
              btnClass="!bg-green mt-[-10px]"
            />
          ),
          expandable: {
            expandIcon: ({ expanded, onExpand, record }) =>
              record?.Children.length > 0 ? (
                <>
                  {expanded ? (
                    <i
                      className="fas fa-folder-open"
                      onClick={(e) => onExpand(record, e)}
                    ></i>
                  ) : (
                    <i
                      className="fas fa-folder-plus"
                      onClick={(e) => onExpand(record, e)}
                    ></i>
                  )}
                </>
              ) : (
                <div className="">
                  <i className="fas fa-folder"></i>
                </div>
              ),
            expandedRowRender: (record) => {
              const OrderBy = record?.Children.sort(
                (a, b) => a?.Position - b?.Position
              );
              return OrderBy?.map((item) => (
                <div
                  key={item?.Id}
                  className="flex justify-between items-center"
                >
                  <div className="">
                    {/* <Tooltip title="Vị trí menu" className="mr-4">
												{item?.Position}
											</Tooltip> */}
                    <Tooltip
                      title="Tên menu con"
                      className="ml-1 text-[14px] text-[#6b6f82]"
                    >
                      {item?.Name}
                    </Tooltip>
                    <Tooltip title="Trạng thái">
                      <TagStatus
                        color={item?.Active ? "green" : "red"}
                        statusName={item?.Active ? "Hiện" : "Ẩn"}
                      />
                    </Tooltip>
                    {/* <Tooltip title="Trạng thái">
												<Tag color={item?.Active ? "green" : "red"}>{item?.Active ? "Hiện" : "Ẩn"}</Tag>
											</Tooltip> */}
                  </div>
                  <Space>
                    <div>
                      <ActionButton
                        icon="fas fa-edit"
                        onClick={() => {
                          setEdit(item)
                        }}
                        title="Chỉnh sửa nội dung"
                      />
                    </div>
                    <div>
                      <Popconfirm
                        onConfirm={() => _onRemove(item?.Id)}
                        placement="topRight"
                        title="Bạn muốn xoá menu này?"
                        okText="Yes"
                        cancelText="No"
                      >
                        <ActionButton
                          icon="fas fa-trash-alt"
                          title="Delete"
                          iconContainerClassName="iconGreen"
                        />
                      </Popconfirm>
                    </div>
                  </Space>
                </div>
              ));
            },
            rowExpandable: (record) => record?.Children.length > 0,
          },
        }}
      />
      <AddNewContentFormMemo
        visible={addNewModal}
        onCancel={() => setAddNewModal(false)}
        categogyList={categogyList?.Items}
      />
      <EditContentFormMemo
        edit={data?.find((x) => x.Id === edit) || edit}
        onCancel={handleCloseEditModal}
        categogyList={categogyList?.Items}
      />
      <AddChildContentFormMemo
        child={child}
        categogyList={categogyList?.Items}
        onCancel={() => setChild(0)}
      />
    </React.Fragment>
  );
};
