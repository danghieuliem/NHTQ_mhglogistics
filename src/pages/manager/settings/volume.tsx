import { useState } from "react";
import { useQuery } from "react-query";
import { feeVolume } from "~/api";
import {
  Layout,
  toast,
  VolumeFeeFilter,
  VolumeFeeForm,
  VolumeFeeTable,
} from "~/components";
import { breadcrumb } from "~/configs";
import { SEOConfigs } from "~/configs/SEOConfigs";
import { selectUser, useAppSelector } from "~/store";
import type { TNextPageWithLayout } from "~/types/layout";

const Index: TNextPageWithLayout = () => {
  const { user } = useAppSelector(selectUser);

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
    ["feeVolumeData", { ...filter }],
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
      enabled: user?.UserGroupId === 1,
      onError: toast.error,
    }
  );

  return (
    <div className="tableBox py-4">
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

      <VolumeFeeForm
        {...{
          title: "Cập nhật phí thể tích TQ - VN",
          onCancel: () => setModalUpdate(false),
          defaultValues: data?.Data?.Items,
          visible: modalUpdate,
          idTarget,
        }}
        refetch={refetch}
        type={"update"}
      />

      <VolumeFeeForm
        {...{
          title: "Thêm phí thể tích TQ - VN",
          onCancel: () => setModalAdd(false),
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
