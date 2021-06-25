import { AsurRaaRichTextEditor } from "@asurraa/sura-ui-rich-text-editor";
import {
  AsurRaaPaymentModal,
  AsurRaaPaymentModalProvider,
} from "@asurraa/sura-ui-modal-payment";
import "../styles/App.less";
import { AsurRaaDraggableModalProvider } from "@asurraa/sura-ui-modal";
import { useState } from "react";
import Button from "antd/lib/button";

function App() {
  const [openModal, setOpenModal] = useState<boolean>(false);
  return (
    <div className="App">
      <AsurRaaRichTextEditor />
      <div>
        <AsurRaaDraggableModalProvider>
          <AsurRaaPaymentModalProvider khrExchangeRate={1000}>
            <AsurRaaPaymentModal
              visible={openModal}
              cashToPayDataProps={1000}
              isPayLoading={false}
            />
          </AsurRaaPaymentModalProvider>
        </AsurRaaDraggableModalProvider>

        <Button onClick={() => setOpenModal(!openModal)}>Open Modal</Button>
      </div>
    </div>
  );
}

export default App;
