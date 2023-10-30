import { Spin, Table, TablePaginationConfig, TableProps } from "antd";
import { SorterResult, TableRowSelection } from "antd/lib/table/interface";
import clsx from "clsx";
import React, { useCallback, useMemo } from "react";
import { useMediaQuery } from "react-responsive";
import { TColumnType, TColumnsType } from "~/types/table";
import styles from "./index.module.css";
import { Loading } from "~/components/screens/status";
import { isEmpty, isFunction, isUndefined } from "lodash";

type TProps<T extends object> = {
  rowKey?: keyof T | "Id";
  style?: "main" | "secondary" | "cartTable" | "detailOrder";
  bgHeaderType?:
    | "orderTable"
    | "anotherTable"
    | "depositTable"
    | "paymentTable";
  title?: string;
  columns: TColumnsType<T>;
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
  isExpand?: boolean;
  mediaWidth?: number;
  extraElement?: React.ReactNode;
  extraElementClassName?: string;
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
  isExpand = true,
  mediaWidth = 992,
  extraElement,
  bgHeaderType,
  extraElementClassName,
}: TProps<T>) => {
  const isTablet = useMediaQuery({ query: `(max-width: ${mediaWidth}px)` });

  const FieldOfExpandedRow = (props: {
    column: TColumnType<T>;
    titleOfRow: (() => React.ReactNode) | React.ReactNode;
    body: React.ReactNode;
  }) => {
    return (
      <li
        className={`grid grid-cols-2 py-2 lg:grid-cols-3 border-b ${
          isEmpty(props.column?.responsive) && "hidden"
        } antd-${props.column?.responsive?.[0]}:hidden`}
      >
        <div className="flex items-center justify-left lg:col-span-2">
          <span className="font-medium mr-4 ">
            {isFunction(props.titleOfRow)
              ? props.titleOfRow()
              : props.titleOfRow}
          </span>
        </div>
        <div className="lg:flex items-center justify-left">{props.body}</div>
      </li>
    );
  };

  const expandedRow = useCallback(
    (record: T, index: number) => (
      <ul className={`px-2 text-xs`}>
        {columns?.map((col: TColumnType<T>, idx: number) => {
          return (
            <FieldOfExpandedRow
              column={col}
              key={idx}
              titleOfRow={col.title}
              body={
                !isUndefined(col.render)
                  ? col.render(record[col.dataIndex], record, index)
                  : record[col.dataIndex]
              }
            />
          );
        })}
      </ul>
    ),
    [columns]
  );

  const getExpandable = useMemo<any>(() => {
    const defaultExpanded = { expandedRowRender: expandedRow };
    if (!isTablet) return;
    if (isExpand && isTablet) return expandable || defaultExpanded;
    else if (isExpand) return expandable || defaultExpanded;
  }, [isExpand, expandable, isTablet, expandedRow]);

  return (
    <React.Fragment>
      {
        // !! DO NOT REMOVE IT
        <div className="antd-sx:hidden antd-sm:hidden antd-md:hidden antd-lg:hidden antd-xl:hidden antd-xxl:hidden hidden"></div>
        // *** !! this element define custom class tailwind
      }
      <div className="flex justify-between items-center mb-[10px] flex-wrap">
        {!!title.length && <div className={clsx("titleTable")}>{title}</div>}
        {extraElement && (
          <div className={clsx("w-full sm:w-fit", extraElementClassName)}>
            {extraElement}
          </div>
        )}
      </div>
      <Spin
        spinning={loading}
        indicator={<Loading />}
        size="small"
        className="w-full"
      >
        <Table
          rowKey={rowKey as string}
          bordered={bordered}
          columns={columns}
          dataSource={data ?? []}
          style={{
            borderRadius: "6px",
          }}
          className={clsx(
            "shadow-md w-full",
            style === "main" && styles.mainTable,
            style === "secondary" && styles.table,
            style === "cartTable" && clsx(styles.cartTable, "!shadow-none"),
            style === "detailOrder" && clsx(styles.detailOrder, "!shadow-none"),
            bgHeaderType === "orderTable" && styles.orderTable,
            bgHeaderType === "anotherTable" && styles.anotherTable,
            bgHeaderType === "depositTable" && styles.depositTable,
            bgHeaderType === "paymentTable" && styles.paymentTable,
            className
          )}
          pagination={pagination ? pagination : false}
          summary={summary}
          onChange={pagination ? onChange : undefined}
          rowSelection={rowSelection}
          scroll={scroll}
          expandable={getExpandable}
        />
      </Spin>
    </React.Fragment>
  );
};
