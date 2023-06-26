import { Spin, Table, TablePaginationConfig, TableProps } from "antd";
import { SorterResult, TableRowSelection } from "antd/lib/table/interface";
import clsx from "clsx";
import React from "react";
import { useMediaQuery } from "react-responsive";
import { TColumnsType } from "~/types/table";
import styles from "./index.module.css";
import { Loading } from "~/components/screens/status";

type TProps<T extends object> = {
  rowKey?: keyof T | "Id";
  style?: "main" | "secondary" | "cartTable" | "detailOrder";
  bgHeaderType? : "orderTable" | "anotherTable" | "depositTable" | "paymentTable";
  title?: string;
  columns: TColumnsType<T> | any;
  data: T[];
  bordered?: boolean;
  pagination?: TablePaginationConfig | false;
  onChange?: (
    pagination?: TablePaginationConfig,
    filter?: any,
    sorter?: SorterResult<T>
  ) => void;
  summary?: (data: readonly T[]) => React.ReactNode | null;
  rowSelection?: TableRowSelection<T>;
  scroll?: TableProps<T>["scroll"];
  loading?: boolean;
  expandable?: any;
  className?: string;
  href?: string;
  isExpand?: boolean;
  mediaWidth?: number;
  extraElment?: React.ReactNode;
  extraElmentClassName?: string;
};

export const DataTable = <T extends object = object>({
  style = "main",
  title = "",
  columns,
  data,
  bordered = false,
  pagination = false,
  onChange,
  rowSelection,
  summary = null,
  scroll = { x: true },
  rowKey = "Id",
  loading = false,
  expandable,
  className,
  href = "",
  isExpand = false,
  mediaWidth = 992,
  extraElment,
  bgHeaderType,
  extraElmentClassName,
}: TProps<T>) => {
  const isTablet = useMediaQuery({ query: `(max-width: ${mediaWidth}px)` });

  return (
    <React.Fragment>
      <div className="flex justify-between items-center mb-[10px] flex-wrap">
        {!!title.length && <div className={clsx("titleTable")}>{title}</div>}
        {extraElment && (
          <div className={clsx("w-full sm:w-fit", extraElmentClassName)}>
            {extraElment}
          </div>
        )}
      </div>
      <Spin spinning={loading} indicator={<Loading />} size="small">
        <Table
          // loading={loading}
          rowKey={rowKey as string}
          bordered={bordered}
          columns={columns}
          dataSource={data ?? []}
          style={{
            borderRadius: "6px",
          }}
          className={clsx(
            "shadow-md w-full",
            style === "main" && styles.maintable,
            style === "secondary" && styles.table,
            style === "cartTable" && clsx(styles.cartTable, "!shadow-none"),
            style === "detailOrder" && clsx(styles.detailOrder, "!shadow-none"),
            bgHeaderType === "orderTable" && styles.orderTable,
            bgHeaderType === "anotherTable" && styles.anotherTable,
            bgHeaderType === "depositTable" && styles.depositTable,
            bgHeaderType === "paymentTable" && styles.paymentTable,
            className,
          )}
          pagination={pagination ? pagination : false}
          summary={summary}
          onChange={pagination ? onChange : undefined}
          rowSelection={rowSelection}
          scroll={scroll}
          expandable={isExpand ? expandable : isTablet && expandable}
        />
      </Spin>
    </React.Fragment>
  );
};
