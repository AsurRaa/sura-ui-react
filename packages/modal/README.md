 [![Storybook](https://cdn.jsdelivr.net/gh/storybookjs/brand@master/badge/badge-storybook.svg)](https://asurraa.github.io/sura-ui/)
 
# @asurraa/sura-ui-modal 
> Drag and drop modal.

```sh
yarn add @asurraa/sura-ui-modal
```

## How to use? 
```ts
import {
  AsurRaaModal,
  AsurRaaDraggableModalProvider,
} from "@asurraa/sura-ui-modal";
import { Button } from "antd";
import { useState } from "react";
function App() {
  const [state, setState] = useState<boolean>(false);
  return (
    <div className="App">
      <header className="App-header">Playground</header>
      <Button onClick={() => setState(true)}>open</Button>
      <div>
        <AsurRaaDraggableModalProvider>
          <AsurRaaModal
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


```
