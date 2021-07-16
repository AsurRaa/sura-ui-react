# Sura Socket

> Handling sockets in React Application

## Installation

Wrap Provider first

```tsx
import React from "react";
import type { SuraSocketConfig } from "@asurraa-sura-ui-socket";
const AppProvider = () => {
  const socketConfig: SuraSocketConfig = {
    token:
      "xxx",
    socketRoute: "xxx",
  };
  return (
    <div>
      <SuraSocketProvider
        token={socketConfig.token}
        socketRoute={socketConfig.socketRoute}
      >
        <App />
      </SuraSocketProvider>
    </div>
  );
};
```

## Usages

```tsx
import React from "react";
import { useSuraSocket } from "@asurraa-sura-ui-socket";

const Page = () => {
  const suraSocket = useSuraSocket({ logger: true });

  suraSocket.addListener({
    key: Path.DASHBOARD,
    fn: (data: any) => {
      message.success(`Override fn in dashboard: ${JSON.stringify(data)}`, 2);
    },
  });

  return <div></div>;
};
```
