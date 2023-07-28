import React from "react";
import { Layout } from "../mainLayouts";

type TProps = {
  children: React.ReactNode;
  breadcrumb?: string;
};

export const UserLayout: React.FC<TProps>  = ({ children , breadcrumb}) => {

  return (
    <Layout userPage={true} breadcrumb={breadcrumb}>
      {children}
    </Layout>
  );
};