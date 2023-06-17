import { LoadingOutlined } from "@ant-design/icons";
import { Divider, Empty, Spin } from "antd";
import React, { useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import { orderShopTemp, searchAPI } from "~/api";
import {
  CardAmount,
  CartOrder,
  CartSteps,
  FormInput,
  FormSelect,
  showToast,
  UserLayout,
} from "~/components";
import { SEOHomeConfigs } from "~/configs/SEOConfigs";
import { TNextPageWithLayout } from "~/types/layout";
import router from "next/router";
import { useForm } from "react-hook-form";
import { dataSearchProduct } from "~/configs";
import {
  selectUser,
  setSelectedShopIds,
  useAppDispatch,
  useAppSelector,
} from "~/store";
import { toast } from "react-toastify";
type TSearch = {
  Id: number;
  SearchItem: string;
};

const TopCartComponent = () => {
  const queryClient = useQueryClient();
  const { control: controlSearch, handleSubmit: handleSubmitSearch } =
    useForm<TSearch>({
      mode: "onBlur",
      defaultValues: {
        Id: 1,
      },
    });
  const handleSearchProduct = async (newData: any) => {
    let search = newData?.SearchItem;
    let idItem = newData?.Id;

    if (!idItem) {
      toast.warning("Bạn chưa chọn shop!");
      return;
    }

    if (!search) {
      toast.warning("Bạn chưa nhập nội dung tìm kiếm!");
      return;
    }

    try {
      queryClient.fetchQuery([], () => {
        toast.info("Đang search ...");
        return searchAPI
          .getSearch({ site: idItem, content: search })
          .then((res) => {
            window.open(res?.Data);
          });
      });
    } catch (error) {
      toast.error;
    }
  };
  return (
    <div className="tableBox cartSearch">
      <div className="cartSearch-title">Tìm kiếm sản phẩm</div>
      <div className="cartSearch-box">
        <div className="cartSearch-select">
          <FormSelect
            control={controlSearch}
            name="Id"
            select={{ label: "name", value: "id" }}
            defaultValue={dataSearchProduct[0]}
            placeholder=""
            label=""
            data={dataSearchProduct}
            indicatorSeparator={null}
            required={false}
            styles={{
              control: (base) => ({
                ...base,
                width: 120,
                backgroundColor: "transparent",
                borderRadius: "4px",
                border: "none",
              }),
              menu: (base) => ({
                ...base,
                width: "120px",
                top: "110%",
              }),
            }}
          />
        </div>
        <Divider type="vertical" className="!h-5 bg-[#e1e1e1]" />
        <div className="cartSearch-input">
          <FormInput
            control={controlSearch}
            name="SearchItem"
            type="text"
            placeholder="Nhập sản phẩm tìm kiếm (Nhấn enter)"
            allowClear={false}
            onEnter={handleSubmitSearch(handleSearchProduct)}
            inputClassName="!border-none"
          />
          <div
            className="cartSearch-button"
            onClick={handleSubmitSearch(handleSearchProduct)}
          >
            <i className="far fa-search"></i>
          </div>
        </div>
      </div>
    </div>
  );
};

const Index: TNextPageWithLayout = () => {
  const { user } = useAppSelector(selectUser);
  const [currentCart, setCurrentCart] = useState([]);

  const [note, setNote] = useState<{ [key: number]: string }>();
  const [totalSelectPrice, setTotalSelectPrice] = useState(0);
  const [chosenShopIds, setChosenShopIds] = useState<number[]>([]);

  const UserId = user?.UserId;
  const dispatch = useAppDispatch();

  const {
    refetch: refetchCart,
    isLoading,
    isFetching,
  } = useQuery(["user-cart"], () => orderShopTemp.getList({ UID: UserId }), {
    onSuccess: (data) => {
      const newCart = data?.Data?.Items.map((item) => {
        const parseOrderTemps = JSON.parse(item?.OrderTempsJson);
        return {
          ...item,
          OrderTemps: parseOrderTemps,
        };
      });

      setCurrentCart(newCart);
    },
    onError: (error) => {
      showToast({
        title: (error as any)?.response?.data?.ResultCode,
        message: (error as any)?.response?.data?.ResultMessage,
        type: "error",
      });
    },
    enabled: !!UserId,
    retry: false,
  });

  // function handleCalTotalPriceSelect(arr) {
  //   return arr.map((itemId) => {
  //     for (let i in currentCart) {
  //       if (itemId === currentCart[i]?.Id) {
  //         return currentCart[i]?.PriceVND;
  //       }
  //     }
  //   });
  // }

  const toggleAllShopId = () => {
    setChosenShopIds(
      chosenShopIds.length <= 0 ? currentCart?.map((item) => item?.Id) : []
    );
    setTotalSelectPrice(
      chosenShopIds.length <= 0
        ? () =>
            currentCart.reduce((acc, cur) => {
              return (acc = acc + cur?.PriceVND);
            }, 0)
        : 0
    );
  };

  const toggleShopId = (shopId: number) => {
    setChosenShopIds((oldState) => {
      const shopIdIndex = oldState.indexOf(shopId);
      let newState = [];
      if (shopIdIndex === -1) {
        newState = [...oldState, shopId];
      } else {
        newState = oldState.filter((id) => id !== shopId);
      }
      // const totalPrice = handleCalTotalPriceSelect(newState);
      // setTotalSelectPrice(totalPrice.reduce((a, b) => a + b, 0));
      return newState;
    });
  };

  const onPress = async () => {
    dispatch(setSelectedShopIds(chosenShopIds));
    router.push("/user/cart/payment");
  };

  return (
    <React.Fragment>
      <div className="titlePageUser">Giỏ hàng</div>
      {window.innerWidth >= 680 && (
        <>
          <TopCartComponent />
          <CartSteps current={1} />
        </>
      )}
      {isFetching && isLoading ? (
        <span className="bg-[#fff] flex w-full h-[300px] items-center justify-center">
          <Spin indicator={<LoadingOutlined style={{ fontSize: 80 }} spin />} />
        </span>
      ) : (
        <>
          {currentCart.length <= 0 ? (
            <Empty
              description="Không tìm thấy sản phẩm nào trong giỏ hàng"
              className="bg-[#fff] h-[300px] flex flex-col items-center justify-center"
            />
          ) : (
            <div className="grid xl:grid-cols-12 gap-4">
              <div className="md:order-2 xl:order-1 xl:col-span-9">
                <CartOrder
                  currentCart={currentCart}
                  note={note}
                  setNote={setNote}
                  toggleShopId={toggleShopId}
                  chosenShopIds={chosenShopIds}
                  refetchCart={refetchCart}
                />
              </div>
              <div className="md:order-1 xl:order-2 xl:col-span-3">
                <CardAmount
                  isFetching={isFetching}
                  currentCart={currentCart}
                  allShopIds={chosenShopIds}
                  chosenShopIds={chosenShopIds}
                  toggleAllShopId={toggleAllShopId}
                  // totalSelectPrice={totalSelectPrice}
                  onPress={onPress}
                  refetchCart={refetchCart}
                />
              </div>
            </div>
          )}
        </>
      )}
    </React.Fragment>
  );
};

Index.displayName = SEOHomeConfigs.shopping.shopingBag;
Index.Layout = UserLayout;

export default Index;
