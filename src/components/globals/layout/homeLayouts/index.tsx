import React from "react";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import { menu } from "~/api";
import { RootState } from "~/store";
import { ButtonBackTop } from "../../button/ButtonBackTop";
import Footer from "./Footer";
import Header from "./Header";
import { HomeLayoutProtector } from "./HomeLayoutProtector";

export const HomeLayout: React.FC<{}> = ({ children }) => {
  // const dataGlobal: TConfig = useSelector(
  //   (state: RootState) => state.dataGlobal
  // );

  const { data: dataMenu } = useQuery(
    ["menuData"],
    () =>
      menu
        .getList({
          PageIndex: 1,
          PageSize: 99999,
          OrderBy: "position",
        })
        .then((res) => res?.Data?.Items),
    {
      staleTime: 5000,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    }
  );

  return (
    <HomeLayoutProtector>
      <Header dataMenu={dataMenu} />
      <main>{children}</main>
      <Footer dataMenu={dataMenu} />
      <ButtonBackTop />
    </HomeLayoutProtector>
  );
};
