import { Image, ImageProps } from "antd";
import { FC, Fragment, useState } from "react";
import { useGetAsurRaaImageViewer } from "./AsurRaaImageViewerProvider";

export type AsurRaaImageViewerProps = {
  value: string | undefined;
  isPreview?: boolean;
  primitiveImageProps?: ImageProps;
};
export const AsurRaaImageViewer: FC<AsurRaaImageViewerProps> = (props) => {
  const global = useGetAsurRaaImageViewer();
  const [isError] = useState<boolean>(false);
  const imageUrl = `${global?.imageUrl}${props.value}`;
  const defaultImage = global?.fallbackImage;
  return (
    <Fragment>
      <Image
        preview={isError ? false : props.isPreview}
        draggable={false}
        src={imageUrl}
        width={100}
        fallback={defaultImage}
      />
    </Fragment>
  );
};

AsurRaaImageViewer.defaultProps = {
  isPreview: true,
};
