import { Divider } from "antd";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useQuery, useQueryClient } from "react-query";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { orderShopTemp, searchAPI } from "~/api";
import {
  CardAmount,
  CartOrder,
  Empty,
  FormInput,
  FormSelect,
  Loading,
  UserLayout,
} from "~/components";
import { breadcrumb, dataSearchProduct } from "~/configs";
import { SEOHomeConfigs } from "~/configs/SEOConfigs";
import { RootState, setSelectedShopIds, useAppDispatch } from "~/store";
import { TNextPageWithLayout } from "~/types/layout";
import { _format } from "~/utils";
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
  const userCurrentInfo: TUser = useSelector(
    (state: RootState) => state.userCurrentInfo
  );
  const router = useRouter();
  const [currentCart, setCurrentCart] = useState([]);

  const [note, setNote] = useState<{ [key: number]: string }>();
  const [totalSelectPrice, setTotalSelectPrice] = useState(0);
  const [chosenShopIds, setChosenShopIds] = useState<number[]>([]);
  const [isLoadingData, setIsLoadingData] = useState(true);

  const dispatch = useAppDispatch();

  const {
    refetch: refetchCart,
    isLoading,
    isFetching,
  } = useQuery(
    ["user-cart", router],
    () => orderShopTemp.getList({ UID: userCurrentInfo?.Id }),
    {
      onSuccess: (data) => {
        const newCart = data?.Data?.Items.map((item) => {
          const parseOrderTemps = JSON.parse(item?.OrderTempsJson);
          return {
            ...item,
            OrderTemps: parseOrderTemps,
          };
        });
        setIsLoadingData(false);
        setCurrentCart(newCart);
      },
      onError: (error) => {
        toast.error((error as any)?.response?.data?.ResultMessage);
      },
      retry: false,
      refetchOnWindowFocus: true,
      staleTime: 5000,
      keepPreviousData: true,
      // enabled: currentCart.length === 0,
    }
  );

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
      {window.innerWidth >= 680 && (
        <>
          <TopCartComponent />
          {/* <CartSteps current={1} /> */}
        </>
      )}
      {isLoadingData && (
        <div className="pt-[120px]">
          <Loading />
        </div>
      )}
      {currentCart.length <= 0 && !isLoadingData && <Empty />}
      {currentCart.length > 0 && (
        <div className="cartNewWrapper pb-[100px] md:pb-[50px]">
          <div className="flex flex-wrap gap-1 items-center justify-between lg:mb-4">
            <div className="flex gap-2">
              <div className="flex gap-2 items-center">
                <span className="cartNewWrapper-label">Tổng shop:</span>
                <span className="text-[20px] text-red font-bold">
                  {currentCart?.length}
                </span>
              </div>
              <div className="flex gap-2 items-center">
                <span className="cartNewWrapper-label">Tổng sản phẩm:</span>
                <span className="text-[20px] text-red font-bold">
                  {currentCart.reduce(
                    (cur, prev) => cur + (prev.OrderTemps?.length || 0),
                    0
                  )}
                </span>
              </div>
            </div>
            <div className="">
              <span className="cartNewWrapper-label">Tổng tiền:</span>
              <span className="text-[20px] text-red font-bold ml-2">
                {_format.getVND(
                  currentCart?.reduce((acc, cur) => {
                    return (acc = acc + cur?.PriceVND);
                  }, 0),
                  " đ"
                )}
              </span>
            </div>
          </div>
          <div className="cartNewWrapper-orders pb">
            <CartOrder
              currentCart={currentCart}
              note={note}
              setNote={setNote}
              toggleShopId={toggleShopId}
              chosenShopIds={chosenShopIds}
              refetchCart={refetchCart}
              isFetching={isFetching}
            />
          </div>
          <div className="cartNewWrapper-amount">
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
    </React.Fragment>
  );
};

Index.displayName = SEOHomeConfigs.shopping.shopingBag;
Index.breadcrumb = breadcrumb.shoppingCart;
Index.Layout = UserLayout;

export default Index;
