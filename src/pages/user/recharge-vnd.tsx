import { Drawer, Pagination, Space, Tag } from "antd";
import React, { useRef, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useSelector } from "react-redux";
import { adminSendUserWallet } from "~/api";
import {
  ActionButton,
  HistoryRechargeVNDTable,
  IconButton,
  ModalDelete,
  RechargeVNDForm,
  UserLayout,
  toast,
} from "~/components";
import { RechargeContent } from "~/components/screens/user/recharge-vnd";
import { SEOHomeConfigs } from "~/configs/SEOConfigs";
import { useCatalogue } from "~/hooks/useCatalogue";
import { RootState } from "~/store";
import { TNextPageWithLayout } from "~/types/layout";
import { _format } from "~/utils";

export const CreateRequestCom = ({ newUser, bank, TotalAmount }) => {
  const [isShow, setIsShow] = useState(false);

  return (
    <>
      <ActionButton
        isButton
        icon=""
        title="Tạo yêu cầu thanh toán"
        onClick={() => setIsShow(!isShow)}
        isButtonClassName="!bg-main !text-white ml-auto lg:mb-4"
      />
      <Drawer
        title={
          <Tag color="text-white" className="!bg-main shadow-lg">
            Tạo yêu cầu nạp tiền
          </Tag>
        }
        visible={isShow}
        onClose={() => setIsShow(!isShow)}
        width={"96vw"}
        closable={false}
        closeIcon={false}
        extra={
          <Space>
            <div className="font-bold text-sm text-blue py-1 px-4 w-fit rounded-[4px]">
              Tổng tiền đã nạp: {_format.getVND(TotalAmount)}
            </div>
            <IconButton
              onClick={() => setIsShow(!isShow)}
              title=""
              icon="far fa-times !mr-0"
              btnClass="!bg-red"
              showLoading
              toolip=""
            />
          </Space>
        }
      >
        <div className="grid grid-cols-12 gap-4 m-4">
          <div className="col-span-12 lg:col-span-6">
            <RechargeContent newUser={newUser} />
          </div>
          <div className="col-span-12 lg:col-span-6">
            <RechargeVNDForm bankCatalogue={bank ?? []} newUser={newUser} />
          </div>
        </div>
      </Drawer>
    </>
  );
};

const Index: TNextPageWithLayout = () => {
  const userCurrentInfo: TUser = useSelector(
    (state: RootState) => state.userCurretnInfo
  );
  const { bank } = useCatalogue({ bankEnabled: true });
  const item = useRef<TUserHistoryRechargeVND>();
  const [modal, setModal] = useState(false);
  const queryClient = useQueryClient();

  const [filter, setFilter] = useState({
    TotalItems: null,
    PageIndex: 1,
    PageSize: 20,
    OrderBy: "Id desc",
    UID: userCurrentInfo?.Id,
  });

  const handleFilter = (newFilter) => {
    setFilter({ ...filter, ...newFilter });
  };

  const { isFetching, data } = useQuery(
    ["rechargeVNDList", [filter.PageIndex]],
    () => adminSendUserWallet.getList({ ...filter }).then((res) => res.Data),
    {
      keepPreviousData: true,
      staleTime: 3000,
      refetchOnWindowFocus: true,
      onSuccess: (data) => {
        setFilter({
          ...filter,
          TotalItems: data?.TotalItem,
          PageIndex: data?.PageIndex,
          PageSize: data?.PageSize,
        });
      },
      onError: (error) => {
        toast.error((error as any)?.response?.data?.ResultMessage);
      },
    }
  );

  const handleModal = (itemSelected?: TUserHistoryRechargeVND) => {
    if (itemSelected) {
      item.current = itemSelected;
      setModal(true);
    } else {
      item.current = undefined;
      setModal(false);
    }
  };

  const mutationDelete = useMutation(adminSendUserWallet.updateStatusCancel, {
    onSuccess: () => {
      queryClient.invalidateQueries("rechargeVNDList");
      handleModal(undefined);
      toast.success("Huỷ yêu cầu thành công");
    },
    onError: (error) => {
      toast.error((error as any)?.response?.data?.ResultMessage);
    },
  });

  return (
    <React.Fragment>
      {window.innerWidth >= 860 && (
        <div className="tableBox grid grid-cols-12 gap-4 mb-4">
          <div className="col-span-6 border-r-2 pr-4 border-[#dfdfdf]">
            <RechargeContent newUser={userCurrentInfo} />
          </div>
          <div className="col-span-6">
            <RechargeVNDForm
              bankCatalogue={bank ?? []}
              newUser={userCurrentInfo}
            />
          </div>
        </div>
      )}

      <HistoryRechargeVNDTable
        {...{
          data: data?.Items,
          // pagination,
          handleModal: (item: TUserHistoryRechargeVND) => handleModal(item),
          loading: isFetching,
          newUser: userCurrentInfo,
          bank,
          TotalAmount: data?.Items[0]?.TotalAmount,
          filter,
          handleFilter
        }}
      />
      <ModalDelete
        id={item.current?.Id}
        onCancel={() => handleModal(undefined)}
        onConfirm={() =>
          // () => console.log("dataSend: ", { ...item.current, Status: 3 })
          mutationDelete.mutateAsync({ ...item.current, Status: 3 })
        }
        visible={modal}
        title="Bạn có chắc muốn huỷ yêu cầu"
      />
    </React.Fragment>
  );
};

Index.displayName = SEOHomeConfigs.financialManagement.rechargeVNĐ;
Index.Layout = UserLayout;
Index.breadcrumb = "Tạo yêu cầu nạp";

export default Index;
