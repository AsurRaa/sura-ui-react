/* eslint-disable react-hooks/rules-of-hooks */
import { AxiosInstance } from "axios";
import type { HttpPath, HttpResponse } from "./types";
import { queryParamFunc } from "./hooks";
import type {
  CreateInterface,
  DeleteInterface,
  GetAllQueryParamInterface,
  GetAllResponseInterface,
  GetOneInterface,
  GetOneResponseInterface,
  UpdateInterface,
  TheUseQueryInstance,
} from "./types";

export class HttpServiceWrapperFactory<T> {
  private path: HttpPath;
  private getAllUrl: string;
  private theAxiosInstance: AxiosInstance;
  private useQueryInstance: TheUseQueryInstance;
  private queryParm: queryParamFunc;

  constructor(
    path: HttpPath,
    axios: AxiosInstance,
    useQueryInstance: TheUseQueryInstance,
    queryParm: queryParamFunc
  ) {
    this.path = path;
    this.getAllUrl = queryParm({ url: path.GET_ALL });
    this.theAxiosInstance = axios;
    this.useQueryInstance = useQueryInstance;
    this.queryParm = queryParm;
  }

  getAll = ({ page, limit, search, param }: GetAllQueryParamInterface) => {
    this.getAllUrl = this.queryParm({
      url: this.path.GET_ALL,
      page,
      limit,
      search,
      param,
    });
    const {
      data: response,
      error,
      isLoading,
      refetch,
      ...rest
    } = this.useQueryInstance<GetAllResponseInterface<T>, any>(this.getAllUrl);
    const meta = response?.meta;
    const data: Array<T> | [] = response?.data ?? [];

    return {
      meta,
      data,
      error,
      isLoading,
      refresh: refetch,
      url: this.getAllUrl,
      ...rest,
    };
  };

  getOne = ({ id }: GetOneInterface) => {
    const {
      data: response,
      error,
      isLoading,
      refetch,
      ...rest
    } = this.useQueryInstance<GetOneResponseInterface<T>, any>(
      `${this.path.GET_ONE}/${id}`
    );
    const data: T | undefined = response?.data;

    return {
      data,
      error,
      isLoading,
      refresh: refetch,
      url: this.getAllUrl,
      ...rest,
    };
  };

  updateOne = async <T>({
    data,
    currentPage,
    id,
  }: UpdateInterface<T>): Promise<HttpResponse<T>> => {
    try {
      const res = await this.theAxiosInstance.patch(
        `${this.path.UPDATE}/${id}`,
        data
      );
      const getAllUrl = this.queryParm({
        url: this.path.GET_ALL,
        page: currentPage,
      });
      return { data: res.data, getAllUrl };
    } catch (ex) {
      return { error: ex };
    }
  };

  createOne = async <T>({
    data,
    currentPage,
  }: CreateInterface<T>): Promise<HttpResponse<T>> => {
    try {
      if (!this.path.CREATE) {
        throw "Path not provided";
      }
      const res = await this.theAxiosInstance.post(this.path.CREATE, data);
      const getAllUrl = this.queryParm({
        url: this.path.GET_ALL,
        page: currentPage,
      });
      return { data: res.data, getAllUrl };
    } catch (ex) {
      return { error: ex };
    }
  };

  deleteOne = async ({
    id,
    currentPage,
  }: DeleteInterface): Promise<HttpResponse<T>> => {
    try {
      const res = await this.theAxiosInstance.delete(
        `${this.path.DELETE}/${id}`
      );
      const getAllUrl = this.queryParm({
        url: this.path.GET_ALL,
        page: currentPage,
      });
      return { data: res.data, getAllUrl };
    } catch (ex) {
      return { error: ex };
    }
  };

  getAllPromise = async () => {
    try {
      const res = await this.theAxiosInstance.get(`${this.path.GET_ALL}`);
      return { data: res.data };
    } catch (ex) {
      return { error: ex };
    }
  };
}
