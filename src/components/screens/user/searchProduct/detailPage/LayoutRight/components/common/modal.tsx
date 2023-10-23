import { Modal } from "antd";
import Link from "next/link";

export const DetailProductModal = ({ openModal, setOpenModal }) => {
  return (
    <Modal
      centered
      visible={openModal}
      onOk={() => setOpenModal(false)}
      onCancel={() => setOpenModal(false)}
      footer={false}
    >
      <div className="p-[30px]">
        <div className="mb-[30px]">
          <p className="text-[18px] font-medium text-green">
            Hàng đã được thêm vào giỏ. Bạn có muốn đi đến giỏ hàng
          </p>
        </div>
        <div className="flex gap-4 justify-end">
          <button
            type="button"
            className="text-[16px] text-[#000] px-8 py-2 rounded"
            style={{
              border: "1px solid #dedede",
            }}
            onClick={() => setOpenModal(false)}
          >
            Ở lại
          </button>
          <Link href="/user/cart/">
            <a
              target="_blank"
              onClick={() => {
                setOpenModal(false);
              }}
              className="text-[16px] px-8 py-2 bg-main hover:bg-mainDark text-white rounded"
            >
              Đồng ý
            </a>
          </Link>
        </div>
      </div>
    </Modal>
  );
};
