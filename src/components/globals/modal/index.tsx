import { Modal } from "antd";
import React, { FC } from "react";

type TProps = {
  visible: boolean;
  width?: number;
  style?: React.CSSProperties;
  onCancel?: () => void;
};

const Index: FC<TProps> = ({ children, ...props }) => {
  return (
    <Modal
      destroyOnClose={true}
      closable={false}
      footer={null}
      {...props}
      maskStyle={{backgroundColor: "rgba(252, 252, 252, 50%)"}}
    >
      {children}
    </Modal>
  );
};

Index.defaultProps = {
  width: 768,
};

export default Index;
