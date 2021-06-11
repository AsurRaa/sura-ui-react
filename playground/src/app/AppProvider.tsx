import { Fragment } from "react";
import App from "./App";
import { AsurRaaUploadProvider } from "@asurraa/sura-ui-upload";
const AppProvider = () => {
  return (
    <Fragment>
      {/* <AsurRaaUploadProvider> */}
      <App />
      {/* </AsurRaaUploadProvider> */}
    </Fragment>
  );
};

export default AppProvider;
