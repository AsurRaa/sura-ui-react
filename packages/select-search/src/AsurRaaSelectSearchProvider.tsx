import { createContext, FC } from "react";
import React from "react";
interface contextInterface {
  axiosConfig: any;
}
interface AsurRaaSelectSearchProviderInterface {}

export const AsurRaaSelectSearchContext = createContext<contextInterface>({
  axiosConfig: "hi",
});

export const AsurRaaSelectSearchProvider: FC<AsurRaaSelectSearchProviderInterface> = (
  props
) => {
  return (
    <AsurRaaSelectSearchContext.Provider value={{ axiosConfig: "323" }}>
      {props.children}
    </AsurRaaSelectSearchContext.Provider>
  );
};
