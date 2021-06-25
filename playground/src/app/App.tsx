// @ts-nocheck
import "../styles/App.less";
import {
  AsurRaaModal,
  AsurRaaDraggableModalProvider,
  AsurRaaModalProps,
} from "@asurraa/sura-ui-modal";
import { Button } from "antd";
import { FC, useState } from "react";
import { AsurRaaPaymentModal } from "@asurraa/sura-ui-modal-payment";

const AnotherCustomModal: FC<AsurRaaModalProps> = (props) => {
  return <AsurRaaModal {...props} />;
};

function App() {
  const [state, setState] = useState<boolean>(false);
  const [openPaymentModal, setOpenPaymentModal] = useState<boolean>(false);
  return (
    <div className="App">
      <header className="App-header">Playground</header>
      <Button onClick={() => setState(true)}>open</Button>

      <div>
        <AsurRaaDraggableModalProvider>
          <AsurRaaPaymentModal visible={true} />
          <AnotherCustomModal
            title={"Test Modal"}
            onCancel={() => setState(false)}
            visible={state}
          />
        </AsurRaaDraggableModalProvider>
      </div>
    </div>
  );
}

export default App;
