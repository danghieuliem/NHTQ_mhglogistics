import { useSelector } from "react-redux";
import { GroupUserTable, Layout, NotFound } from "~/components";
import { breadcrumb } from "~/configs";
import { SEOConfigs } from "~/configs/SEOConfigs";
import { useCatalogue } from "~/hooks";
import { RootState } from "~/store";
import { TNextPageWithLayout } from "~/types/layout";

const Index: TNextPageWithLayout = () => {
  const { userGroup } = useCatalogue({ userGroupEnabled: true });
  const userCurrentInfo: TUser = useSelector(
    (state: RootState) => state.userCurrentInfo
  );

  const UserGroupId = userCurrentInfo?.UserGroupId;
  const isAdmin = UserGroupId && UserGroupId === 1;
  if (!isAdmin) return <NotFound />;

  return (
    <div className="tableBox w-[500px]">
      <div className=" m-auto mb-4 mx-4">
        {/* <GroupUserFilter /> */}
        <div className="mt-4">
          <GroupUserTable data={userGroup} />
        </div>
      </div>
    </div>
  );
};

Index.displayName = SEOConfigs?.staff?.decentralization;
Index.breadcrumb = breadcrumb.employee.groupUser;
Index.Layout = Layout;

export default Index;
