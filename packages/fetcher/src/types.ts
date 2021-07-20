import { useQuery } from "react-query";

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

export interface GetAllResponseInterface<T, P> {
  data: Array<T>;
  meta: P;
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

export interface GetOneInputInterface {
  id: string | number;
}
