import { useQuery } from "react-query";
export interface Pagination {
  page?: number;
  total_page?: number;
  total_items?: number;
}

export interface GetAllQueryParamInterface {
  page?: number | undefined;
  limit?: number | undefined;
  search?: string | undefined;
  param?: string | undefined;
  url?: string | undefined;
}

export interface CreateInterface<T = any> {
  data: T;
  currentPage?: number;
}
export interface UpdateInterface<T = any> {
  data: T;
  id: string;
  currentPage?: number;
}

export interface GetOneInterface {
  id: string;
  currentPage?: number;
}
export interface DeleteInterface {
  id: string;
  currentPage: number;
}

export interface GetAllResponseInterface<T> {
  data: Array<T>;
  meta: Pagination;
}

export interface GetOneResponseInterface<T> {
  data: T;
}

export type TheUseQueryInstance = typeof useQuery;

export type HttpPath = {
  CREATE?: string;
  GET_ALL: string;
  UPDATE?: string;
  DELETE?: string;
  GET_ONE?: string;
};

export interface HttpResponse<T> {
  data?: T;
  error?: any;
  getAllUrl?: string;
}
