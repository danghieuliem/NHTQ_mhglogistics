import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { historyOrderChange } from "~/api";
import { DataTable } from "~/components";
import { TColumnsType } from "~/types/table";
import { _format } from "~/utils";

type TProps = {};

export const DepositListHistory: React.FC<TProps> = () => {
  const router = useRouter();

  const [filter, setFilter] = useState({
    TransportationOrderId: +router.query?.id,
    PageIndex: 1,
    PageSize: 20,
    OrderBy: "Id desc",
  });

  useEffect(() => {
    setFilter({
      ...filter,
      TransportationOrderId: +router.query?.id,
    })
  }, [router.query])

  const { data } = useQuery(
    [
      "notifications-transportation",
      [filter.TransportationOrderId, filter.PageIndex],
    ],
    () =>
      historyOrderChange
        .getList(filter)
        .then((res) => {
          return res?.Data?.Items;
        })
        .catch((error) => {
          console.log(error);
        }),
    {
      enabled: !!router.query?.id,
      refetchOnWindowFocus: false,
      onSuccess: (res) => res,
    }
  );

  const columns: TColumnsType<THistoryOrderChange> = [
    {
      dataIndex: "Created",
      title: "Ngày thay đổi",
      width: 200,
      render: (date) => _format.getVNDate(date),
    },
    {
      dataIndex: "CreatedBy",
      title: "Người thay đổi",
      width: 140,
    },
    {
      dataIndex: "UserGroupName",
      title: "Quyền hạn",
      width: 120,
    },
    {
      dataIndex: "HistoryContent",
      title: "Nội dung",
      width: 400
    },
  ];

  console.log(data);

  return (
    <DataTable
      title="Lịch sử thay đổi"
      columns={columns}
      data={data as any}
      style="detailOrder"
      scroll={{ y: 600, x: 700 }}
      className="mb-4"
    />
    // <DataTable
    //   {...{
    //     columns,
    //     data,
    //     bordered: true,
    //     scroll: { y: 700, x: 1200 },
    //     // pagination: {
    //     //   current: filter.PageIndex,
    //     //   total: filter.TotalItems,
    //     //   pageSize: filter.PageSize,
    //     // },
    //     // onChange: (page, pageSize) => {
    //     //   handleFilter({
    //     //     ...filter,
    //     //     PageIndex: page.current,
    //     //     PageSize: page.pageSize,
    //     //   });
    //     // },
    //   }}
    // />
  );
};
