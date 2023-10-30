import { Tabs } from "antd";
import clsx from "clsx";
import { useState } from "react";
import { Control, useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { configuration } from "~/api";
import {
  Button,
  ConfigurationGeneral,
  ConfigurationNotification,
  ConfigurationRateAndRose,
  ConfigurationSEO,
  ConfigurationSocialNetwork,
  Layout,
  toast,
} from "~/components";
import { breadcrumb } from "~/configs";
import { SEOConfigs } from "~/configs/SEOConfigs";
import { RootState, updateGlobal } from "~/store";
import { TNextPageWithLayout } from "~/types/layout";

const className = "TabPanelSetting py-6";
const { TabPane } = Tabs;

function countRequireInputValue(numberError: number, title: string) {
  return (
    <div>
      {title}
      {numberError > 0 && (
        <span style={{ color: "#e77a7a" }}>({numberError})</span>
      )}
    </div>
  );
}
const Index: TNextPageWithLayout = () => {
  // const dataGlobal: TConfig = useSelector((state: RootState) => state.dataGlobal);
  const dispatch = useDispatch();

  const userCurrentInfo: TUser = useSelector(
    (state: RootState) => state.userCurrentInfo
  );

  const [configData, setConfigData] = useState<TConfig>(null);
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<Partial<TConfig>>({
    mode: "onBlur",
  });

  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();

  const mutationDataConfig = useMutation({
    mutationFn: (data: TConfig) => configuration.update(data),
  });

  const _onPress = async (data: TConfig) => {
    const newData = {
      ...data,
      id: 1,
      RestAPIKey: "ZTcwZWNhYTItMDlmYy00MDgzLTk5ZDAtZTM0NTU2MWQ1Mjkw",
      OneSignalAppID: "86419110-33f6-4e71-b73b-54bd86b5f99a",
    };
    setLoading(true);
    mutationDataConfig
      .mutateAsync(newData)
      .then(() => {
        toast.success("Cập nhật thành công");
        dispatch(updateGlobal(newData));
        queryClient.invalidateQueries({ queryKey: ["homeConfig"] });
      })
      .catch((error) => {})
      .finally(() => setLoading(false));
    // try {
    //
    // 	await configuration.update({
    // 		...data,
    // 		id: 1,
    // 		RestAPIKey: "ZTcwZWNhYTItMDlmYy00MDgzLTk5ZDAtZTM0NTU2MWQ1Mjkw",
    // 		OneSignalAppID: "86419110-33f6-4e71-b73b-54bd86b5f99a",
    // 	});

    // 	setConfigData({...data});
    // 	toast.success("Cập nhật thành công");
    // 	queryClient.invalidateQueries({queryKey: ['homeConfig']});
    // } catch (error) {
    // 	toast.error(error);
    // }
    // setLoading(false);
  };

  const { isFetching } = useQuery(
    ["articleList", 1],
    () => configuration.getByID(1),
    {
      onSuccess: (data) => {
        reset(data.Data);
        setConfigData(data.Data);
      },
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      retry: false,
      onError: toast.error,
      enabled: userCurrentInfo?.UserGroupId === 1,
    }
  );

  return (
    <div
      className="xl:grid xl:grid-cols-1 xl:gap-4 w-full"
      style={{
        pointerEvents: isFetching ? "none" : "all",
      }}
    >
      <div className="col-span-1 tableBox">
        <Tabs
          style={{
            pointerEvents: loading ? "none" : "all",
          }}
          tabBarExtraContent={
            <div className="col-span-1">
              <Button
                loading={loading}
                title="Cập nhật"
                onClick={handleSubmit(_onPress)}
              />
              {/* <IconButton
								onClick={}
								icon="fas fa-edit mr-2"
								title="Cập nhật"
								btnClass=""
								showLoading
								toolip=""
								disabled={loading || Object.keys(errors).length > 0}
							/> */}
            </div>
          }
        >
          <TabPane tab="Cấu hình chung" key="1">
            <div id="general" className={clsx(className)}>
              <ConfigurationGeneral
                control={control as Control<TConfig1, object>}
                data={configData}
              />
            </div>
          </TabPane>

          <TabPane tab="Cấu hình mạng xã hội" key="2">
            <div id="social-network" className={clsx(className)}>
              <ConfigurationSocialNetwork
                control={control as Control<TConfig2, object>}
                data={configData}
              />
            </div>
          </TabPane>

          <TabPane
            tab={countRequireInputValue(
              Object.keys(errors).length,
              "Tỷ giá và hoa hồng"
            )}
            key="3"
          >
            <div id="rate-rose" className={clsx(className)}>
              <ConfigurationRateAndRose
                control={control as Control<TConfig3, object>}
                data={configData}
              />
            </div>
          </TabPane>

          <TabPane tab="Thông báo" key="4">
            <div id="notification" className={clsx(className)}>
              <ConfigurationNotification
                control={control as Control<TConfig4, object>}
                data={configData}
              />
            </div>
          </TabPane>

          <TabPane tab="Cấu hình SEO" key="6">
            <div id="seo" className={clsx(className)}>
              <ConfigurationSEO
                control={control as Control<TConfig6, object>}
                data={configData}
              />
            </div>
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
};

Index.displayName = SEOConfigs?.settings?.system;
Index.breadcrumb = breadcrumb.settings.configration;
Index.Layout = Layout;

export default Index;
