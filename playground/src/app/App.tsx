import "../styles/App.less";
import { AsurRaaModal } from "@asurraa/sura-ui-modal";
import { Button } from "antd";
import { useState } from "react";
function App() {
  const [state, setState] = useState<boolean>(false);
  return (
    <div className="App">
      <header className="App-header">Playground</header>
      <Button onClick={() => setState(true)}>open</Button>
      <div>
        <AsurRaaModal onCancel={() => setState(false)} visible={state} />
      </div>
    </div>
  );
}

export default App;
