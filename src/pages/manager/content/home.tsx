import { TablePaginationConfig } from "antd";
import clsx from "clsx";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { customerBenefits, customerTalk, menu, service, step } from "~/api";
import {
  ClientBenefitList,
  ClientComentList,
  ContentMenuList,
  Layout,
  RegisterStepsList,
  ServiceList,
} from "~/components";
import { breadcrumb } from "~/configs";
import { defaultPagination } from "~/configs/appConfigs";
import { SEOConfigs } from "~/configs/SEOConfigs";
import { TNextPageWithLayout } from "~/types/layout";

const className = "tableBox xl:mb-5 py-4";

const Index: TNextPageWithLayout = () => {
  const [pagination, setPagination] =
    useState<TablePaginationConfig>(defaultPagination);

  const { isFetching: isFetchingMenu, data: dataMenu } = useQuery(
    [
      "menuData",
      { Current: pagination.current, PageSize: pagination.pageSize },
    ],
    () =>
      menu
        .getList({
          PageIndex: pagination.current,
          PageSize: pagination.pageSize,
          OrderBy: "position",
        })
        .then((res) => {
          return res?.Data;
        }),
    {
      retry: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    }
  );

  const {
    isFetching: isFetchingRegisterSteps,
    refetch: refetchRegisterSteps,
    data: dataRegisterSteps,
  } = useQuery(
    [
      "registerSteps",
      { Current: pagination.current, PageSize: pagination.pageSize },
    ],
    () =>
      step
        .getList({
          PageIndex: pagination.current,
          PageSize: pagination.pageSize,
          OrderBy: "Id desc",
        })
        .then((res) => {
          return res?.Data;
        }),
    {
      retry: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    }
  );

  const {
    isFetching: isFetchingService,
    refetch: refetchService,
    data: dataService,
  } = useQuery(
    [
      "serviceData",
      { Current: pagination.current, PageSize: pagination.pageSize },
    ],
    () =>
      service
        .getList({
          PageIndex: pagination.current,
          PageSize: pagination.pageSize,
          OrderBy: "Id desc",
        })
        .then((res) => {
          return res?.Data;
        }),
    {
      retry: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    }
  );

  const {
    isFetching: isFetchingcustomerBenefits,
    refetch: refetchcustomerBenefits,
    data: datacustomerBenefits,
  } = useQuery(
    [
      "customerBenefitsData",
      { Current: pagination.current, PageSize: pagination.pageSize },
    ],
    () =>
      customerBenefits
        .getList({
          PageIndex: pagination.current,
          PageSize: pagination.pageSize,
          OrderBy: "Id desc",
        })
        .then((res) => {
          return res?.Data;
        }),
    {
      retry: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    }
  );

  const { data: dataCustomerComment, refetch: refetchcustomerComment } =
    useQuery(
      [
        "customerCommentData",
        { Current: pagination.current, PageSize: pagination.pageSize },
      ],
      () =>
        customerTalk
          .getList({
            PageIndex: 1,
            PageSize: 20,
            OrderBy: "Id desc",
          })
          .then((res) => {
            return res?.Data;
          }),
      {
        retry: false,
        refetchOnReconnect: false,
        refetchOnWindowFocus: false,
      }
    );

  return (
    <React.Fragment>
      <div className="grid grid-cols-12 gap-4">
        <div className={clsx(className, "md:col-span-12 xl:col-span-5")}>
          <ContentMenuList data={dataMenu?.Items} />
        </div>
        <div
          className={clsx(className, "md:col-span-12 xl:col-span-7 md:!mb-4")}
        >
          <RegisterStepsList
            data={dataRegisterSteps?.Items}
            refetchRegisterSteps={refetchRegisterSteps}
          />
        </div>
      </div>
      <div className={clsx(className, "md:!mb-4")}>
        <ServiceList
          data={dataService?.Items}
          refetchService={refetchService}
        />
      </div>
      <div className={clsx(className, "md:!mb-4")}>
        <ClientBenefitList
          data={datacustomerBenefits?.Items}
          refetchcustomerBenefits={refetchcustomerBenefits}
        />
      </div>
      <div className={clsx(className, "md:!mb-4")}>
        <ClientComentList
          data={dataCustomerComment?.Items}
          refetchcustomerComment={refetchcustomerComment}
        />
      </div>
    </React.Fragment>
  );
};

Index.displayName = SEOConfigs.homepageContent;
Index.breadcrumb = breadcrumb.content.home;
Index.Layout = Layout;

export default Index;
