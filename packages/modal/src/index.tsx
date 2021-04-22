import React, { FC, Fragment } from "react";
import {
  DraggableModal,
  DraggableModalProvider,
  DraggableModalProps,
} from "ant-design-draggable-modal";
import "antd/dist/antd.css";
import "ant-design-draggable-modal/dist/index.css";
import { useTranslation } from "react-i18next";

interface AsurRaaModalProps extends DraggableModalProps {
  onSubmitLoading?: boolean;
}

const AsurRaaModal: FC<AsurRaaModalProps> = (props) => {
  const { t } = useTranslation();
  return (
    <Fragment>
      <DraggableModal
        keyboard={false}
        initialWidth={500}
        initialHeight={750}
        okText={<p>{t("ok")}</p>}
        cancelText={<p>{t("cancel")}</p>}
        okButtonProps={{ loading: props.onSubmitLoading }}
        {...props}
      />
    </Fragment>
  );
};

export {
  DraggableModalProvider as AsurRaaDraggableModalProvider,
  AsurRaaModal,
  AsurRaaModalProps
};
