// *
// * Hook to use with this Factory (Sura.js)
// *
import type { HttpPath } from "./types";
import { useSuraFetcherProvider } from "./sura-fetcher-provider";
import { HttpServiceWrapperFactory } from "./sura-fetcher.service";
import { GetAllQueryParamInterface } from "./types";

export type queryParamFunc = (value: GetAllQueryParamInterface) => string;

const getReplaceByContextValue = (
  contextValue: string | number | undefined,
  defaultValue: string | number | undefined
) => {
  if (contextValue) {
    return contextValue;
  }
  return defaultValue;
};

export const useSuraFetcherFactory = <T,>(path: HttpPath) => {
  const context = useSuraFetcherProvider();
  const config = context?.["paramConfig"];
  const getFullUrlWithQueryParams: queryParamFunc = ({
    page,
    url,
    limit,
    search,
    param,
  }: GetAllQueryParamInterface): string => {
    const getParam = param === undefined ? "" : `${param}`;
    const getPage =
      page === undefined
        ? `${getReplaceByContextValue(
            config?.pageParamName,
            "page"
          )}=${getReplaceByContextValue(config?.pageDefaultValue, 1)}`
        : `&page=${page}`;
    const getLimit =
      limit === undefined
        ? `${getReplaceByContextValue(
            config?.limitParamName,
            "limit"
          )}=${getReplaceByContextValue(config?.limitDefaultValue, 10)}`
        : `limit=${limit}`;
    const getSearch =
      search === undefined
        ? ""
        : `${getReplaceByContextValue(
            config?.searchParamName,
            "filter"
          )}=${search}`;
    const fullUrl = `${url}?${getLimit}&${getPage}&${getSearch}&${getParam}`;
    return fullUrl;
  };

  return new HttpServiceWrapperFactory<T>(
    path,
    context?.axiosInstance!,
    context?.useQueryInstance!,
    getFullUrlWithQueryParams
  );
};
