import { Collapse } from "antd";
import clsx from "clsx";
import { useSelector } from "react-redux";
import { RootState } from "~/store";

export const RechargeContent = ({ newUser }) => {
  const dataGlobal: TConfig = useSelector(
    (state: RootState) => state.dataGlobal
  );

  return (
    <>
      {window.innerWidth >= 860 ? (
        <>
          <div className="mb-4">
            <span className="text-md block mb-2 font-bold uppercase text-red border-b border-[#f8dfd5]">
              QUY ĐỊNH HÌNH THỨC THANH TOÁN
            </span>
            <table className="w-full ">
              <tbody>
                <tr className="">
                  <td
                    colSpan={2}
                    className="bg-main text-center py-1 font-bold text-white"
                  >
                    Số tiền đặt cọc trước bao gồm
                  </td>
                </tr>
                <tr className="!bg-sec text-white ">
                  <th className="py-1 border-r-2">Tiền hàng</th>
                  <th className="py-1 border-l-2">Phí dịch vụ</th>
                </tr>
                <tr>
                  <td className="p-2">
                    Giá sản phẩm trên website đặt hàng Trung Quốc, số tiền này
                    thu hộ cho nhà cung cấp.
                  </td>
                  <td className="p-2">
                    Phí khách hàng trả cho
                    <span className="font-bold uppercase mx-1">
                      {dataGlobal?.CompanyLongName}
                    </span>
                    để tiến hành thu mua theo đơn hàng đã đặt.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div>
            <span className="text-md block mb-2 font-bold uppercase text-red border-b border-[#f8dfd5]">
              CÓ 2 HÌNH THỨC THANH TOÁN:
            </span>
            <table className="w-full">
              <tbody>
                <tr className="bg-sec text-white">
                  <th className="py-1 border-r-2">Thanh toán trực tiếp</th>
                  <th className="py-1 border-l-2">Thanh toán chuyển khoản</th>
                </tr>
                <tr>
                  <td className="p-2">
                    <span className="font-bold text-blue">
                      - Đặt cọc trực tiếp tại địa chỉ:
                    </span>
                    {[dataGlobal.Address].map((address, index) => (
                      <div
                        className="font-bold"
                        key={clsx(address, index)}
                        dangerouslySetInnerHTML={{ __html: address }}
                      ></div>
                    ))}
                  </td>
                  <td className="p-2">
                    <div className="font-bold text-blue">
                      - Cú pháp chuyển khoản theo:
                    </div>
                    <div className="font-bold">
                      NAP {newUser?.UserName} {newUser?.Phone}
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <Collapse defaultActiveKey={["1"]} key={"1"}>
          <Collapse.Panel key={"1"} header="QUY ĐỊNH & HÌNH THỨC NẠP TIỀN">
            <div className="my-4" key={"3"}>
              <span className="text-md block mb-2 font-bold uppercase text-red border-b border-[#f8dfd5]">
                QUY ĐỊNH HÌNH THỨC THANH TOÁN
              </span>
              <div className="overflow-x-scroll">
                <table>
                  <tbody>
                    <tr>
                      <td colSpan={2} className="text-center bg-[#fcfcfc]">
                        Để kết thúc quá trình đặt hàng, quý khách thanh toán một
                        khoản tiền đặt cọc trước cho{" "}
                        <div className="font-bold uppercase">
                          {dataGlobal?.CompanyLongName}
                        </div>
                      </td>
                    </tr>
                    <tr className="">
                      <td
                        colSpan={2}
                        className="bg-main text-center py-1 font-bold text-white"
                      >
                        Số tiền đặt cọc trước bao gồm
                      </td>
                    </tr>
                    <tr className="bg-sec text-white ">
                      <th className="py-1 border-r-2">Tiền hàng</th>
                      <th className="py-1 border-l-2">Phí dịch vụ</th>
                    </tr>
                    <tr>
                      <td className="p-2">
                        Giá sản phẩm trên website đặt hàng Trung Quốc, số tiền
                        này thu hộ cho nhà cung cấp.
                      </td>
                      <td className="p-2">
                        Phí khách hàng trả cho{" "}
                        <span className="font-bold uppercase">
                          {dataGlobal?.CompanyLongName}
                        </span>{" "}
                        để tiến hành thu mua theo đơn hàng đã đặt.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div key={"4"}>
              <span className="text-md block mb-2 font-bold uppercase text-red border-b border-[#f8dfd5]">
                CÓ 2 HÌNH THỨC THANH TOÁN:
              </span>
              <div className="overflow-x-scroll">
                <table>
                  <tbody>
                    <tr className="bg-sec text-white">
                      <th className="py-1">Thanh toán trực tiếp</th>
                      <th className="py-1">Thanh toán chuyển khoản</th>
                    </tr>
                    <tr>
                      <td className="p-2">
                        <span className="font-bold text-blue">
                          - Khách hàng có thể đặt cọc trực tiếp tại địa chỉ
                        </span>
                        {[dataGlobal.Address].map((address, index) => (
                          <div
                            className="font-bold"
                            key={clsx(address, index)}
                            dangerouslySetInnerHTML={{ __html: address }}
                          ></div>
                        ))}
                      </td>
                      <td className="p-2">
                        <div className="font-bold text-blue">
                          - Nội dung chuyển khoản theo cú pháp
                        </div>
                        <div className="font-bold">
                          NAP {newUser?.UserName} {newUser?.Phone}
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </Collapse.Panel>
        </Collapse>
      )}
    </>
  );
};
