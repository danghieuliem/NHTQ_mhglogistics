import axios, { AxiosRequestConfig } from "axios";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { UserLayout, toast } from "~/components";
import {
  LayoutLeft,
  LayoutRight,
} from "~/components/screens/user/searchProduct";
import { TNextPageWithLayout } from "~/types/layout";
import { ShopName } from "~/configs";

const options = (id: string) => {
  return {
    method: "GET",
    url: "https://otapi-1688.p.rapidapi.com/BatchGetItemFullInfo",
    params: {
      language: "vi",
      itemId: id,
    },
    headers: {
      "X-RapidAPI-Key": process.env.NEXT_PUBLIC_X_RAPIDAPI_KEY,
      "X-RapidAPI-Host": "otapi-1688.p.rapidapi.com",
    },
  };
};
const optionsTaobao = (id: string) => {
  return {
    method: "GET",
    url: "https://taobao-tmall1.p.rapidapi.com/BatchGetItemFullInfo",
    params: {
      language: "vi",
      itemId: id,
    },
    headers: {
      "X-RapidAPI-Key": process.env.NEXT_PUBLIC_X_RAPIDAPI_KEY,
      "X-RapidAPI-Host": "taobao-tmall1.p.rapidapi.com",
    },
  };
};

const Index: TNextPageWithLayout = () => {
  const router = useRouter();
  const query = router.query;
  const id = query.id as string | undefined;
  const ecsite = query.ecsite as ShopName;
  const [data, setData] = useState<IDetailRapidProductItem | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [previewImg, setPreviewImg] = useState<string>("");

  const showDetail = async () => {
    try {
      const response = await axios.request(options(id) as AxiosRequestConfig);
      //  response.data.Result.Item
      const siteName = "1688";
      const shopId = response.data.Result.Vendor.FeaturedValues?.find(
        (e) => e.Name === "userId"
      )?.Value;

      setData({
        ...response.data.Result.Item,
        ShopId: shopId,
        Site: siteName,
      });
      setIsLoading(false);
    } catch (error) {
      toast.error("Có lỗi xảy ra, vui lòng thử lại");
    }
  };
  const showDetailTaobao = async () => {
    try {
      const response = await axios.request(
        optionsTaobao(id) as AxiosRequestConfig
      );
      const siteName = response.data.Result.Vendor.ProviderType.toUpperCase();
      const shopId =
        siteName.toLowerCase() +
        "_" +
        response.data.Result.Vendor.FeaturedValues.find(
          (e) => e.Name === "shopId"
        )?.Value;

      setData({
        ...response.data.Result.Item,
        ShopId: shopId,
        Site: siteName,
      });
      setIsLoading(false);
    } catch (error) {
      toast.error("Có lỗi xảy ra, vui lòng thử lại");
    }
  };

  useEffect(() => {
    if (!id) return;
    setIsLoading(true);
    if (ecsite === ShopName.Shop1688) {
      showDetail();
    } else {
      showDetailTaobao();
    }
  }, [id, ecsite]);

  const handleChangePreview = (newImg: string) => {
    setPreviewImg(newImg);
  };
  const renderView = () => {
    if (data) {
      return (
        <div className="tableBox justify-between w-full max-w-[1200px] mx-auto gap-4 flex flex-row flex-wrap">
          <div className="w-full md:w-[36%]">
            <div className="w-full">
              <LayoutLeft item={data} attributeImage={previewImg} />
            </div>
          </div>

          <div className="w-full md:w-[60%]">
            <div>
              <LayoutRight
                onChangePreview={handleChangePreview}
                item={data}
                ecsite={ecsite as ShopName}
              />
            </div>
          </div>
        </div>
      );
    } else
      return (
        <div className="mt-[30px] w-full h-full flex flex-col items-center justify-center">
          <div className="w-[0px] h-[50px] relative">
            <span className="spin"></span>
          </div>

          <div className="text-[18px]">
            Vui lòng đợi. Hệ thống đang tải dữ liệu
          </div>
        </div>
      );
  };
  return <div className="my-[24px]">{renderView()}</div>;
};

Index.displayName = "Tìm kiếm sản phẩm";
Index.Layout = UserLayout;

export default Index;
