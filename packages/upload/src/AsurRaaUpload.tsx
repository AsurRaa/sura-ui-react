import { FC, useEffect, useState } from "react";
import { Upload } from "antd";
import ImgCrop, { ImgCropProps } from "antd-img-crop";
import { REST_URI_ENUM } from "../../constants/rest-uri.constant";
import { BASE_API_URL } from "../../configs/global.config";
import { UploadFile, UploadProps } from "antd/lib/upload/interface";
import { uploadInterface } from "@src/interface";
import { getReturnSingleImageFromServer } from "@src/utilities/returnImageFromServer";

export interface AsurRaaSingleUploadProps extends UploadProps {
  getReturnUrl?: (url: any) => void;
  defaultImage?: string | null | undefined;
  corpProps?: ImgCropProps;
}

export const AsurRaaSingleUpload: FC<AsurRaaSingleUploadProps> = (props) => {
  const postUrl = `${BASE_API_URL}${REST_URI_ENUM.UPLOAD_SINGLE_IMAGE}`;
  const token = localStorage.getItem("token");
  const [fileList, setFileList] = useState<Array<UploadFile<uploadInterface>>>(
    []
  );

  useEffect(() => {
    if (props.defaultImage !== undefined) {
      setFileList([
        {
          uid: "-1",
          name: "image.png",
          status: "done",
          url:
            props.defaultImage === null ||
            props.defaultImage === undefined ||
            props.defaultImage === ""
              ? undefined
              : getReturnSingleImageFromServer(props.defaultImage),
          size: 100,
          type: "",
          // @ts-ignore
          originFileObj: "hi",
        },
      ]);
    }
  }, [props.defaultImage]);

  const onChange = ({
    fileList: newFileList,
  }: {
    fileList: Array<UploadFile>;
  }) => {
    setFileList(newFileList);
    props?.getReturnUrl?.(newFileList[0]?.response);
  };

  const onPreview = async (file: UploadFile) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        // @ts-ignore
        reader.readAsDataURL(file.originFileObj);
        // @ts-ignore
        reader.onload = () => resolve(reader?.result);
      });
    }
    const image = new Image();
    // @ts-ignore
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  return (
    <div>
      <ImgCrop rotate {...props.corpProps}>
        <Upload
          action={postUrl}
          headers={{
            // @ts-ignore
            authorization: `Bearer ${token}`,
          }}
          listType="picture-card"
          // @ts-ignore
          fileList={fileList}
          onChange={onChange}
          onPreview={onPreview}
        >
          {fileList.length < 1 && "+ Upload"}
        </Upload>
      </ImgCrop>
    </div>
  );
};
