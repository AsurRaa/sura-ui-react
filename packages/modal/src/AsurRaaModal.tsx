import React, { FC, Fragment } from "react";
import {
  DraggableModal,
  DraggableModalProps,
  DraggableModalProvider,
} from "ant-design-draggable-modal";
import "ant-design-draggable-modal/dist/index.css";
import "antd/dist/antd.css";
import { useTranslation } from "react-i18next";

export interface AsurRaaModalProps extends DraggableModalProps {
  isSubmitLoading?: boolean;
}

const AsurRaaModal: FC<AsurRaaModalProps> = (props) => {
  const { t } = useTranslation();

  return (
    <Fragment>
      <DraggableModal
        destroyOnClose={true}
        keyboard={false}
        initialWidth={500}
        initialHeight={750}
        okText={t("ok")}
        cancelText={t("Cancel")}
        okButtonProps={{
          loading: props.isSubmitLoading,
        }}
        {...props}
      />
    </Fragment>
  );
};

export {
  DraggableModalProvider as AsurRaaDraggableModalProvider,
  AsurRaaModal,
};
