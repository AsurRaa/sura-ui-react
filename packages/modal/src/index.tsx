import { ModalProps } from "antd";
import Modal from "antd/lib/modal/Modal";
import React from "react";
import { FC } from "react";

export interface AsurRaaModalProps extends ModalProps {}
export const AsurRaaModal: FC<AsurRaaModalProps> = (props) => {
  return <Modal {...props} />;
};
