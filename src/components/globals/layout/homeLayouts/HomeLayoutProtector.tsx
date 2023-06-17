// import Cookie from "js-cookie";
import Cookies from "js-cookie";
import React, { useEffect } from "react";
import { setToken, user } from "~/api";
import { logOut, setRouter, setUser, updateUser, useAppDispatch } from "~/store";
import { _format } from "~/utils";

const HandleGetUserCurrentInfo = async (userId: number) => {
  try {
    await user.getByID(userId);
  } catch (error) {
    console.log("Lỗi nè!");
  }
};

export const HomeLayoutProtector: React.FC<{}> = ({ children }) => {
  const session = Cookies.get("tokenNHTQ-demo");
  const dispatch = useAppDispatch();

  dispatch(logOut());

  useEffect(() => {
    
    const dispatchUser = async () => {
      session && setToken(session);
      const user: TUser = JSON.parse(
        _format.getJWTDecode(session)[
          "http://schemas.microsoft.com/ws/2008/06/identity/claims/userdata"
        ]
      );

      localStorage.setItem("currentUser", JSON.stringify(user));
      dispatch(setUser(user));
      dispatch(setRouter(user.UserGroupId));

      console.log("Home");

      if (user?.UserId) {
        HandleGetUserCurrentInfo(user?.UserId)
          .then((res) => {
            console.log(res);
            // dispatch(
            //   updateUser({
            //     ...res?.Data,
            //     IsConfirmOTP: false,
            //     Roles: [],
            //     LastName: "",
            //     FirstName: "",
            //   })
            // );

            setToken(session);
          })
          .catch((error) => {});
      }
    };
    if (session) {
      dispatchUser();
    }
  }, [session]);

  return <>{children}</>;
};
