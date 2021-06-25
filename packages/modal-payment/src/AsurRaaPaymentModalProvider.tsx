import React from "react";
import { createContext, FC, useContext } from "react";

export interface AsurRaaPaymentModalContextInterface {
  khrExchangeRate: number;
}

const AsurRaaPaymentModalContext = createContext<
  AsurRaaPaymentModalContextInterface | undefined
>(undefined);

const AsurRaaPaymentModalProvider: FC<
  AsurRaaPaymentModalContextInterface | undefined
> = (props) => {
  return (
    <AsurRaaPaymentModalContext.Provider
      value={{
        khrExchangeRate: props.khrExchangeRate,
      }}
    >
      {props.children}
    </AsurRaaPaymentModalContext.Provider>
  );
};

// * hook
const useGetAsurRaaPaymentModal = () => {
  return useContext(AsurRaaPaymentModalContext);
};

export {
  AsurRaaPaymentModalContext,
  AsurRaaPaymentModalProvider,
  useGetAsurRaaPaymentModal,
};
