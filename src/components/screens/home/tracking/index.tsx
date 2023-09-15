import { useState } from "react";
import { useForm } from "react-hook-form";
import { useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { searchAPI, smallPackage } from "~/api";
import { FormInput, FormSelect } from "~/components";
import { dataSearchProduct } from "~/configs";
import styles from "./index.module.css";
import { TrackingForm } from "./TrackingForm";

export const HomeTracking = () => {
  const [trackingData, setTrackingData] = useState(null);
  const { control, handleSubmit, getValues, watch } = useForm<TWarehouseCN>({
    mode: "onBlur",
  });

  const { control: controlSearch, handleSubmit: handleSubmitSearch } = useForm<{
    Id: number;
    SearchItem: string;
  }>({
    mode: "onBlur",
  });

  const queryClient = useQueryClient();
  const [modal, setModal] = useState(false);

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

  const handleGetCode = async (TransactionCode: string) => {
    const id = toast.loading("Đang xử lý ...");

    smallPackage
      .getByTransactionCode({ TransactionCode })
      .then((res) => {
        setTrackingData(res?.Data);
        toast.update(id, {
          render: "Tìm thấy đơn hàng",
          type: "success",
          isLoading: false,
          autoClose: 500,
        });
        setModal(true);
      })
      .catch((error) => {
        toast.update(id, {
          render: (error as any)?.response?.data?.ResultMessage,
          isLoading: false,
          type: "error",
          autoClose: 1000,
        });
      });
  };

  return (
    <div className={styles.trackingWrapper}>
      <div className="container">
        <div className={styles.inner}>
          <div className={styles.top}>
            <h4 className="small_title !text-white">Nhanh chóng & tin cậy</h4>
            <h1>Tra cứu & tìm kiếm</h1>
            <p className={styles.mainDes}>
              Monamedia Logistics là giải pháp nhập hàng tối ưu cho quý khách.
              Chúng tôi mang lại cho khách hàng nguồn hàng phong phú với mức giá
              cực rẻ.
            </p>
            <span className={styles.line}></span>
          </div>
          <div className={styles.tabSearch}>
            <div className={styles.tabSearchChild}>
              <div className={styles.trackingForm}>
                <div className={styles.tabSearchTitle}>TÌM KIẾM SẢN PHẨM</div>
                <div className="relative flex mt-3 justify-between bg-[#EDEDED] p-1 shadow-lg rounded-[4px]">
                  <div className="w-[30%]">
                    <FormSelect
                      control={controlSearch}
                      name="Id"
                      select={{ label: "name", value: "id" }}
                      defaultValue={{ id: "0", name: "Shop" }}
                      placeholder=""
                      label=""
                      data={dataSearchProduct}
                      required={false}
                      styles={{
                        control: (base) => ({
                          ...base,
                          // width: 135,
                          height: 40,
                          minHeight: 30,
                          // borderRight: 0,
                          backgroundColor: "#EDEDED",
                          fontWeight: "bold",
                          textAlign: "center",
                          fontSize: 14,
                          borderRadius: "4px",
                          zIndex: 50,
                          "& > div:first-of-type": {
                            padding: "0 8px",
                          },
                          "& > div:last-of-type > div": {
                            padding: "0",
                          },
                        }),
                      }}
                    />
                  </div>
                  <div className="w-[68%] relative ">
                    <FormInput
                      control={controlSearch}
                      name="SearchItem"
                      type="text"
                      placeholder="Sản phẩm tìm kiếm"
                      allowClear={false}
                      onEnter={handleSubmitSearch(handleSearchProduct)}
                      inputClassName="!border-none !bg-[#EDEDED]"
                    />
                    <button
                      onClick={handleSubmitSearch(handleSearchProduct)}
                      className={`${styles.btnSearch} !absolute top-[50%] right-[5px] translate-y-[-50%]`}
                    >
                      <span>
                        <i className="fas fa-search"></i>
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.tabSearchChild}>
              <div className={styles.trackingForm}>
                <div className={styles.tabSearchTitle}>TRA CỨU MÃ ĐƠN</div>
                <div className="relative flex mt-3 justify-between bg-[#EDEDED] p-1 shadow-lg rounded-[4px]">
                  <div className="flex-1">
                    <FormInput
                      control={control}
                      name="OrderTransactionCode"
                      type="text"
                      placeholder="Tra cứu mã vận đơn"
                      label=""
                      inputClassName="!border-none !bg-[#EDEDED]"
                    />
                  </div>
                  <div className="w-fit relative">
                    <button
                      onClick={() => {
                        const TransactionCode = getValues(
                          "OrderTransactionCode"
                        );
                        if (!TransactionCode) {
                          toast.warn("Vui lòng nhập mã vận đơn!");
                          return;
                        }

                        handleGetCode(TransactionCode.trim());
                      }}
                      className={`${styles.btnSearch} !absolute top-[55%] right-[5px] translate-y-[-50%]`}
                    >
                      <span>
                        <i className="fas fa-search"></i>
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.main}>
        <img src="/default/service_man.png" />
      </div>

      <TrackingForm
        visible={modal}
        onCancel={() => setModal(false)}
        data={trackingData}
      />
    </div>
  );
};
