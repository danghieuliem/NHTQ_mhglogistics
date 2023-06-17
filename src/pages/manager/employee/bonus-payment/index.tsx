import { Modal } from "antd";
import router from "next/router";
import { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { staffIncome } from "~/api";
import {
  BonusManagementFilter,
  BonusManagementTable,
  Button,
  FormCard,
  Layout,
  toast,
} from "~/components";
import { breadcrumb } from "~/configs";
import { SEOConfigs } from "~/configs/SEOConfigs";
import { useAppSelector } from "~/store";
import { TNextPageWithLayout } from "~/types/layout";
import { _format } from "~/utils";

const Index: TNextPageWithLayout = () => {
  const { current: newUser } = useAppSelector((state) => state.user);

  if (!newUser) return null;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [filter, setFilter] = useState({
    PageIndex: 1,
    PageSize: 20,
    RoleID: newUser?.UserGroupId,
    UID: newUser?.UserId,
    TotalItems: null,
    SearchContent: null,
    FromDate: null,
    ToDate: null,
    Status: null,
    Type: 2,
  });

  const handleFilter = (newFilter) => {
    setFilter({ ...filter, ...newFilter });
  };

  const { isFetching, data, isLoading, refetch } = useQuery(
    ["bonusList", { ...filter }],
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
      enabled: !!newUser,
    }
  );

  const _onExportExcel = async () => {
    try {
      const res = await staffIncome.exportExcel({
        ...filter,
        PageSize: 99999,
        RoleID: newUser?.UserGroupId,
        UID: newUser?.UserId,
      });
      router.push(`${res.Data}`);
    } catch (error) {
      toast.error(error);
    }
  };

  const mutationPayment = useMutation(
    () => staffIncome.payment({ Type: 2, Id: 2 }),
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
      <div className="mb-4 flex">
        <div className="tableBox p-3 max-w-[800px] text-sm flex justify-between mr-2 items-center">
          <div className="mr-2 text-blue bg-main !text-white IconFilter text-[26px]">
            <i className="far fa-poll"></i>
          </div>
          <div className="ml-2">
            <div className="text-[#5c5b5b]">Tổng tiền đã thanh toán:</div>
            <span className="text-blue font-semibold flex justify-end">
              {_format.getVND(data?.Items[0]?.MaxTotalPriceReceivePayment)}
            </span>
          </div>
        </div>
        <div className="tableBox p-3 max-w-[800px] text-sm flex justify-between items-center">
          <div className="mr-2 bg-main !text-white IconFilter text-[26px]">
            <i className="far fa-poll "></i>
          </div>
          <div className="ml-2">
            <span className="text-[#5c5b5b]">Tổng tiền chưa thanh toán:</span>
            <span className="text-orange font-semibold flex items-center justify-end">
              {_format.getVND(data?.Items[0]?.MaxTotalPriceReceiveNotPayment)}
            </span>
          </div>
        </div>
      </div>
      <div className="tableBox">
        {(newUser?.UserId === 1 || newUser?.UserId === 3) && (
          <div className="pb-4">
            <BonusManagementFilter
              handleFilter={handleFilter}
              onExportExcel={_onExportExcel}
              setIsModalOpen={() => setIsModalOpen(true)}
            />
          </div>
        )}

        <BonusManagementTable
          loading={isFetching}
          data={data?.Items}
          filter={filter}
          handleFilter={handleFilter}
          handlePayment={_handlePayment}
          RoleID={newUser?.UserGroupId}
          type={2}
        />
      </div>
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
              title="Hủy"
              onClick={() => setIsModalOpen(false)}
              btnClass="!bg-red"
            />
            <Button
              title="Thanh toán"
              btnClass="!bg-main"
              disabled={
                data?.Items[0]?.MaxTotalPriceReceiveNotPayment ? false : true
              }
              onClick={() => _handlePayAll()}
            />
          </FormCard.Footer>
        </FormCard>
      </Modal>
    </>
  );
};

Index.displayName = SEOConfigs?.staff?.commissionManager;
Index.breadcrumb = breadcrumb.employee.bonusManagement.payment;
Index.Layout = Layout;

export default Index;
