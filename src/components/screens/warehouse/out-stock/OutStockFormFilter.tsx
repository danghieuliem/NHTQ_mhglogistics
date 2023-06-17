import React, { useEffect, useRef, useState } from "react";
import { useQuery } from "react-query";
import ReactToPrint, { PrintContextConsumer } from "react-to-print";
import configHomeData from "~/api/config-home";
import { FilterInput, IconButton } from "~/components";
import { _format } from "~/utils";

type TProps = {
  onReload: () => Promise<unknown>;
  onHide: () => Promise<unknown>;
  onOutstock: () => Promise<unknown>;
  outStockSessionPackages: TOutStockSessionPackages[];
  dataAll: any;
};

export const OutStockFormFilter: React.FC<TProps> = ({
  onHide,
  onReload,
  onOutstock,
  outStockSessionPackages,
  dataAll,
}) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser({
      UserName: dataAll?.UserName,
      UserPhone: dataAll?.UserPhone,
    });
  }, [dataAll]);

  const { data: configData } = useQuery(
    ["configData"],
    () => configHomeData.get(),
    {
      onSuccess: (res) => {
        return res?.Data;
      },
      retry: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    }
  );

  const componentRef = useRef<ReactToPrint>(null);
  const ComponentToPrint = React.forwardRef<{}, {}>((props, ref: any) => {
    const orderTable = outStockSessionPackages?.filter(
      (item) => item?.SmallPackage?.OrderType === 1
    );
    const transTable = outStockSessionPackages?.filter(
      (item) => item?.SmallPackage?.OrderType === 2
    );

    return (
      <div className="w-full mb-10 p-4" ref={ref}>
        <div className="text-xs text-black">
          {_format.getVNDate(new Date())}
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-1">
            <div className="text-xs text-black my-2 font-bold uppercase">
              {configData?.Data?.CompanyLongName}
            </div>
            <div className="text-xs text-black">
              <span
                dangerouslySetInnerHTML={{
                  __html: configData?.Data?.Address,
                }}
              ></span>
            </div>
            <div className="text-xs text-black">
              Website: {configData?.Data?.WebsiteName}
            </div>
            <div className="text-xs text-black">
              Điện thoại: {configData?.Data?.Hotline}
            </div>
          </div>
          <div className="col-span-1">
            <div className="text-right ml-auto max-w-[270px]">
              <div className="text-xs my-2 text-center text-black">
                Mẫu số 01 - TT
              </div>
              <div className="text-xs text-black text-center">
                (Ban hành theo Thông tư số 133/2016/TT-BTC ngày 26/8/2016 của Bộ
                tài chính)
              </div>
            </div>
          </div>
        </div>
        <div className="text-2xl my-8 text-black font-bold text-center">
          PHIẾU XUẤT KHO
          <div className="text-sm text-black font-normal text-center">
            Thời gian xuất kho: {_format.getVNDate(new Date())}
          </div>
        </div>
        <div className="border-b border-b-[rgba(0,0,0,.3)] text-black text-sm my-3 border-dashed flex justify-between">
          Họ và tên người đến nhận: <p className="w-48">{user?.UserName}</p>
        </div>
        <div className="border-b border-b-[rgba(0,0,0,.3)] text-black text-sm my-3 border-dashed flex justify-between">
          Số điện thoại người đến nhận:{" "}
          <p className="w-48">{user?.UserPhone}</p>
        </div>
        {orderTable?.length > 0 && (
          <>
            <div className="text-black text-sm my-3">
              Danh sách kiện mua hộ:
            </div>
            <table className="table-preview">
              <thead>
                <tr>
                  <th>Stt</th>
                  <th>Mã kiện</th>
                  <th>Cân thực (kg)</th>
                  <th>Số khối (m3)</th>
                  <th>Kích thước (D x R x C)</th>
                  <th>Phí cân nặng (VNĐ)</th>
                </tr>
              </thead>
              <tbody>
                {orderTable.map((item, index) => {
                  return (
                    <tr key={item.Id}>
                      <td>{++index}</td>
                      <td>{item?.OrderTransactionCode}</td>
                      <td>{item?.SmallPackage?.Weight}</td>
                      <td>{item?.SmallPackage?.VolumePayment}</td>
                      <td>{item?.SmallPackage?.LWH}</td>
                      <td>
                        {_format.getVND(item?.SmallPackage?.PriceWeight, "")}
                      </td>
                    </tr>
                  );
                })}
                <tr>
                  <td colSpan={5}>Tổng tiền cần thanh toán</td>
                  <td>
                    {_format.getVND(
                      Number(
                        outStockSessionPackages.reduce(
                          (prev, cur) => prev + cur?.TotalPriceVND,
                          0
                        )
                      )
                    )}
                    {/* {_format.getVND(dataAll?.TotalPay)} */}
                  </td>
                </tr>
              </tbody>
            </table>
          </>
        )}
        {/* {transTable?.length > 0 && (
          <>
            <div className="text-black text-sm my-3">
              Danh sách kiện ký gửi:
            </div>
            <table className="table-preview">
              <thead>
                <tr>
                  <th>Stt</th>
                  <th>Mã kiện</th>
                  <th>Cân thực (kg)</th>
                  <th>Thể tích (m3)</th>
                  <th>Phí cân nặng (VNĐ)</th>
                  <th>Kích thước (D x R x C)</th>
                </tr>
              </thead>
              <tbody>
                {transTable?.map((item, index) => {
                  return (
                    <tr key={item.Id}>
                      <td>{++index}</td>
                      <td>{item?.OrderTransactionCode}</td>
                      <td>{item?.SmallPackage?.Weight}</td>
                      <td>{item?.SmallPackage?.VolumePayment}</td>
                      <td>
                        {_format.getVND(item?.SmallPackage?.PriceWeight, "")}
                      </td>
                      <td>{item?.SmallPackage?.LWH}</td>
                    </tr>
                  );
                })}
                <tr>
                  <td colSpan={5}>Tổng tiền đơn hàng</td>
                  <td>
                    {_format.getVND(dataAll?.TotalPay)}
                  </td>
                </tr>
              </tbody>
            </table>
          </>
        )} */}
        <div className="mt-4">
          <strong>***Lưu ý:</strong>
          <div className="text-sm">
            * Quý khách vui lòng quay video trong khi mở hàng, giữ lại tư liệu
            hộp và mã vận đơn để chúng tôi có tư liệu phản ánh với shop nếu phát
            sinh lỗi
          </div>
          <div className="text-sm">
            * Sản phẩm có xảy ra lỗi vui lòng phản hồi trong 24h, Sau thời gian
            trên đơn hàng được xác nhận hoàn thành.
          </div>
          <div className="text-sm">
            * Mọi chính sách được cập nhật tại mục CHÍNH SÁCH trên Website.
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="col-span-1">
            <div className="text-center text-base">Người xuất hàng</div>
            <div className="text-center text-sm">(Ký, họ tên)</div>
          </div>
          <div className="col-span-1">
            <div className="text-center text-base">Người nhận</div>
            <div className="text-center text-sm">(Ký, họ tên)</div>
          </div>
        </div>
      </div>
    );
  });

  return (
    <React.Fragment>
      <div className="hidden">
        <ComponentToPrint ref={componentRef} />
      </div>
      <div className="grid grid-cols-8 max-w-[1100px]">
        <div className="col-span-2 mr-4">
          <FilterInput
            placeholder="Họ tên người nhận"
            id="username"
            name="UserName"
            inputClassName=""
            value={user?.UserName}
            handleSearch={(val) => setUser({ ...user, UserName: val })}
          />
        </div>
        <div className="col-span-2 mr-4">
          <FilterInput
            placeholder="Số điện thoại người nhận"
            id="userphone"
            name="UserPhone"
            inputClassName=""
            value={user?.UserPhone}
            handleSearch={(val) => setUser({ ...user, UserPhone: val })}
          />
        </div>
        <div className="col-span-4 flex items-end">
          {!!outStockSessionPackages?.find((x) => !x.IsPayment) ? (
            <IconButton
              onClick={onReload}
              title="Reload"
              icon="fas fa-sync"
              btnClass="!mr-4"
              showLoading
              toolip=""
            />
          ) : (
            <ReactToPrint content={() => componentRef.current}>
              <PrintContextConsumer>
                {({ handlePrint }) => (
                  <IconButton
                    onClick={() => onOutstock().then(() => handlePrint())}
                    title="Xuất kho"
                    icon="fas fa-boxes"
                    btnClass="!mr-4"
                    showLoading
                    toolip=""
                  />
                )}
              </PrintContextConsumer>
            </ReactToPrint>
          )}
          <IconButton
            onClick={onHide}
            icon="fas fa-ban"
            title="Ẩn đơn chưa thanh toán"
            showLoading
            toolip=""
          />
        </div>
      </div>
    </React.Fragment>
  );
};
