import { Modal } from "antd";
import { TableRowSelection } from "antd/lib/table/interface";
import router from "next/router";
import React, { useState } from "react";
import { useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { mainOrder, orderShopTemp } from "~/api";
import {
  ActionButton,
  DataTable,
  UserAnotherOrderListFilter,
  showToast,
} from "~/components";
import { ECreatedOrderStatusData, orderStatus } from "~/configs/appConfigs";
import { TColumnsType, TTable } from "~/types/table";
import { _format } from "~/utils";
import TagStatus from "../../status/TagStatus";

export const UserAnotherOrderListTable: React.FC<
  TTable<TOrder> & { type; q; moneyOfOrders; handleFilter }
> = ({
  data,
  selectedRowKeys,
  loading,
  handleModal,
  type,
  q,
  moneyOfOrders,
  handleFilter,
}) => {
  const [delLoading, setDelLoading] = useState(false);
  const queryClient = useQueryClient();

  const handleDeleteProd = async (id: number) => {
    try {
      await mainOrder.delete(id);
      showToast({
        title: "Hủy thành công!",
        message: `Hủy đơn hàng #${id} thành công!`,
        type: "success",
      });
      queryClient.invalidateQueries("orderList");
      setDelLoading(false);
    } catch (error) {
      showToast({
        title: (error as any)?.response?.data?.ResultCode,
        message: (error as any)?.response?.data?.ResultMessage,
        type: "error",
      });
      setDelLoading(false);
    }
  };

  const columns: TColumnsType<TOrder> = [
    {
      dataIndex: "Id",
      title: "ID",
      width: 40,
      responsive: ["lg"],
    },
    {
      dataIndex: "ImageOrigin",
      title: "Ảnh",
      align: "center",
      render: (img) => {
        return (
          <div className="flex justify-center m-auto w-20 h-20">
            <img
              src={img ? img : "/default/pro-empty.jpg"}
              alt="image"
              width={75}
              height={75}
              style={{ borderRadius: "4px" }}
            />
          </div>
        );
      },
      width: 90,
    },
    {
      dataIndex: "TotalPriceVND",
      title: (
        <>
          Tổng tiền <br /> (VNĐ)
        </>
      ),
      align: "right",
      responsive: ["sm"],
      render: (price) => _format.getVND(price, " "),
      width: 120,
    },
    {
      dataIndex: "AmountDeposit",
      title: (
        <>
          Số tiền phải cọc <br /> (VNĐ)
        </>
      ),
      align: "right",
      width: 120,
      responsive: ["md"],
      render: (price) => _format.getVND(price, " "),
    },
    {
      dataIndex: "Deposit",
      title: (
        <>
          Số tiền đã cọc <br />
          (VNĐ)
        </>
      ),
      width: 120,
      align: "right",
      responsive: ["md"],
      render: (price) => _format.getVND(price, " "),
    },
    {
      dataIndex: "DepositDate",
      title: "TimeLine",
      width: 240,
      render: (_, record) => (
        <React.Fragment>
          {record.Created && (
            <p className="flex justify-between px-2">
              <span>Lên đơn: </span>
              <span>
                {_format.getVNDate(record.Created, "HH:mm")} -
                {_format.getVNDate(record.Created, "DD/MM/YYYY")}
              </span>
            </p>
          )}
          {record.DepositDate && (
            <p className="flex justify-between px-2">
              <span>Đặt cọc:</span>
              <span>
                {_format.getVNDate(record.DepositDate, "HH:mm")} -
                {_format.getVNDate(record.DepositDate, "DD/MM/YYYY")}
              </span>
            </p>
          )}
          {record.DateBuy && (
            <p className="flex justify-between px-2">
              <span>Đặt hàng:</span>
              <span>
                {_format.getVNDate(record.DateBuy, "HH:mm")} -
                {_format.getVNDate(record.DateBuy, "DD/MM/YYYY")}
              </span>
            </p>
          )}
          {record.DateTQ && (
            <p className="flex justify-between px-2">
              <span>Đã về kho TQ:</span>
              <span>
                {_format.getVNDate(record.DateTQ, "HH:mm")} -
                {_format.getVNDate(record.DateTQ, "DD/MM/YYYY")}
              </span>
            </p>
          )}
          {record.DateVN && (
            <p className="flex justify-between px-2">
              <span>Đã về kho VN:</span>
              <span>
                {_format.getVNDate(record.DateVN, "HH:mm")} -
                {_format.getVNDate(record.DateVN, "DD/MM/YYYY")}
              </span>
            </p>
          )}
          {record.PayDate && (
            <p className="flex justify-between px-2">
              <span>Thanh toán:</span>
              <span>
                {_format.getVNDate(record.PayDate, "HH:mm")} -
                {_format.getVNDate(record.PayDate, "DD/MM/YYYY")}
              </span>
            </p>
          )}
          {record.CompleteDate && (
            <p className="flex justify-between px-2">
              <span>Hoàn thành:</span>
              <span>
                {_format.getVNDate(record.CompleteDate, "HH:mm")} -
                {_format.getVNDate(record.CompleteDate, "DD/MM/YYYY")}
              </span>
            </p>
          )}
        </React.Fragment>
      ),
      responsive: ["xl"],
    },
    {
      dataIndex: "Status",
      title: "Trạng thái",
      render: (status, record) => {
        const color = orderStatus.find((x) => x.id === status);
        // return <Tag color={color?.color}>{record?.StatusName}</Tag>;
        return (
          <TagStatus color={color?.color} statusName={record?.StatusName} />
        );
      },
      width: 140,
    },
    {
      dataIndex: "action",
      title: "Thao tác",
      align: "right",
      render: (_, record) => {
        if (Number(q) === 3) {
          return (
            <div
              style={{
                pointerEvents: delLoading ? "none" : "all",
                opacity: delLoading ? "0.8" : "1",
              }}
              className="justify-end flex-wrap"
            >
              {Number(q) !== 3 && (
                <ActionButton
                  onClick={() =>
                    Modal.confirm({
                      title: "Xác nhận muốn mua lại đơn hàng này?",
                      onOk: () => {
                        const id = toast.loading("Đang thêm ...");
                        orderShopTemp
                          .addSame({ Id: record?.Id })
                          .then((res) => {
                            toast.update(id, {
                              render:
                                "Thêm đơn thành công, vui lòng kiểm tra giỏ hàng!",
                              type: "success",
                              autoClose: 1000,
                              closeOnClick: true,
                              isLoading: false,
                            });
                          })
                          .catch((error) => {
                            toast.update(id, {
                              render: "Thêm đơn thất bại!",
                              type: "error",
                              isLoading: false,
                            });
                          });
                      },
                    })
                  }
                  isButton={true}
                  icon="fas fa-cart-arrow-down"
                  title="Mua lại đơn"
                />
              )}

              <ActionButton
                onClick={() =>
                  router.push({
                    pathname: "/user/order-list/detail",
                    query: {
                      id: record?.Id,
                    },
                  })
                }
                isButton={true}
                icon="far fa-info-square"
                title="Chi tiết đơn"
              />
              {record?.Status === ECreatedOrderStatusData.Finished && (
                <ActionButton
                  onClick={() =>
                    router.push({
                      pathname: "/user/report/detail",
                      query: {
                        id: record?.Id,
                      },
                    })
                  }
                  icon="fas fa-balance-scale-right"
                  title="Khiếu nại"
                  btnRed
                  isButton={true}
                />
              )}
              {record.IsCheckNotiPrice && (
                <>
                  {record?.Status === ECreatedOrderStatusData.Undeposited && (
                    <ActionButton
                      onClick={() => {
                        type.current = "deposit";
                        handleModal([record], undefined, "one");
                      }}
                      icon="far fa-dollar-sign"
                      title="Đặt cọc"
                      btnYellow
                      isButton={true}
                    />
                  )}
                  {record?.Status ===
                    ECreatedOrderStatusData.ArrivedToVietNamWarehouse && (
                    <ActionButton
                      onClick={() => {
                        type.current = "payment";
                        handleModal([record], undefined, "one");
                      }}
                      icon="fas fa-credit-card"
                      title="Thanh toán"
                      isButtonClassName="!bg-blue"
                      isButton={true}
                    />
                  )}
                </>
              )}
              {record?.Status === 0 && (
                <ActionButton
                  onClick={() =>
                    Modal.confirm({
                      title: "Xác nhận xóa đơn hàng?",
                      onOk: () => handleDeleteProd(record?.Id),
                    })
                  }
                  icon="fas fa-trash"
                  isButtonClassName="!bg-red !text-white"
                  title="Hủy đơn!"
                  btnYellow
                  isButton={true}
                />
              )}
            </div>
          );
        } else {
          return (
            <div
              style={{
                pointerEvents: delLoading ? "none" : "all",
                opacity: delLoading ? "0.8" : "1",
              }}
              className="justify-end flex-wrap"
            >
              <ActionButton
                isButton={true}
                onClick={() =>
                  Modal.confirm({
                    title: "Xác nhận muốn mua lại đơn hàng này?",
                    onOk: () => {
                      const id = toast.loading("Đang thêm ...");
                      orderShopTemp
                        .addSame({ Id: record?.Id })
                        .then((res) => {
                          toast.update(id, {
                            render:
                              "Thêm đơn thành công, vui lòng kiểm tra giỏ hàng!",
                            type: "success",
                            autoClose: 1000,
                            closeOnClick: true,
                            isLoading: false,
                          });
                        })
                        .catch((error) => {
                          toast.update(id, {
                            render: "Thêm đơn thất bại!",
                            type: "error",
                            isLoading: false,
                          });
                        });
                    },
                  })
                }
                icon="fas fa-cart-arrow-down"
                title="Mua lại đơn"
              />
              <ActionButton
                onClick={() =>
                  router.push({
                    pathname: "/user/order-list/detail",
                    query: {
                      id: record?.Id,
                    },
                  })
                }
                isButton={true}
                icon="far fa-info-square"
                title="Chi tiết đơn"
              />

              {record?.Status === ECreatedOrderStatusData.Finished && (
                <ActionButton
                  onClick={() =>
                    router.push({
                      pathname: "/user/report/detail",
                      query: {
                        id: record?.Id,
                      },
                    })
                  }
                  icon="fas fa-balance-scale-right"
                  title="Khiếu nại"
                  btnRed
                  isButton={true}
                />
              )}
              {record?.Status === ECreatedOrderStatusData.Undeposited && (
                <ActionButton
                  onClick={() => {
                    type.current = "deposit";
                    handleModal([record], undefined, "one");
                  }}
                  icon="far fa-dollar-sign"
                  title="Đặt cọc"
                  btnYellow
                  isButton={true}
                />
              )}
              {record?.Status ===
                ECreatedOrderStatusData.ArrivedToVietNamWarehouse && (
                <ActionButton
                  onClick={() => {
                    type.current = "payment";
                    handleModal([record], undefined, "one");
                  }}
                  icon="fas fa-credit-card"
                  title="Thanh toán"
                  isButtonClassName="!bg-blue !text-white"
                  isButton={true}
                />
              )}
              {record?.Status === ECreatedOrderStatusData.Undeposited && (
                <ActionButton
                  onClick={() =>
                    Modal.confirm({
                      title: "Xác nhận xóa đơn hàng?",
                      onOk: () => handleDeleteProd(record?.Id),
                    })
                  }
                  icon="fas fa-trash"
                  title="Hủy đơn!"
                  isButtonClassName="!bg-red !text-white"
                  isButton={true}
                />
              )}
            </div>
          );
        }
      },
      responsive: ["xl"],
      width: 120,
      fixed: "right",
    },
  ];

  const rowSelection: TableRowSelection<TOrder> = {
    selectedRowKeys,
    getCheckboxProps: (record) => {
      return record.Status ===
        ECreatedOrderStatusData.ArrivedToVietNamWarehouse ||
        record.Status === ECreatedOrderStatusData.Undeposited
        ? { name: record.Id.toString(), disabled: false }
        : { name: record.Id.toString(), disabled: true, className: "!hidden" };
    },
    onChange: (selectedRowKeys: React.Key[], selectedRows: TOrder[]) =>
      handleModal(selectedRows, undefined, "some"),
    // hideSelectAll: true,
    // columnWidth: 26,
  };

  const expandable = {
    expandedRowRender: (record: any) => {
      return (
        <div className="extentable">
          <div className="extentable-content">
            <div className="extentable-row lg:hidden">
              <span className="extentable-label">Id đơn: </span>
              <span className="extentable-value">{record?.Id}</span>
            </div>
            <div className="extentable-row sm:hidden">
              <span className="extentable-label">Tổng tiền: </span>
              <span className="extentable-value">
                {_format.getVND(record?.TotalPriceVND)}
              </span>
            </div>
            <div className="extentable-row md:hidden">
              <span className="extentable-label">Số tiền phải cọc: </span>
              <span className="extentable-value">
                {_format.getVND(record?.AmountDeposit)}
              </span>
            </div>
            <div className="extentable-row md:hidden">
              <span className="extentable-label">Số tiền đã cọc: </span>
              <span className="extentable-value">
                {_format.getVND(record?.Deposit)}
              </span>
            </div>
            <div className="extentable-row">
              <span className="extentable-label !text-red">
                Số tiền còn lại:{" "}
              </span>
              <span className="extentable-value !text-red">
                {_format.getVND(
                  record?.TotalPriceVND - record?.Deposit,
                  " VNĐ"
                )}
              </span>
            </div>

            {/* timeline */}
            {[
              {
                title: "Lên đơn",
                value: record.Created,
              },
              {
                title: "Đặt cọc",
                value: record.DepositDate,
              },
              {
                title: "Đặt hàng",
                value: record.DateBuy,
              },
              {
                title: "Đã về kho TQ",
                value: record.DateTQ,
              },
              {
                title: "Đã về kho VN",
                value: record.DateVN,
              },
              {
                title: "Thanh toán",
                value: record.PayDate,
              },
              {
                title: "Hoàn thành",
                value: record.CompleteDate,
              },
            ].map(
              (item) =>
                item?.value && (
                  <div className="extentable-row">
                    <span className="extentable-label">{item?.title}: </span>
                    <span className="extentable-value">
                      {_format.getVNDate(item?.value, "HH:mm")} -
                      {_format.getVNDate(item?.value, "DD/MM/YYYY")}
                    </span>
                  </div>
                )
            )}
          </div>
          <div className="extentable-actions">
            {/* button detail */}
            <div className="extentable-button">
              <ActionButton
                onClick={() =>
                  router.push({
                    pathname: "/user/order-list/detail",
                    query: {
                      id: record?.Id,
                    },
                  })
                }
                isButton={true}
                icon="far fa-info-square"
                title="Chi tiết đơn"
              />
            </div>

            {/* mua lại */}
            {Number(q) !== 3 && (
              <div className="extentable-button">
                <ActionButton
                  onClick={() =>
                    Modal.confirm({
                      title: "Xác nhận muốn mua lại đơn hàng này?",
                      onOk: () => {
                        const id = toast.loading("Đang thêm ...");
                        orderShopTemp
                          .addSame({ Id: record?.Id })
                          .then((res) => {
                            toast.update(id, {
                              render:
                                "Thêm đơn thành công, vui lòng kiểm tra giỏ hàng!",
                              type: "success",
                              autoClose: 1000,
                              closeOnClick: true,
                              isLoading: false,
                            });
                          })
                          .catch((error) => {
                            toast.update(id, {
                              render: "Thêm đơn thất bại!",
                              type: "error",
                              isLoading: false,
                            });
                          });
                      },
                    })
                  }
                  isButton={true}
                  icon="fas fa-cart-arrow-down"
                  title="Mua lại đơn"
                />
              </div>
            )}

            {/* khiếu nại */}
            {record?.Status === ECreatedOrderStatusData.Finished && (
              <div className="extentable-button">
                <ActionButton
                  onClick={() =>
                    router.push({
                      pathname: "/user/report/detail",
                      query: {
                        id: record?.Id,
                      },
                    })
                  }
                  icon="fas fa-balance-scale-right"
                  title="Khiếu nại"
                  btnRed
                  isButton={true}
                />
              </div>
            )}

            {Number(q) === 3 ? (
              <>
                {record?.IsCheckNotiPrice && (
                  <>
                    {record?.Status === ECreatedOrderStatusData.Undeposited && (
                      <div className="extentable-button">
                        <ActionButton
                          onClick={() => {
                            type.current = "deposit";
                            handleModal([record], undefined, "one");
                          }}
                          icon="far fa-dollar-sign"
                          title="Đặt cọc"
                          btnYellow
                          isButton={true}
                        />
                      </div>
                    )}
                    {record?.Status ===
                      ECreatedOrderStatusData.ArrivedToVietNamWarehouse && (
                      <div className="extentable-button">
                        <ActionButton
                          onClick={() => {
                            type.current = "payment";
                            handleModal([record], undefined, "one");
                          }}
                          icon="fas fa-credit-card"
                          title="Thanh toán"
                          btnBlue
                          isButton={true}
                        />
                      </div>
                    )}
                  </>
                )}
                {record?.Status === 0 && (
                  <div className="extentable-button">
                    <ActionButton
                      onClick={() =>
                        Modal.confirm({
                          title: "Xác nhận xóa đơn hàng?",
                          onOk: () => handleDeleteProd(record?.Id),
                        })
                      }
                      icon="fas fa-trash"
                      title="Hủy đơn!"
                      btnYellow
                      isButton={true}
                    />
                  </div>
                )}
              </>
            ) : (
              <>
                {record?.Status === ECreatedOrderStatusData.Undeposited && (
                  <div className="extentable-button">
                    <ActionButton
                      onClick={() => {
                        type.current = "deposit";
                        handleModal([record], undefined, "one");
                      }}
                      icon="far fa-dollar-sign"
                      title="Đặt cọc"
                      btnYellow
                      isButton={true}
                    />
                  </div>
                )}
                {record?.Status ===
                  ECreatedOrderStatusData.ArrivedToVietNamWarehouse && (
                  <div className="extentable-button">
                    <ActionButton
                      onClick={() => {
                        type.current = "payment";
                        handleModal([record], undefined, "one");
                      }}
                      icon="fas fa-credit-card"
                      title="Thanh toán"
                      btnBlue
                      isButton={true}
                    />
                  </div>
                )}
                {record?.Status === ECreatedOrderStatusData.Undeposited && (
                  <div className="extentable-button">
                    <ActionButton
                      onClick={() =>
                        Modal.confirm({
                          title: "Xác nhận xóa đơn hàng?",
                          onOk: () => handleDeleteProd(record?.Id),
                        })
                      }
                      icon="fas fa-trash"
                      title="Hủy đơn!"
                      btnYellow
                      isButton={true}
                    />
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      );
    },
  };

  return (
    <DataTable
      {...{
        columns,
        data,
        bordered: true,
        rowSelection,
        loading,
        title: q === "3" ? "Danh sách đơn mua hộ khác" : "Danh sách đơn mua hộ",
        expandable: expandable,
        scroll: { y: 640 },
        mediaWidth: 1200,
        extraElment: (
          <UserAnotherOrderListFilter
            moneyOfOrders={moneyOfOrders}
            numberOfOrder={orderStatus}
            handleFilter={handleFilter}
            handleDepositAll={() => {
              type.current = "deposit";
              handleModal(
                (data as any)?.Items?.filter(
                  (item) => item.Status === ECreatedOrderStatusData.Undeposited
                ),
                undefined,
                "all"
              );
            }}
            handlePaymentAll={() => {
              type.current = "payment";
              handleModal(
                (data as any)?.Items?.filter(
                  (item) =>
                    item.Status ===
                    ECreatedOrderStatusData.ArrivedToVietNamWarehouse
                ),
                undefined,
                "all"
              );
            }}
          />
        ),
      }}
    />
  );
};
