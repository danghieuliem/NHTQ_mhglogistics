import { Spin } from "antd";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { smallPackage } from "~/api";
import { FormSelect, IconButton } from "~/components";
import { useCatalogue } from "~/hooks";
import { OutStockTable } from "./OutStockTable";

export const OutStockForm = () => {
  const [loading, setLoading] = useState(false);
  const [getForUserName, setGetForUserName] = useState(null);

  const { control, handleSubmit, getValues, reset, watch } =
    useForm<TWarehouseCN>({
      mode: "onBlur",
    });

  const [filter, setFilter] = useState({
    UID: null,
    StatusType: 3,
    OrderType: null,
  });

  const { allUser } = useCatalogue({
    allUserEnabled: true,
  });

  useEffect(() => {
    // setGetForUserName(null);
    if (getValues("UID")) {
      const id = toast.loading("Đang xử lý ...");
      smallPackage
        .getExportForUsername(filter)
        .then((res) => {
          toast.update(id, {
            render: "Lấy thông tin thành công!",
            type: "success",
            isLoading: false,
            autoClose: 500,
          });
          setGetForUserName(res?.Data);
        })
        .catch((error) => {
          toast.update(id, {
            render: (error as any)?.response?.data?.ResultMessage,
            type: "error",
            isLoading: false,
            autoClose: 1000,
          });
        });
    }
  }, [filter]);

  return (
    <Spin spinning={loading}>
      <div className="tableBox grid md:grid-cols-2 gap-4">
        <div className="col-span-1 flex">
          <FormSelect
            control={control}
            name="UID"
            placeholder="Chọn UserName"
            data={allUser}
            isLoading={loading}
            isClearable
            select={{ label: "UserName", value: "Id" }}
            defaultValue={{ UserName: "Chọn UserName", Id: 0 }}
            // callback={(value) => alert(value)}
          />
        </div>

        <div className="col-span-1 flex flex-col xs:flex-row xs:items-center gap-2">
          {watch().UID && (
            <>
              <IconButton
                onClick={() => {
                  setFilter({
                    ...filter,
                    UID: getValues("UID"),
                    OrderType: 0,
                  });
                }}
                icon=""
                btnIconClass="!mr-0"
                title="Lấy tất cả"
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
                icon=""
                btnIconClass="!mr-0"
                title="Lấy đơn mua hộ"
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
                btnIconClass="!mr-0"
                icon=""
                title="Lấy đơn ký gửi"
                toolip=""
              />
            </>
          )}
        </div>
      </div>
      {getForUserName && (
        <OutStockTable data={getForUserName} UID={getValues("UID")} />
      )}
    </Spin>
  );
};
