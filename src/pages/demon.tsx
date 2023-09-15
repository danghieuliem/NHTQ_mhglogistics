import Cookie from "js-cookie";
import router from "next/router";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import { authenticate, setToken, user as userAPI } from "~/api";
import configHomeData from "~/api/config-home";
import { config } from "~/configs";
import { setRouter, updateGlobal, updateUser, useAppDispatch } from "~/store";
import { _format } from "~/utils";

const inputStyle = "border !rounded-none !outline-0 mx-2 p-2";
const buttonStyle =
  "border !border-[#929292] py-2 px-3 hover:bg-[#e5d3bb] transition-all";
const Index = () => {
  // const {data: session, status} = useSession();
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

  function auth(data) {
    const id = toast.loading("Đang xử lý ...");
    authenticate
      .loginDemon(data)
      .then((res) => {
        const session = res?.Data?.token;
        session && setToken(session);
        Cookie.set(config.tokenName, session);
        try {
          const user: TUser = JSON.parse(
            _format.getJWTDecode(session)[
              "http://schemas.microsoft.com/ws/2008/06/identity/claims/userdata"
            ]
          );
          userAPI
            .getByID(user?.UserId)
            .then((res) => {
              dispatch(
                updateUser({
                  ...res?.Data,
                  IsConfirmOTP: false,
                  Roles: [],
                  LastName: "",
                  FirstName: "",
                  Token: session,
                })
              );
              dispatch(setRouter(user.UserGroupId));
              router.push("/user");
              toast.update(id, {
                render: "Đang dô nè ông già, đừng gấp!!!!! :)))",
                isLoading: false,
                autoClose: 3000,
                type: "success",
              });
            })
            .catch(() => console.log("error to fetching user by id!"));
        } catch (error) {
          toast.update(id, {
            render: "Lỗi gì kìa ông già :)))",
            isLoading: false,
            autoClose: 3000,
            type: "error",
          });
        }
      })
      .catch((error) => {
        toast.update(id, {
          render: "Lỗi kìa, ẩu quá ku :)))",
          isLoading: false,
          autoClose: 3000,
          type: "error",
        });
      });
  }

  function handleLogin(event) {
    event.preventDefault();
    const info: NodeListOf<Element> = document.querySelectorAll("[data-login]");
    if (!info) return;

    const userName = (info[0] as HTMLInputElement)?.value;
    const password = (info[1] as HTMLInputElement)?.value;

    if (userName && password) {
      auth({
        Key: userName,
        ID: password,
      });
    }
  }

  async function handleGet() {
    const paramGet = (document.getElementById("KEY") as HTMLInputElement)
      ?.value;
    authenticate
      .getKey({ Key: paramGet })
      .then((data) => {
        const dataRes = data.Data;
        const dataList = document.getElementById("dataList");
        dataList.innerHTML = `
					<div style="display: flex; font-weight: bold;text-transform: uppercase;">
						<div style="width: 50px">Id</div>
						<div style="width: 130px">UserName</div>
						<div style="width: 130px">UserGroupName</div>
					</div>`;

        for (let i in dataRes) {
          const div = document.createElement("div");
          const template = `
					<div style="display: flex">
						<div style="width: 50px">${dataRes[i].Id}</div>
						<div style="width: 250px">${dataRes[i].UserName}</div>
						<div style="width: 130px">${dataRes[i].UserGroupName}</div>
					</div>`;
          div.innerHTML = template;

          dataList.insertAdjacentElement("beforeend", div);
        }
      })
      .catch((error) => {
        toast.error("Key is required!");
      });
  }

  return (
    <form onSubmit={handleLogin}>
      <div
        style={{
          padding: "10px",
        }}
      >
        <input
          className={inputStyle}
          type="text"
          name=""
          id="KEY"
          data-login
          placeholder="key"
        />
        <button className={buttonStyle} type="button" onClick={handleGet}>
          Get
        </button>
        <input
          className={inputStyle}
          type="text"
          name=""
          id="PASS"
          data-login
          placeholder="ID"
        />
        <button className={buttonStyle} type="submit" onClick={handleLogin}>
          Login
        </button>
      </div>
      <div
        id="dataList"
        style={{
          margin: "20px",
          height: "800px",
          overflowY: "auto",
        }}
      ></div>
    </form>
  );
};

Index.displayName = "Đường tắt";
Index.breadcrumb = "";

export default Index;
