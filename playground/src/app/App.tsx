import "../styles/App.less";
import {
  AsurRaaModal,
  AsurRaaDraggableModalProvider,
  AsurRaaModalProps,
} from "@asurraa/sura-ui-modal";
import { Button } from "antd";
import { FC, useState } from "react";

const AnotherCustomModal: FC<AsurRaaModalProps> = (props) => {
  return <AsurRaaModal {...props} />;
};

function App() {
  const [state, setState] = useState<boolean>(false);

  return (
    <div className="App">
      <header className="App-header">Playground</header>
      <Button onClick={() => setState(true)}>open</Button>

      <div>
        <AsurRaaDraggableModalProvider>
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
