// import Cookie from "js-cookie";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import React from "react";
import { config } from "~/configs";

export const HomeLayoutProtector: React.FC<{}> = ({ children }) => {
  const session = Cookies.get(config.tokenName);
  const router = useRouter();

  // const dataGlobal: any = useSelector((state: RootState) => state.dataGlobal);

  if (session) {
    router.push("/user/")
  }

  // const dispatch = useAppDispatch();
  // useQuery({
  //   queryKey: ["homeConfig"],
  //   queryFn: () =>
  //     configHomeData.get().then((res) => {
  //       dispatch(updateGlobal({ ...res?.Data }));
  //     }),
  //   staleTime: 3000,
  //   refetchOnMount: false,
  //   refetchOnWindowFocus: true,
  // })

  // useEffect(() => {
  //   if (!session) {
  //     dispatch(logOut());
  //   }

  //   const dispatchUser = async () => {
  //     session && setToken(session);
  //     const user: TUser = JSON.parse(
  //       _format.getJWTDecode(session)[
  //         "http://schemas.microsoft.com/ws/2008/06/identity/claims/userdata"
  //       ]
  //     );
  //     dispatch(setRouter(user.UserGroupId));
  //   };

  //   if (session) {
  //     dispatchUser();
  //   }
  // }, [session]);

  return <>{children}</>;
};
