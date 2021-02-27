import { message } from "antd";
import useSWR, { mutate, trigger } from "swr";
import { AxiosHttp } from "../configs/axios_config";
import { getReturnUrlWithPage } from "./helper/urlHelper";
import {
  createServiceInterface,
  deleteServiceInterface,
  MetaPagination,
  refreshServiceInterface,
  singleServiceInterface,
  updateServiceInterface,
} from "./interface";
import voca from "voca";

type uriPathType = {
  CREATE_PATH: string;
  READ_PATH: string;
  UPDATE_PATH: string;
  DELETE_PATH: string;
  SINGLE_PATH?: string;
};

interface asurRaaFetchDataWrapperInterface {
  uriPath: uriPathType;
}

const renameKeysFunction = (obj: any, newKeys: any) => {
  const keyValues = Object.keys(obj).map((key) => {
    const newKey = newKeys[key] || key;
    return { [newKey]: obj[key] };
  });
  return Object.assign({}, ...keyValues);
};

const renameKeysFunctionWithCamelCase = (obj: any, newKeys: any) => {
  const keyValues = Object.keys(obj).map((key) => {
    const newKey = newKeys[key] || key;
    const newWord = voca.capitalize(obj[key]).replaceAll("_", ` `);
    return { [newKey]: newWord };
  });
  return Object.assign({}, ...keyValues);
};

export const asurRaaFetchDataWrapper = <T>({
  uriPath: { CREATE_PATH, DELETE_PATH, READ_PATH, UPDATE_PATH, SINGLE_PATH },
}: asurRaaFetchDataWrapperInterface) => {
  const useGetAllService = (page?: number) => {
    const { data, error } = useSWR(
      getReturnUrlWithPage({ url: READ_PATH, page })
    );

    const wrapData: Array<T> = data?.data?.items;
    const meta: MetaPagination = data?.data?.meta;

    type iteratingKeyInterfaceToString<T> = {
      [P in keyof T]: string;
    };
    interface getKeyInterface {
      key: any;
      title: any;
      index: any;
    }

    const mappingKey = Object?.keys?.(wrapData?.[0] || {});
    const getKeyIndex: iteratingKeyInterfaceToString<T> = renameKeysFunction?.(
      mappingKey,
      mappingKey
    );
    const getKeyIndexTitle: iteratingKeyInterfaceToString<T> = renameKeysFunctionWithCamelCase?.(
      mappingKey,
      mappingKey
    );

    const spreadArrayKeysObj: Array<getKeyInterface> = mappingKey.map(
      (keykey) => {
        return {
          title: voca.capitalize(keykey).replaceAll("_", ` `),
          index: keykey,
          key: keykey,
        };
      }
    );

    const excludeObjFromSpreadArrayKeyObj = (
      arrayObj: Array<string>
    ): Array<getKeyInterface> => {
      const filterDataWithMap = spreadArrayKeysObj.filter(
        (key) => !arrayObj.includes(key.index)
      );

      const formatArrayObj = filterDataWithMap.map((keykey) => {
        return {
          title: voca.capitalize(keykey.title).replaceAll("_", ` `),
          index: keykey.index,
          key: keykey.key,
        };
      });

      return formatArrayObj;
    };

    return {
      swrData: data,
      data: wrapData,
      isLoading: !error && !data,
      isError: error,
      meta: meta,
      dataKeyIndex: getKeyIndex,
      dataKeyIndexTitle: getKeyIndexTitle,
      dataKey: spreadArrayKeysObj,
      excludeDataKey: (filterArrayData: Array<string>) =>
        excludeObjFromSpreadArrayKeyObj(filterArrayData),
    };
  };

  const createService = async ({ data, page }: createServiceInterface) => {
    mutate(getReturnUrlWithPage({ url: CREATE_PATH, page }), data, false);
    return await AxiosHttp.post(CREATE_PATH, data).finally(() =>
      trigger(getReturnUrlWithPage({ url: READ_PATH, page }))
    );
  };

  const deleteService = async ({ id, page }: deleteServiceInterface) => {
    mutate(
      getReturnUrlWithPage({
        url: READ_PATH,
        page,
      })
    );
    await AxiosHttp.delete(`${DELETE_PATH}/${id}`);
    trigger(getReturnUrlWithPage({ url: READ_PATH, page }));
  };

  const updateService = async ({ data, page, id }: updateServiceInterface) => {
    mutate(getReturnUrlWithPage({ url: UPDATE_PATH, page }), data, false);
    await AxiosHttp.put(`${UPDATE_PATH}/${id}`, data);
    trigger(getReturnUrlWithPage({ url: READ_PATH, page }));
  };

  const refreshServices = ({ page }: refreshServiceInterface): void => {
    message.loading("Refreshing", 1);
    trigger(getReturnUrlWithPage({ url: READ_PATH, page }));
  };

  const singleServices = async ({ id }: singleServiceInterface): Promise<T> => {
    if (SINGLE_PATH === undefined) {
      throw new Error(
        "Single URI path must fill up before preceed this function"
      );
    }
    return await AxiosHttp.get(`${SINGLE_PATH}/${id}`);
  };

  return {
    createService,
    useGetAllService,
    deleteService,
    updateService,
    refreshServices,
    singleServices,
  };
};
