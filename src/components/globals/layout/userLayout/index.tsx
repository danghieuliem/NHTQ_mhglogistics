import { FC } from "react";
import { Layout } from "../mainLayouts";

export const UserLayout: FC<{}> = ({ children }) => {

  return (
    <Layout userPage>
      {children}
    </Layout>
  );
};
