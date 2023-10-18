import { Modal } from "antd";
import router from "next/router";
import { useCallback, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useSelector } from "react-redux";
import { staffIncome } from "~/api";
import {
  BonusManagementFilterMemo,
  BonusManagementTable,
  Button,
  FormCard,
  Layout,
  toast,
} from "~/components";
import { breadcrumb } from "~/configs";
import { SEOConfigs } from "~/configs/SEOConfigs";
import { RootState } from "~/store";
import { TNextPageWithLayout } from "~/types/layout";
import { _format } from "~/utils";
import { toast as toastR } from "react-toastify";

const Index: TNextPageWithLayout = () => {
  const userCurrentInfo: TUser = useSelector(
    (state: RootState) => state.userCurrentInfo
  );

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [filter, setFilter] = useState({
    PageIndex: 1,
    PageSize: 20,
    RoleID: userCurrentInfo?.UserGroupId,
    UID: userCurrentInfo?.Id,
    TotalItems: null,
    SearchContent: null,
    FromDate: null,
    ToDate: null,
    Status: null,
    Type: 1,
  });

  const handleFilter = (newFilter) => {
    setFilter({ ...filter, ...newFilter });
  };

  const { isFetching, data, isLoading, refetch } = useQuery(
    [
      "bonusList",
      [
        filter.PageIndex,
        filter.SearchContent,
        filter.FromDate,
        filter.ToDate,
        filter.Status,
      ],
    ],
    () => staffIncome.getList(filter).then((res) => res.Data),
    {
      keepPreviousData: true,
      onSuccess: (data) =>
        setFilter({
          ...filter,
          TotalItems: data?.TotalItem,
          PageIndex: data?.PageIndex,
          PageSize: data?.PageSize,
        }),
      onError: toast.error,
      staleTime: 5000,
      refetchOnWindowFocus: true,
    }
  );

  const _onExportExcel = useCallback(async () => {
    const id = toastR.loading("Đang xử lý ...");
    let newFilter = { ...filter };

    if (
      filter.FromDate ||
      filter.ToDate ||
      filter.SearchContent ||
      filter.Status
    ) {
      newFilter = {
        ...filter,
        PageSize: 9999,
      };
    }
    try {
      const res = await staffIncome.exportExcel(newFilter);
      router.push(`${res.Data}`);
    } catch (error) {
      toast.error(error);
    } finally {
      toastR.update(id, {
        isLoading: false,
        autoClose: 1,
        type: "default",
      });
    }
  }, [filter.FromDate, filter.ToDate, filter.SearchContent, filter.Status]);

  const mutationPayment = useMutation(
    () => staffIncome.payment({ Type: 2, Id: 1 }),
    {
      onSuccess: () => {
        toast.success("Thanh toán thành công");
        refetch();
      },
      onError: toast.error,
    }
  );

  const _handlePayAll = async () => {
    await mutationPayment.mutateAsync();
  };

  const mutationPaymentOne = useMutation(
    (Id: number) => staffIncome.payment({ Type: 1, Id }),
    {
      onSuccess: () => {
        toast.success("Thanh toán thành công");
        refetch();
      },
      onError: toast.error,
    }
  );

  const _handlePayment = async (Id: number) => {
    await mutationPaymentOne.mutateAsync(Id);
  };

  return (
    <>
      <div className="flex items-end justify-between">
        <div className="flex">
          <div className="tableBox flex flex-col mr-2">
            <div className="text-label font-bold">Tổng tiền đã thanh toán:</div>
            <span className="text-blue font-semibold flex justify-end">
              {_format.getVND(data?.Items[0]?.MaxTotalPriceReceivePayment)}
            </span>
          </div>
          <div className="tableBox flex flex-col">
            <span className="text-label font-bold">
              Tổng tiền chưa thanh toán:
            </span>
            <span className="text-orange font-semibold flex items-center justify-end">
              {_format.getVND(data?.Items[0]?.MaxTotalPriceReceiveNotPayment)}
            </span>
          </div>
        </div>
        {(userCurrentInfo?.UserGroupId === 1 ||
          userCurrentInfo?.UserGroupId === 3) && (
          <BonusManagementFilterMemo
            handleFilter={handleFilter}
            onExportExcel={_onExportExcel}
            setIsModalOpen={() => setIsModalOpen(true)}
          />
        )}
      </div>

      <BonusManagementTable
        loading={isFetching}
        data={data?.Items}
        filter={filter}
        handleFilter={handleFilter}
        handlePayment={_handlePayment}
        RoleID={userCurrentInfo?.UserGroupId}
        type={1}
      />
      <Modal visible={isModalOpen} closable={false} footer={false}>
        <FormCard>
          <FormCard.Header onCancel={() => setIsModalOpen(false)}>
            Thông báo!
          </FormCard.Header>
          <FormCard.Body>
            <div className="ml-2 flex items-center justify-between">
              <span className="text-[#5c5b5b]">Tổng tiền thanh toán:</span>
              <span className="text-orange font-semibold ">
                {_format.getVND(data?.Items[0]?.MaxTotalPriceReceiveNotPayment)}
              </span>
            </div>
          </FormCard.Body>
          <FormCard.Footer>
            <Button
              title="Thanh toán"
              btnClass="!bg-main mr-2"
              disabled={
                data?.Items[0]?.MaxTotalPriceReceiveNotPayment ? false : true
              }
              onClick={() => _handlePayAll()}
            />
            <Button
              title="Hủy"
              onClick={() => setIsModalOpen(false)}
              btnClass="!bg-red"
            />
          </FormCard.Footer>
        </FormCard>
      </Modal>
    </>
  );
};

Index.displayName = SEOConfigs?.staff?.commissionManager;
Index.breadcrumb = breadcrumb.employee.bonusManagement.deposit;
Index.Layout = Layout;

export default Index;
