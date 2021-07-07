## How to use with AsurRaa FetchDataGen 

```ts
import React, { useState } from "react"
import AsurRaaTable, { AsurRaaColumnsInterface } from "../../components/asurraa-table/AsurRaaTable"
import { roomTypeServices } from "../../services/room-type.service"


const RoomTypePage = () => {
  const [page, setPage] = useState<number>(1)
  const { data, excludeDataKey, dataKeyIndex } = roomTypeServices.useGetAllService(page)
  const tableColumn: Array<AsurRaaColumnsInterface> = excludeDataKey([
    dataKeyIndex.created_at, dataKeyIndex.updated_at, dataKeyIndex.id, dataKeyIndex.staff_id
  ]).map((column) => {
    return {
      title: column.title,
      width: 30,
      dataIndex: column.index,
      key: column.key,
    }
  })

  return <div>
    <AsurRaaTable asurRaaColumnProps={tableColumn} data={data} />
  </div>
}

export default RoomTypePage
```