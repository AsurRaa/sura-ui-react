import React, { Fragment, useState } from 'react'
import { AsurRaaDraggableModalProvider, AsurRaaModal } from "@asurraa/sura-ui-modal"
import { ExampleComponent } from 'input-search'
import 'input-search/dist/index.css'

const App = () => {

  const [openModal, setOpenModal] = useState<boolean>(false)
  // @ts-ignore
  return <Fragment>
    <AsurRaaDraggableModalProvider>
      <AsurRaaModal visible={openModal} onCancel={() => setOpenModal(false)} />
      <div> <ExampleComponent text="Create React Library Example 😄" /></div>
      <button onClick={() => setOpenModal(true)}>open</button>
    </AsurRaaDraggableModalProvider>
  </Fragment>
}

export default App
