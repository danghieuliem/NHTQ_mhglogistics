import { Checkbox } from "antd";
import { isEqual } from "lodash";
import { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { orderShopTemp } from "~/api";
import { IconButton } from "~/components";
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
    <div className="cartAmountContainer">
      <div className="tableBox !py-2 md:w-[calc(4/12*100%)] xl:w-full !max-w-none statistic !mb-4 flex-col !items-baseline">
        <div className="font-semibold col-span-1 mb-4">
          <Checkbox
            checked={
              allShopIds?.length === currentCart?.length
                ? isEqual(chosenShopIds, allShopIds)
                : false
            }
            onChange={toggleAllShopId}
          >
            <span>Tất cả sản phẩm</span>
          </Checkbox>
        </div>
        <div className="col-span-1 !w-full">
          <div className="flex flex-col justify-between pb-4 items-end">
            <div className="!text-main !text-base  flex tracking-wide font-semibold">
              <span className="mt-[2px] flex items-center">Tổng tiền</span>
            </div>
            <span className="text-xl text-orange">
              {_format.getVND(totalSelectPrice, " VNĐ")}
            </span>
          </div>
          <div className="flex ml-auto justify-between">
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
              btnClass={`!bg-orange !text-white ${
                chosenShopIds.length !== 0 ? "" : "hidden"
              }`}
              btnIconClass="!mr-0"
              disabled={disabledDel}
            />
            <IconButton
              showLoading
              onClick={() => onPress("some")}
              icon="fas fa-box-check"
              title={`Đặt đơn đã chọn (${chosenShopIds.length})`}
              btnClass={`!bg-orange !text-white ${
                chosenShopIds.length !== 0 ? "" : "hidden"
              }`}
              toolip=""
            />
          </div>
        </div>
      </div>
      <div className="flex justify-between md:w-[calc(4/12*100%)] xl:w-full">
        <div className="!items-baseline tableBox !py-2 statistic w-[48%] !mb-4 flex-col">
          <div className="box !flex-row justify-between !m-0 w-full">
            <span className="font-bold text-[24px] text-[#52bd87]">
              {_format.getVND(currentCart?.length, "")}
            </span>
            <div className="iconBox !bg-[#52bd87] !mb-0">
              <i className="fas fa-store icon"></i>
            </div>
          </div>
          <span className="font-bold uppercase text-[12px] text-[#7a7a7a] mt-4">
            <span className="">Shop</span>
          </span>
        </div>
        <div className="!items-baseline tableBox !py-2 statistic w-[48%] !mb-4 flex-col">
          <div className="box !flex-row justify-between !m-0 w-full">
            <span className="font-bold text-[24px] text-[#3363ff]">
              {_format.getVND(
                currentCart.reduce(
                  (cur, prev) => cur + (prev.OrderTemps?.length || 0),
                  0
                ),
                ""
              )}
            </span>
            <div className="iconBox !bg-[#3363ff] !mb-0">
              <i className="fas fa-shopping-bag icon"></i>
            </div>
          </div>
          <span className="font-bold uppercase text-[12px] text-[#7a7a7a] mt-4">
            <span className="">Sản phẩm</span>
          </span>
        </div>
      </div>
      <div className="statistic tableBox !max-w-none md:w-[calc(4/12*100%)] xl:w-full md:!mb-4">
        <div className="box !flex-row justify-between !m-0 w-full">
          <div className="flex w-full justify-between items-end mb-3">
            <span className="font-bold uppercase text-[12px] text-[#7a7a7a] mt-4">
              <span className="">Tổng tiền</span>
            </span>
            <div className="box !flex-row justify-between !m-0">
              <div className="iconBox !bg-[#f78440] !mb-0">
                <i className="fas fa-dollar-sign icon"></i>
              </div>
            </div>
          </div>
          <span className="font-bold text-[24px] text-[#f78440]">
            {_format.getVND(
              currentCart?.reduce((acc, cur) => {
                return (acc = acc + cur?.PriceVND);
              }, 0),
              " "
            )}
          </span>
        </div>
      </div>
    </div>
  );
};