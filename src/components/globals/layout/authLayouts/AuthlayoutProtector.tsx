import { HubConnectionBuilder } from "@microsoft/signalr";
import Cookies from "js-cookie";
import router from "next/router";
import { FC, ReactElement, useEffect } from "react";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import { user } from "~/api";
import configHomeData from "~/api/config-home";
import { setToken } from "~/api/instance";
import { config } from "~/configs";
import {
  RootState,
  selectConnection,
  setConnection,
  setRouter,
  updateGlobal,
  useAppDispatch,
  useAppSelector,
  updateUser
} from "~/store";

const AuthLayoutProtector: FC<{ children: ReactElement[] | ReactElement }> = ({
  children,
}) => {
  const dispatch = useAppDispatch();
  const session = Cookies.get(config.tokenName);
  const userCurrentInfo: TUser = useSelector(
    (state: RootState) => state.userCurretnInfo
  );

  if (!userCurrentInfo.Id || !session) {
    router.push("/");
    return null;
  }

  useQuery({
    queryKey: "clientData",
    queryFn: () =>
      user.getByID(userCurrentInfo.Id).then((res) => {
        dispatch(
          updateUser({
            ...userCurrentInfo,
            ...res?.Data,
          })
        );
      }),
    staleTime: 3000,
    refetchOnMount: false,
    refetchOnWindowFocus: true,
  });

  useQuery({
    queryKey: ["homeConfig"],
    queryFn: () =>
      configHomeData.get().then((res) => {
        dispatch(updateGlobal({ ...res?.Data }));
      }),
    staleTime: 3000,
    refetchOnMount: false,
    refetchOnWindowFocus: true,
  });

  setToken(userCurrentInfo?.Token);
  dispatch(setRouter(userCurrentInfo.UserGroupId));

  useEffect(() => {
    if (!userCurrentInfo?.Id) return;
    (async () => {
      try {
        let connection = new HubConnectionBuilder()
          .withUrl(`${process.env.NEXT_PUBLIC_HUBS_SERVER}`)
          .withAutomaticReconnect()
          .build();

        await connection.start();
        await connection.invoke(
          "join",
          JSON.stringify(userCurrentInfo?.Id),
          JSON.stringify(userCurrentInfo?.UserGroupId)
        );

        dispatch(setConnection(connection));

        return () => {
          connection.stop();
        };
      } catch (err) {
        console.error(err);
      }
    })();
  }, [userCurrentInfo?.Id]);

  const connection = useAppSelector(selectConnection);
  const connectionId = connection?.connectionId;

  useEffect(() => {
    if (!connectionId) return;
    connection.on("change-temp", (resetCart) => {
      if (!resetCart) return;
      // dispatch(getCartInfoByUserId(UserId));
    });
  }, [connectionId]);

  return <>{children}</>;
};

export default AuthLayoutProtector;
