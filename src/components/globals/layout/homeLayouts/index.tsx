import React from "react";
import { useQuery } from "react-query";
import { menu } from "~/api";
import configHomeData from "~/api/config-home";
import { ButtonBackTop } from "../../button/ButtonBackTop";
import Footer from "./Footer";
import Header from "./Header";
import { HomeLayoutProtector } from "./HomeLayoutProtector";
import { RootState, update } from "~/store";
import { useDispatch, useSelector } from "react-redux";

export const HomeLayout: React.FC<{}> = ({ children }) => {
  const disptach = useDispatch();
  const dataGlobal: any = useSelector((state: RootState) => state.dataGlobal);

  useQuery({
    queryKey: ["homeConfig"],
    queryFn: () =>
      configHomeData.get().then((res) => {
        disptach(update({ ...res?.Data }));
      }),
    enabled: !!dataGlobal,
    staleTime: 5000,
    refetchOnMount: false,
    // refetchOnWindowFocus: false,
  });

  const { data: dataMenu } = useQuery(["menuData"], () =>
    menu
      .getList({
        PageIndex: 1,
        PageSize: 99999,
        OrderBy: "position",
      })
      .then((res) => res?.Data?.Items)
  );

  return (
    <HomeLayoutProtector>
      <Header dataConfig={dataGlobal} dataMenu={dataMenu} />
      <main>{children}</main>
      <Footer dataConfig={dataGlobal} dataMenu={dataMenu} />
      <ButtonBackTop />
    </HomeLayoutProtector>
  );
};
