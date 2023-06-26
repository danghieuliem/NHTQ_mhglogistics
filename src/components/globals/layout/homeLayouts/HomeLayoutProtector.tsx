// import Cookie from "js-cookie";
import Cookies from "js-cookie";
import React, { useEffect } from "react";
import { useQuery } from "react-query";
import { setToken } from "~/api";
import configHomeData from "~/api/config-home";
import { logOut, setRouter, updateGlobal, useAppDispatch } from "~/store";
import { _format } from "~/utils";

export const HomeLayoutProtector: React.FC<{}> = ({ children }) => {
  const session = Cookies.get("tokenNHTQ-demo");
  const dispatch = useAppDispatch();
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

  useEffect(() => {
    if (!session) {
      dispatch(logOut());
      
    }

    const dispatchUser = async () => {
      session && setToken(session);
      const user: TUser = JSON.parse(
        _format.getJWTDecode(session)[
          "http://schemas.microsoft.com/ws/2008/06/identity/claims/userdata"
        ]
      );
      dispatch(setRouter(user.UserGroupId));
    };

    if (session) {
      dispatchUser();
    }
  }, [session]);

  return <>{children}</>;
};
