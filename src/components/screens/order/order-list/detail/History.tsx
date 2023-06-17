import React from "react";
import { DataTable } from "~/components";
import { TColumnsType, TTable } from "~/types/table";

type TProps<T extends object> = TTable<T> & {
  columns: TColumnsType<T>;
  title: string;
  // expandable: any;
};

export const History = <T extends object = object>({
  columns,
  data,
  title,
  pagination,
  handlePagination,
}: // expandable
TProps<T>) => {
  return (
    <React.Fragment>
      <div className="text-[16px] font-bold uppercase tracking-wide ml-4 pb-3">
        {title}
      </div>
      <DataTable
        {...{
          style: "secondary",
          columns,
          data,
          pagination,
          onChange: handlePagination,
          className: '!m-[-0.5rem]'
          // expandable: expandable
        }}
      />
    </React.Fragment>
  );
};
