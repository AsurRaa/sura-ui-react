import { createContext, FC, Fragment, ReactNode, useContext } from "react";
export interface AsurRaaTableContextInterface {
  children: ReactNode;
  caslAppAbility?: any;
  formateDate: string;
  overallTitleConfig?: {
    createButton: string;
    refreshButton: string;
    editButton: string;
    deleteButton: string;
  };
}

export type OverallTitleConfig = AsurRaaTableContextInterface["overallTitleConfig"];

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
          overallTitleConfig: props.overallTitleConfig,
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
