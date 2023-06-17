import Cookies from "js-cookie";
import router from "next/router";
import { FC, ReactElement, useEffect } from "react";
import { user } from "~/api";
import { setToken } from "~/api/instance";
import {
  selectConnection,
  selectUser,
  setApiRoles,
  setConnection,
  setRouter,
  setUser,
  updateUser,
  useAppDispatch,
  useAppSelector
} from "~/store";
import { _format } from "~/utils";
import { CheckAdminLayout } from "./AdminLayout";
import { HubConnectionBuilder } from "@microsoft/signalr";

const HandleGetUserCurrentInfo = async (userId: number) => {
  try {
    return await user.getByID(userId);
  } catch (error) {
    console.log("Lỗi nè!");
  }
};

const AuthLayoutProtector: FC<{ children: ReactElement[] | ReactElement }> = ({
  children,
}) => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(selectUser);
  const UserId = user?.UserId;
  const session = Cookies.get("tokenNHTQ-demon");
  const curUser = localStorage.getItem("currentUser");

  if (!curUser && !session) {
    router.push("/");
    return null;
  }

  useEffect(() => {
    if (!session) return;
    (async () => {
      session && setToken(session);

      const user: TUser = JSON.parse(
        _format.getJWTDecode(session)[
          "http://schemas.microsoft.com/ws/2008/06/identity/claims/userdata"
        ]
      );

      console.log("hello");

      localStorage.setItem("currentUser", JSON.stringify(user));
      // dispatch(getCartInfoByUserId(user?.UserId));
      dispatch(setUser(user));
      dispatch(setRouter(user.UserGroupId));
      dispatch(setApiRoles(user));

      if (user?.UserId) {
        await HandleGetUserCurrentInfo(user?.UserId)
          .then((res) => {
            dispatch(
              updateUser({
                ...res?.Data,
                IsConfirmOTP: false,
                Roles: [],
                LastName: "",
                FirstName: "",
              })
            );
            setToken(session);
          })
          .catch((error) => {});
      }
    })();
  }, [session]);

  useEffect(() => {
    if (!UserId) return;
    (async () => {
      try {
        let connection = new HubConnectionBuilder()
          .withUrl(`${process.env.NEXT_PUBLIC_HUBS_SERVER}`)
          .withAutomaticReconnect()
          .build();

        await connection.start();
        await connection.invoke(
          "join",
          JSON.stringify(user.UserId),
          JSON.stringify(user.UserGroupId)
        );

        dispatch(setConnection(connection));

        return () => {
          connection.stop();
        };
      } catch (err) {
        console.error(err);
      }
    })();
  }, [UserId]);

  const connection = useAppSelector(selectConnection);
  const connectionId = connection?.connectionId;

  useEffect(() => {
    if (!connectionId) return;
    connection.on("change-temp", (resetCart) => {
      if (!resetCart) return;
      // dispatch(getCartInfoByUserId(UserId));
    });
  }, [connectionId]);

  return <CheckAdminLayout>{children}</CheckAdminLayout>;
};

export default AuthLayoutProtector;
