import router from "next/router";
import { useRef, useState } from "react";
import { useQuery } from "react-query";
import { withdraw } from "~/api";
import {
  Layout,
  NotFound,
  PersonalRechargeFilter,
  showToast,
  toast,
  WithDrawalHistoryForm,
  WithDrawalHistoryTable,
} from "~/components";
import { breadcrumb } from "~/configs";
import { SEOConfigs } from "~/configs/SEOConfigs";
import { TNextPageWithLayout } from "~/types/layout";
import { _format } from "~/utils";
import { selectUser, useAppSelector } from "~/store";

const boxTop =
  "col-span-1 tableBox cardTopTable p-2 items-center";
const boxBottom = "tableBox cardTopTable col-span-1 w-full p-3";

const Index: TNextPageWithLayout = () => {
  const { user: userStore } = useAppSelector(selectUser);
  if (!userStore) return null;

  const item = useRef<TWithDraw>();
  const [modal, setModal] = useState(false);

  const [filter, setFilter] = useState({
    OrderBy: "Id desc",
    Type: 2,
    SearchContent: null,
    Status: null,
    PageSize: 20,
    PageIndex: 1,
    TotalItems: null,
  });

  const handleFilter = (newFilter) => {
    setFilter({ ...filter, ...newFilter });
  };

  const {
    data: userWithDrawData,
    isFetching,
    isError,
  } = useQuery(
    ["clientWithdrawData", { ...filter }],
    () => withdraw.getList(filter).then((res) => res.Data),
    {
      onSuccess: (data) =>
        setFilter({
          ...filter,
          TotalItems: data?.TotalItem,
          PageIndex: data?.PageIndex,
          PageSize: data?.PageSize,
        }),
      onError: toast.error,
    }
  );

  const handleModal = (itemSelected: TWithDraw) => {
    item.current = itemSelected;
    setModal(true);
  };

  const handleExportExcel = () => {
    withdraw
      .exportExcel({ ...filter, PageSize: 99999 })
      .then((res) => {
        router.push(res.Data);
      })
      .catch((error) => {
        showToast({
          title: "Đã xảy ra lỗi!",
          message: (error as any)?.response?.data?.ResultMessage,
          type: "error",
        });
      });
  };

  if (isError) return <NotFound />;
  return (
    <>
      <div className="grid grid-cols-4 gap-2 mb-4">
        <div className={boxTop}>
          Tổng đơn
          <span className="text-bold text-blue font-semibold text-[20px]">
            {userWithDrawData?.TotalItem}
          </span>
        </div>
        <div className={boxTop}>
          Số đơn đã duyệt
          <span className="text-bold text-green font-semibold text-[20px]">
            {userWithDrawData?.Items?.[0]?.TotalStatus2 ?? 0}
          </span>
        </div>
        <div className={boxTop}>
          Số đơn chờ duyệt
          <span className="text-bold text-[#f7b467] font-semibold text-[20px]">
            {userWithDrawData?.Items?.[0]?.TotalStatus1 ?? 0}
          </span>
        </div>
        <div className={boxTop}>
          Số đơn đã huỷ
          <span className="text-bold text-red font-semibold text-[20px]">
            {userWithDrawData?.Items?.[0]?.TotalStatus3 ?? 0}
          </span>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2 mb-4">
        <div className={boxBottom}>
          <p className="IconBoxFilter text-center IconFilter text-white bg-[#e75b5b]">
            <i className="fas fa-sack-dollar"></i>
          </p>
          <div>
            <div className="text-right">Tổng số tiền:</div>
            <span className="font-bold text-base text-[#e75b5b] flex items-center justify-end">
              {_format.getVND(userWithDrawData?.Items?.[0]?.TotalAmount)}
            </span>
          </div>
        </div>
        <div className={boxBottom}>
          <p className="IconBoxFilter text-white bg-green IconFilter text-center">
            <i className="fas fa-sack-dollar"></i>
          </p>
          <div>
            <div className="text-right">Tổng số tiền đã duyệt:</div>
            <span className="font-bold text-base text-green flex items-center justify-end">
              {_format.getVND(userWithDrawData?.Items?.[0]?.TotalAmount2)}
            </span>
          </div>
        </div>
        <div className={boxBottom}>
          <p className="IconBoxFilter text-white bg-main IconFilter text-center">
            <i className="fas fa-sack-dollar"></i>
          </p>
          <div>
            <div className="text-right">Tổng số tiền chờ duyệt:</div>
            <span className="font-bold text-base text-main flex items-center justify-end">
              {_format.getVND(userWithDrawData?.Items?.[0]?.TotalAmount1)}
            </span>
          </div>
        </div>
      </div>
      <div className="tableBox ">
        <PersonalRechargeFilter
          handleFilter={handleFilter}
          handleExportExcel={handleExportExcel}
        />
        <WithDrawalHistoryTable
          {...{
            data: userWithDrawData?.Items,
            handleModal,
            loading: isFetching,
            filter,
            handleFilter,
          }}
        />
        <WithDrawalHistoryForm
          {...{
            onCancel: () => setModal(false),
            visible: modal,
            defaultValues: item.current,
          }}
        />
      </div>
    </>
  );
};

Index.displayName = SEOConfigs.moneyManagement.historyWithdrawVN;
Index.breadcrumb = breadcrumb.money.withdrawalHistory;
Index.Layout = Layout;

export default Index;
