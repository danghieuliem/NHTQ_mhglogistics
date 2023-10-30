import { useCallback, useState } from "react";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import { feeVolume } from "~/api";
import {
  Layout,
  toast,
  VolumeFeeFilter,
  VolumeFeeFormMemo,
  VolumeFeeTable,
} from "~/components";
import { breadcrumb } from "~/configs";
import { SEOConfigs } from "~/configs/SEOConfigs";
import { RootState } from "~/store";
import type { TNextPageWithLayout } from "~/types/layout";

const Index: TNextPageWithLayout = () => {
  const userCurrentInfo: TUser = useSelector(
    (state: RootState) => state.userCurrentInfo
  );

  const [modalAdd, setModalAdd] = useState(false);
  const [modalUpdate, setModalUpdate] = useState(false);
  const [idTarget, setIdTarget] = useState(null);

  const [filter, setFilter] = useState({
    PageIndex: 1,
    PageSize: 999999,
    OrderBy: "Id desc",
    WarehouseFromId: null,
    WarehouseId: null,
    ShippingTypeToWareHouseId: null,
    IsHelpMoving: null,
    TotalItems: null,
  });

  const handleFilter = (newFilter) => {
    setFilter({ ...filter, ...newFilter });
    return;
  };

  const { isFetching, data, isLoading, refetch } = useQuery(
    [
      "feeVolumeData",
      [
        filter.PageIndex,
        filter.WarehouseFromId,
        filter.WarehouseId,
        filter.ShippingTypeToWareHouseId,
        filter.IsHelpMoving,
      ],
    ],
    () => feeVolume.getList(filter),
    {
      keepPreviousData: true,
      onSuccess: (data) => {
        setFilter({
          ...filter,
          TotalItems: data?.Data?.TotalItem,
          PageIndex: data?.Data?.PageIndex,
          PageSize: data?.Data?.PageSize,
        });
        return data?.Data?.Items;
      },
      enabled: userCurrentInfo?.UserGroupId === 1,
      refetchOnWindowFocus: false,
      onError: toast.error,
    }
  );

  const handleCloseUpdateModal = useCallback(() => setModalUpdate(false), []);
  const handlCloseAddModal = useCallback(() => setModalAdd(false), []);

  return (
    <div>
      <VolumeFeeFilter
        handleFilter={(newFilter) =>
          handleFilter({ ...newFilter, PageIndex: 1 })
        }
        handleAddStaff={() => setModalAdd(true)}
      />

      <VolumeFeeTable
        {...{
          loading: isFetching,
          data: data?.Data?.Items,
          handleGetID: (id: number) => setIdTarget(id),
          handleUpdate: () => setModalUpdate(true),
          filter,
          handleFilter,
        }}
        refetch={refetch}
      />

      <VolumeFeeFormMemo
        {...{
          title: "Cập nhật phí thể tích TQ - VN",
          onCancel: handleCloseUpdateModal,
          defaultValues: data?.Data?.Items,
          visible: modalUpdate,
          idTarget,
        }}
        refetch={refetch}
        type={"update"}
      />

      <VolumeFeeFormMemo
        {...{
          title: "Thêm phí thể tích TQ - VN",
          onCancel: handlCloseAddModal,
          // defaultValues: {},
          visible: modalAdd,
        }}
        refetch={refetch}
        type={"addNew"}
      />
    </div>
  );
};
Index.displayName = SEOConfigs?.settings.volume;
Index.breadcrumb = breadcrumb.settings.volume;
Index.Layout = Layout;

export default Index;
