import { AxiosInstance, AxiosResponse } from "axios";
import React, { createContext, FC, useContext } from "react";
import { AsurRaaSelectSearchBaserApiMetaInterface } from "./AsurRaaSelectBaseApi";

export interface AsurRaaSelectBaseApiContextInterface {
  fetcher: AxiosInstance;
  uri: {
    page: string;
    search: string;
  };
  parseResponse: {
    data: (res: AxiosResponse) => [];
    meta: (res: AxiosResponse) => AsurRaaSelectSearchBaserApiMetaInterface;
  };
}

const AsurRaaSelectBaseApiContext = createContext<
  AsurRaaSelectBaseApiContextInterface | undefined
>(undefined);

const AsurRaaSelectBaseApiProvider: FC<
  AsurRaaSelectBaseApiContextInterface | undefined
> = (props) => {
  return (
    <AsurRaaSelectBaseApiContext.Provider
      value={{
        fetcher: props.fetcher,
        uri: props.uri,
        parseResponse: props.parseResponse,
      }}
    >
      {props.children}
    </AsurRaaSelectBaseApiContext.Provider>
  );
};

// * hook
const useGetConfigAsuRaaSelectBaseApi = () => {
  return useContext(AsurRaaSelectBaseApiContext);
};

export {
  AsurRaaSelectBaseApiContext,
  AsurRaaSelectBaseApiProvider,
  useGetConfigAsuRaaSelectBaseApi,
};
