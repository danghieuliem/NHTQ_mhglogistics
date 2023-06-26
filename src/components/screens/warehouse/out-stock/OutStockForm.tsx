import { Spin } from "antd";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import { smallPackage, user } from "~/api";
import { FormSelect, IconButton } from "~/components";
import { OutStockTable } from "./OutStockTable";

export const OutStockForm = () => {
  const [loading, setLoading] = useState(false);
  const [getForUserName, setGetForUserName] = useState(null);

  const { control, handleSubmit, getValues, reset } = useForm<TWarehouseCN>({
    mode: "onBlur",
  });

  const [filter, setFilter] = useState({
    UID: null,
    StatusType: 3,
    OrderType: null,
  });

  useEffect(() => {
    setGetForUserName(null);

    if (getValues("UID")) {
      const id = toast.loading("Đang xử lý ...");
      smallPackage
        .getExportForUsername(filter)
        .then((res) => {
          toast.update(id, {
            render: "Lấy thông tin thành công!",
            type: "success",
            isLoading: false,
            autoClose: 1000,
          });
          setGetForUserName(res?.Data);
        })
        .catch((error) => {
          toast.update(id, {
            render:
              (error as any)?.response?.data?.ResultCode === 401 &&
              "Không thể lấy danh sách!",
            type: "error",
            isLoading: false,
            autoClose: 1000,
          });
        });
    }
  }, [filter.UID, filter.OrderType]);

  const { isFetching, data } = useQuery(["users"], () =>
    user
      .getList({
        PageIndex: 1,
        PageSize: 1000000,
        OrderBy: "Id desc",
      })
      .then((res) => res.Data)
  );

  return (
    <Spin spinning={loading}>
      <div className="tableBox grid grid-cols-2 gap-4">
        <div className="md:col-span-2 xl:col-span-1 flex">
          <FormSelect
            control={control}
            name="UID"
            placeholder="Chọn UserName"
            data={data?.Items}
            label="Chọn khách hàng"
            isLoading={isFetching}
            isClearable
            select={{ label: "UserName", value: "Id" }}
            defaultValue={{ UserName: "Chọn UserName", Id: 0 }}
            // callback={(value) => alert(value)}
          />
        </div>

        <div className="md:col-span-2 xl:col-span-1 flex items-end">
          <IconButton
            onClick={() => {
              if (!getValues("UID")) {
                toast.warn("Vui lòng chọn Username!");
                return;
              }
              setFilter({
                ...filter,
                UID: getValues("UID"),
                OrderType: 0,
              });
            }}
            btnClass="!mr-4 ml-4"
            icon="fas fa-hand-holding-box"
            btnIconClass="!mr-2"
            title="Lấy tất cả!"
            toolip=""
            blue
          />
          <IconButton
            onClick={() =>
              setFilter({
                ...filter,
                UID: getValues("UID"),
                OrderType: 1,
              })
            }
            icon="fas fa-hand-holding-box"
            btnIconClass="!mr-2"
            btnClass="!mr-4"
            title="Lấy đơn mua hộ!"
            toolip=""
            green
          />
          <IconButton
            onClick={() =>
              setFilter({
                ...filter,
                UID: getValues("UID"),
                OrderType: 2,
              })
            }
            icon="fas fa-hand-holding-box"
            btnIconClass="!mr-2"
            title="Lấy đơn ký gửi!"
            toolip=""
          />
        </div>
      </div>
      {getForUserName && (
        <OutStockTable data={getForUserName} UID={getValues("UID")} />
      )}
    </Spin>
  );
};
