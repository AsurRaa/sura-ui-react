import { createContext, FC, useContext } from "react";

export interface SuraSocketContextInterface {
  token: string;
  socketRoute: string;
}

export type SuraSocketConfig = SuraSocketContextInterface;

export const SuraSocketContext = createContext<
  SuraSocketContextInterface | undefined
>(undefined);

export const SuraSocketProvider: FC<SuraSocketContextInterface> = (props) => {
  return (
    <SuraSocketContext.Provider
      value={{
        socketRoute: props.socketRoute,
        token: props.token,
      }}
    >
      {props.children}
    </SuraSocketContext.Provider>
  );
};

export const useSuraSocketProvider = () => {
  return useContext(SuraSocketContext);
};
