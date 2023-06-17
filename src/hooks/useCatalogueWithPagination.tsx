import { useQuery } from "react-query";
import { permitObject } from "~/api/permit-object";
import { showToast } from "~/components";

// thời gian sẽ api loại 1 lần // 5 là số phút + 6 * 10000 là 1 phút  =  5 phút
const staleTime = 5 * 6 * 10000;
// bắt đầu thực thi từ thời gian
const initialDataUpdatedAt = new Date().getTime();
// api error
const onError = (error: any) =>
  showToast({
    title: (error as any)?.response?.data?.ResultCode,
    message: (error as any)?.response?.data?.ResultMessage,
    type: "error",
  });

type TProps = {
  permitParams?: TPaginationParamsWithReactQuery;
};

export const useCatalogueWithPagination = (props: TProps) => {
  const {
    permitParams: {
      Enabled: permitEnabled,
      onSucess: permitOnSucess,
      ...newPermitParams
    },
  } = props;

  const permitList = useQuery(
    ["permitList", newPermitParams],
    async () =>
      await permitObject
        .getList({ ...newPermitParams, OrderBy: "Id desc" })
        .then((res) => res.Data),
    {
      staleTime,
      initialDataUpdatedAt,
      onSuccess: permitOnSucess,
      onError,
      enabled: permitEnabled,
    }
  );

  // kiểm tra api nếu không có params thì trả về undefined, ngược lại thì trả đúng api
  return { permitList: props.permitParams && permitList.data } as const;
};
