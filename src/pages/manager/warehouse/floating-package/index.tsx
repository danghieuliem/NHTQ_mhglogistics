import { useRef, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { smallPackage } from "~/api";
import {
  CheckWarehouseVietNamAssign1,
  CheckWarehouseVietNamAssign2,
  FloatingPackageTable,
  Layout,
  MissingPackageFilter,
  toast,
} from "~/components";
import { breadcrumb } from "~/configs";
import { SEOConfigs } from "~/configs/SEOConfigs";
import { TNextPageWithLayout } from "~/types/layout";
import { selectUser, useAppSelector } from "~/store";

const Index: TNextPageWithLayout = () => {
  const { user: userStore } = useAppSelector(selectUser);
  if (!userStore) return null;

  const modalType = useRef<"assign1" | "assign2">("assign1");
  const [modalAssign1, setModalAssign1] = useState(false);
  const [modalAssign2, setModalAssign2] = useState(false);
  const item = useRef<TWarehouseVN>(null);

  const [filter, setFilter] = useState({
    SearchContent: null,
    TotalItems: null,
    PageIndex: 1,
    PageSize: 20,
    Menu: 0,
  });

  const handleFilter = (newFilter) => {
    setFilter({ ...filter, ...newFilter });
  };

  const { data, isFetching, refetch, isLoading } = useQuery(
    ["smallPackageList", { ...filter }],
    () => smallPackage.getList(filter).then((res) => res.Data),
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
    }
  );

  const mutationUpdate = useMutation(smallPackage.update, {
    onSuccess: () => {
      toast.success("Cập nhật đơn kiện thành công");
      refetch();
    },
    onError: () => {
      toast.error("Không tìm thấy ID!");
    },
  });

  const _onPress = async (
    data: (TWarehouseVN & Partial<TAddtionalFieldWarehouse>)[]
  ) => {
    try {
      await mutationUpdate.mutateAsync(data);
      setModalAssign1(false);
      setModalAssign2(false);
    } catch (error) {}
  };

  const handleAssign = (
    record?: TWarehouseVN,
    type: "assign1" | "assign2" = "assign1"
  ) => {
    item.current = record;
    if (type === "assign1") {
      modalType.current = "assign1";
      setModalAssign1(true);
    } else {
      modalType.current = "assign2";
      setModalAssign2(true);
    }
    return;
  };

  return (
    <div className="tableBox">
      <MissingPackageFilter handleFilter={handleFilter} />
      <FloatingPackageTable
        {...{
          data: data?.Items,
          loading: isFetching,
          filter,
          handleFilter,
          refetch: () => refetch(),
          handleAssign: handleAssign,
          onPress: _onPress,
        }}
      />

      <div>
        {/* modal của gán đơn cho khách mua hộ */}
        <CheckWarehouseVietNamAssign1
          item={item.current}
          visible={modalAssign1 && modalType.current === "assign1"}
          onCancel={() => {
            setModalAssign1(false);
            item.current = null;
          }}
          onPress={_onPress}
        />
      </div>
      {/* <div>
				<CheckWarehouseVietNamAssign2
					item={item.current}
					visible={modalAssign2 && modalType.current === "assign2"}
					onCancel={() => {
						setModalAssign2(false);
						item.current = null;
					}}
					onPress={_onPress}
				/>
			</div> */}
    </div>
  );
};

Index.displayName = SEOConfigs.parcelManagement.floatingCase;
Index.breadcrumb = breadcrumb.warehouse.floatingPackage;
Index.Layout = Layout;

export default Index;
