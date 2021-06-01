# AsurRaa Invoice Print

## Usage

```tsx
import React from 'react'
import 'invoice-print/dist/index.css'
import { useDoc } from 'invoice-print'
import { mockDataV2 } from './MockData'

const App = () => {
  const invoicePrint = useAsurRaaInvoicePrint(mockDataV2);
  return (
    <div>
      <button children={'Click Me'} onClick={() => invoicePrint.print()} />
    </div>
  )
}

export default App
```