import React from "react";

export const CartNote = () => {
  return (
    <div className="cartNoteContainer">
      <i className="fal fa-exclamation-circle icon"></i>
      <p className="note italic">
        Sản phẩm trong giỏ sẽ tự động xóa trong vòng 30 ngày. Người bán trên
        website 1688.com thường có quy định về số lượng mua tối thiểu, bội số
        mỗi sản phẩm, giá trị đơn hàng tối thiểu và sẽ từ chối bán nếu không đáp
        ứng. Trong trường hợp đó Order Trung Minh Quang sẽ hủy những đơn hàng
        này và không báo trước.
      </p>
    </div>
  );
};
