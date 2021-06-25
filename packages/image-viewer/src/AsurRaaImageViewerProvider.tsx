import React from "react";
import { createContext, FC, useContext } from "react";

export interface AsurRaaImageViewerContextInterface {
  imageUrl: string;
  fallbackImage: string;
}

const AsurRaaImageViewerContext = createContext<
  AsurRaaImageViewerContextInterface | undefined
>(undefined);

const AsurRaaImageViewerProvider: FC<
  AsurRaaImageViewerContextInterface | undefined
> = (props) => {
  return (
    <AsurRaaImageViewerContext.Provider
      value={{
        fallbackImage: props.fallbackImage,
        imageUrl: props.imageUrl,
      }}
    >
      {props.children}
    </AsurRaaImageViewerContext.Provider>
  );
};

// * hook
const useGetAsurRaaImageViewer = () => {
  return useContext(AsurRaaImageViewerContext);
};

export {
  AsurRaaImageViewerContext,
  AsurRaaImageViewerProvider,
  useGetAsurRaaImageViewer,
};
