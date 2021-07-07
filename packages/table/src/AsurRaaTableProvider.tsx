import React from "react";
import { createContext, FC, Fragment, ReactNode, useContext } from "react";

export interface AsurRaaTableContextInterface {
  children: ReactNode;
  caslAppAbility?: any;
  formateDate: string;
}

const AsurRaaTableContext = createContext<
  AsurRaaTableContextInterface | undefined
>(undefined);

const AsurRaaTableProvider: FC<AsurRaaTableContextInterface> = (props) => {
  return (
    <Fragment>
      <AsurRaaTableContext.Provider
        value={{
          caslAppAbility: props.caslAppAbility,
          children: props.children,
          formateDate: props.formateDate,
        }}
      >
        {props.children}
      </AsurRaaTableContext.Provider>
    </Fragment>
  );
};

// * hook
const useGetConfigAsurRaaTableApi = () => {
  return useContext(AsurRaaTableContext);
};

export { AsurRaaTableProvider, useGetConfigAsurRaaTableApi };
