import React from "react";
import { NotFound } from "~/components";
import BlankLayout from "~/components/globals/layout/blankLayouts";
import { TNextPageWithLayout } from "~/types/layout";

const Index: TNextPageWithLayout = () => {
  return <NotFound />;
};

Index.Layout = BlankLayout;

export default Index;
