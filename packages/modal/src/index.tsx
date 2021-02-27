import React, { FC, Fragment } from "react";

import {
  DraggableModal,
  DraggableModalProvider,
  DraggableModalProps,
} from "ant-design-draggable-modal";
import "antd/dist/antd.css";
import "ant-design-draggable-modal/dist/index.css";

export interface AsurRaaModalInterface extends DraggableModalProps {
  name?: string;
}

const AsurRaaModal: FC<AsurRaaModalInterface> = (props) => {
  return (
    <Fragment>
      <DraggableModal {...props} />
    </Fragment>
  );
};

export {
  DraggableModalProvider as AsurRaaDraggableModalProvider,
  AsurRaaModal,
};