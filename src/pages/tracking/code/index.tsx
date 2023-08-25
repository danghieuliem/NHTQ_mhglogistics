import clsx from "clsx";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { smallPackage } from "~/api";
import { Loading } from "~/components";
import { MvdNotFound } from "~/components/screens/status";
import { TrackingDetail } from "~/components/screens/user/tracking";

const Box = ({ childern, isResult }) => {
  return (
    <div className={clsx("w-[100vw] h-[100vh] relative", isResult && "bg-sec")}>
      <div className="w-3/4 translate-x-[-50%] translate-y-[-50%] absolute top-1/2 left-1/2">
        {childern}
      </div>
    </div>
  );
};

const Index = () => {
  const [trackingData, setTrackingData] = useState(null);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const code = router?.query?.TransactionCode || null;

  const handleGetCode = async (TransactionCode: string) => {
    setLoading(true);

    smallPackage
      .getByTransactionCode({ TransactionCode })
      .then((res) => {
        setLoading(false);
        setTrackingData(res?.Data);
      })
      .catch((error) => {
        setLoading(false);
        setTrackingData(null);
      });
  };

  useEffect(() => {
    console.log(router?.query?.TransactionCode);
    if (code) {
      handleGetCode(code.toString());
    }
  }, [router?.query]);

  if (loading) {
    return <Box childern={<Loading />} isResult={false} />;
  }

  if (!trackingData) {
    return <Box childern={<MvdNotFound />} isResult={false} />;
  }
  return (
    <Box childern={<TrackingDetail data={trackingData} />} isResult={true} />
  );
};

export default Index;
