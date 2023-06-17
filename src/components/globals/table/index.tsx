import { Table, TablePaginationConfig, TableProps } from "antd";
import { SorterResult, TableRowSelection } from "antd/lib/table/interface";
import clsx from "clsx";
import React from "react";
import { useMediaQuery } from "react-responsive";
import { TColumnsType } from "~/types/table";
import styles from "./index.module.css";

type TProps<T extends object> = {
  rowKey?: keyof T | "Id";
  style?: "main" | "secondary";
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
};

export const DataTable = <T extends object = object>({
  style = "main",
  title = "",
  columns,
  data,
  bordered = undefined,
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
}: TProps<T>) => {
  const isTablet = useMediaQuery({ query: `(max-width: ${mediaWidth}px)` });

  return (
    <React.Fragment>
      <div className="flex justify-between items-center mb-4 flex-wrap">
        {!!title.length && (
          <div
            className={clsx("titleTable")}
          >
            {title}
          </div>
        )}
        {extraElment && <div className="w-full sm:w-fit">{extraElment}</div>}
      </div>
      <Table
        loading={loading}
        rowKey={rowKey as string}
        bordered={bordered}
        columns={columns}
        dataSource={data ?? []}
        className={clsx(
          style !== "main" ? styles.table : styles.maintable,
          className,
          "!m-[-10px]"
        )}
        pagination={pagination ? pagination : false}
        summary={summary}
        onChange={pagination ? onChange : undefined}
        rowSelection={rowSelection}
        scroll={scroll}
        expandable={isExpand ? expandable : isTablet && expandable}
      />
    </React.Fragment>
  );
};
