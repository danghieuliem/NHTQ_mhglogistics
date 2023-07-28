import React from "react";
import { useQuery } from "react-query";
import { menu } from "~/api";
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
      staleTime: 1000,
      refetchOnMount: false,
      refetchOnWindowFocus: true,
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
