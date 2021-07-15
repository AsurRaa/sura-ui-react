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
      "admin-starter_t61j417lr97lq73ohhlih2shicgn49hj2dgnalppk11egqn6mcoc499lqaooqop8hqfq5tkpjhpq34ngk4bhgdnbk40b3b836er6",
    socketRoute: "https://socket.asurraa.com",
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
