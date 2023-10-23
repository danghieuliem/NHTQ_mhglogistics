import { Modal } from "antd";
import axios, { AxiosRequestConfig } from "axios";
import { FC, useEffect, useState } from "react";
import { toast } from "~/components";
import { LayoutLeft, LayoutRight } from "../detailPage";
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

type Props = {
  id: string;
  ecsite: ShopName;
  isVisible: boolean;
  onClose: () => void;
};
export const DetailModal: FC<Props> = ({ id, ecsite, isVisible, onClose }) => {
  return (
    <Modal
      style={{ top: 20 }}
      width={1200}
      title="Thông tin sản phẩm"
      visible={isVisible}
      onCancel={onClose}
      footer={false}
      destroyOnClose
    >
      <DetailModalForm
        id={id}
        ecsite={ecsite}
        isVisible={isVisible}
        onClose={onClose}
      />
    </Modal>
  );
};

const DetailModalForm: FC<Props> = ({ id, ecsite }) => {
  const [data, setData] = useState<IDetailRapidProductItem | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [previewImg, setPreviewImg] = useState<string>("");

  const showDetail = async () => {
    try {
      const response = await axios.request(options(id) as AxiosRequestConfig);
      const siteName = "1688";

      const shopId = response.data.Result.Vendor.FeaturedValues?.find(
        (e) => e.Name === "userId"
      )?.Value;

      setData({
        ...response.data.Result.Item,
        ShopId: shopId,
        Site: siteName,
      });
    } catch (error) {
      toast.error("Có lỗi xảy ra, vui lòng thử lại");
    } finally {
      setIsLoading(false);
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
    } catch (error) {
      toast.error("Có lỗi xảy ra, vui lòng thử lại");
    } finally {
      setIsLoading(false);
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
    if (isLoading) {
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
    }
    if (data) {
      return (
        <div className="justify-between w-full max-w-[1200px] mx-auto gap-4 flex flex-row flex-wrap">
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
                ecsite={ecsite}
              />
            </div>
          </div>
        </div>
      );
    } else
      return (
        <div className="my-[30px] w-full h-full flex flex-col items-center justify-center">
          <div className="text-[18px] text-main">
            Không tìm thấy dữ liệu. Vui lòng thử lại
          </div>
        </div>
      );
  };
  return <div className="p-[24px]">{renderView()}</div>;
};
