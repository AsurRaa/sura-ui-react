import { createContext, FC, useContext } from "react";

export interface AsurRaaDropdownContextInterface {
  dateFormate: string;
}

const AsurRaaDropdownContext = createContext<
  AsurRaaDropdownContextInterface | undefined
>(undefined);

const AsurRaaDropdownProvider: FC<
  AsurRaaDropdownContextInterface | undefined
> = (props) => {
  return (
    <AsurRaaDropdownContext.Provider
      value={{
        dateFormate: props.dateFormate,
      }}
    >
      {props.children}
    </AsurRaaDropdownContext.Provider>
  );
};

// * hook
const useGetAsurRaaDropdown = () => {
  return useContext(AsurRaaDropdownContext);
};

export {
  AsurRaaDropdownContext,
  AsurRaaDropdownProvider,
  useGetAsurRaaDropdown,
};
