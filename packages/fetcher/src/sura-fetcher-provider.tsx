import { AxiosInstance } from "axios";
import { createContext, FC, useContext } from "react";
import { TheUseQueryInstance } from "./types";
import React from "react";

export interface SuraFetcherContextInterface {
  axiosInstance: AxiosInstance;
  useQueryInstance: TheUseQueryInstance;
  paramConfig?: {
    pageParamName: string;
    limitParamName: string;
    searchParamName: string;
    pageDefaultValue: number;
    limitDefaultValue: number;
  };
}

export type ParamConfig = SuraFetcherContextInterface["paramConfig"];
export type SuraFetcherConfig = SuraFetcherContextInterface;

export const SuraFetcherContext = createContext<
  SuraFetcherContextInterface | undefined
>(undefined);

export const SuraFetcherProvider: FC<SuraFetcherContextInterface> = (props) => {
  return (
    <SuraFetcherContext.Provider
      value={{
        axiosInstance: props.axiosInstance,
        useQueryInstance: props.useQueryInstance,
        paramConfig: props.paramConfig,
      }}
    >
      {props.children}
    </SuraFetcherContext.Provider>
  );
};

export const useSuraFetcherProvider = () => {
  return useContext(SuraFetcherContext);
};

// import { AxiosInstance } from "axios";
// import { createContext, FC, useContext } from "react";
// import { TheUseQueryInstance } from "./types";
// import React from "react";

// export interface SuraFetcherContextInterface {
//   axiosInstance: AxiosInstance;
//   useQueryInstance: TheUseQueryInstance;
//   paramConfig?: {
//     pageParamName: string;
//     limitParamName: string;
//     searchParamName: string;
//     pageDefaultValue: number;
//     limitDefaultValue: number;
//   };
// }

// export type ParamConfig = SuraFetcherContextInterface["paramConfig"];
// export type SuraFetcherConfig = SuraFetcherContextInterface;

// // * Handler for fetching sura data
// export const suraFetcherContextHandler = <P extends unknown>() => {
//   // * Context
//   const SuraFetcherContext = createContext<
//     SuraFetcherContextInterface | undefined
//   >(undefined);

//   // * Provider
//   const SuraFetcherProvider: FC<SuraFetcherContextInterface> = (props) => {
//     return (
//       <SuraFetcherContext.Provider
//         value={{
//           axiosInstance: props.axiosInstance,
//           useQueryInstance: props.useQueryInstance,
//           paramConfig: props.paramConfig,
//         }}
//       >
//         {props.children}
//       </SuraFetcherContext.Provider>
//     );
//   };

//   // * Hook
//   const useSuraFetcherProvider = () => {
//     const pagination: P = {} as P;
//     const context = useContext(SuraFetcherContext);
//     return {
//       pagination,
//       context,
//     };
//   };
//   return {
//     SuraFetcherContext,
//     SuraFetcherProvider,
//     useSuraFetcherProvider,
//   };
// };
