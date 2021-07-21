
 
# @asurraa/sura-ui-fetcher 
> Fetcher crud oparation build on top of react query

```sh
yarn add @asurraa/sura-ui-fetcher
```

## How to use? 

1. defind global declaration for meta (pagination)

```ts
export interface ISuraPagination {
  currentPage: number;
  itemCount: number;
  itemsPerPage: number;
  totalItems: number;
  totalPages: number;
}
```

```ts  
// meta.d.ts
import type { MetaSuraPagination as OriginalMetaPagination } from "@asurraa/sura-ui-fetcher/dist/sura-fetcher.service";
import { ISuraPagination } from "../types/common";

export declare module "@asurraa/sura-ui-fetcher/dist/sura-fetcher.service" {
  export declare interface MetaSuraPagination extends ISuraPagination {}
}
```

2. wrap provider
 - Make sure your have your axios instance ready. (token ready & other configuration for axios)
 - React Query provider on top of this. 
 - 
```tsx
const AppProviderWrapper = () => {
  const InspectorWrapper = isProduction ? Fragment : Inspector;
  const userGlobal = useUser();

  return (
    <Fragment>
      <UserProvider>
        <QueryClientProvider client={queryClient}>
          <SuraFetcherProvider
            axiosInstance={AxiosHttp}
            useQueryInstance={useQuery}
          >
            <App />
          </SuraFetcherProvider>
        </QueryClientProvider>
      </UserProvider>
    </Fragment>
  );
};

export default AppProviderWrapper;

```
