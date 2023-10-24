import React from "react";
import { BlankLayout, NotFound } from "~/components";
import { TNextPageWithLayout } from "~/types/layout";

const Index: TNextPageWithLayout = () => {
  return <NotFound />;
};

Index.Layout = BlankLayout;

export default Index;
