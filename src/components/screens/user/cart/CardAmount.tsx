import { Checkbox } from "antd";
import { isEqual } from "lodash";
import { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { orderShopTemp } from "~/api";
import { ActionButton, IconButton } from "~/components";
import { _format } from "~/utils";

export const CardAmount = ({
  currentCart,
  allShopIds,
  chosenShopIds,
  toggleAllShopId,
  // totalSelectPrice,
  refetchCart,
  isFetching,
  onPress,
}) => {
  const [totalSelectPrice, setTotalSelectPrice] = useState(0);
  const mutationDeleteShop = useMutation(orderShopTemp.delete);
  const [disabledDel, setdisabledDel] = useState(false);

  useEffect(() => {
    const handleCountMoney = () => {
      const newArr = currentCart.filter((x) => {
        for (let i in chosenShopIds) {
          if (chosenShopIds[i] === x.Id) {
            return x;
          }
        }
      });
      setTotalSelectPrice(newArr.reduce((a, b) => a + b?.PriceVND, 0));
    };

    if (chosenShopIds.length >= 0) {
      handleCountMoney();
    }
  }, [chosenShopIds, currentCart]);

  return (
    <div className="component-container">
      <div className="flex items-center justify-between flex-wrap">
        <div className="flex items-center">
          <Checkbox
            checked={
              allShopIds?.length === currentCart?.length
                ? isEqual(chosenShopIds, allShopIds)
                : false
            }
            onChange={toggleAllShopId}
          ></Checkbox>
          <span className="ml-4 cartNewWrapper-label !text-white">Chọn tất cả</span>
        </div>
        <div className="flex items-center">
          <span className="mt-[2px] flex items-center cartNewWrapper-label text-white">
            Tổng tiền:
          </span>
          <span className="ml-2 text-[22px] text-red font-bold ">
            {_format.getVND(totalSelectPrice, " đ")}
          </span>
        </div>

        <div className="ml-auto sm:ml-0 flex items-center">
          <IconButton
            onClick={() => {
              const id = toast.loading("Đang xử lý ...");
              setdisabledDel(true);
              for (let i in chosenShopIds) {
                mutationDeleteShop
                  .mutateAsync(chosenShopIds[i])
                  .then(() => {
                    const target = chosenShopIds.indexOf(chosenShopIds[i]);
                    chosenShopIds.splice(target, 1);
                    if (chosenShopIds.length <= 0) {
                      refetchCart();
                      toast.update(id, {
                        render: "Xoá giỏ hàng ",
                        type: "success",
                        isLoading: false,
                        autoClose: 1000,
                      });
                      setdisabledDel(false);
                    }
                  })
                  .catch((error) => {
                    toast.update(id, {
                      render: (error as any)?.response?.data?.ResultMessage,
                      type: "error",
                      isLoading: false,
                      autoClose: 1000,
                    });
                    setdisabledDel(false);
                  });
              }
            }}
            // icon={loading ? "fas fa-sync fa-spin" : "fas fa-trash-alt"}
            icon={"fas fa-trash-alt"}
            title=""
            showLoading
            toolip="Xóa giỏ hàng đã chọn!"
            btnClass={`!bg-red !text-white mr-2`}
            btnIconClass="!mr-0"
            disabled={chosenShopIds.length === 0}
          />
          <ActionButton
            onClick={() => onPress("some")}
            icon="mr-0"
            title={`Đặt đơn đã chọn (${chosenShopIds.length})`}
            disabled={chosenShopIds.length === 0}
            isButton
            isButtonClassName="bg-blue hover:!bg-green !text-white w-[250px] !justify-center"
          />
        </div>
      </div>
    </div>
  );
};
