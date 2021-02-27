import { AxiosResponse } from "axios";

export type UserContextType = {
  token?: string;
  saveUser: (token: string) => void;
  logoutUser: () => void;
};

export type UserCredential = {
  account: string;
  password: string;
};

export type StaffCredentialInterface = {
  username: string;
  firstname: string;
  lastname: string;
  password: string;
};

// SERVICES INTERFACE

export interface getServiceInterface {
  page?: number;
}

export interface deleteServiceInterface {
  id: number;
  page?: number;
  swrData: any;
}

export interface createServiceInterface {
  data: any;
  page: number;
}
export interface updateServiceInterface extends createServiceInterface {
  id: number | undefined;
}

export interface refreshServiceInterface {
  page?: number;
}

export interface singleServiceInterface {
  id: number | undefined;
}

// PAGINATION
export interface MetaPagination {
  totalItems: number;
  currentPage: number;
  itemCount: number;
  itemsPerPage: number;
  totalPages: number;
}

// URL + NETWORK + RESPONSE
export interface ErrResponseInterface {
  statusCode: number;
  message: string;
  error: string;
}

export type dataResponse = {
  message: string;
  id: string;
};
export interface ResponseInterface {
  data?: dataResponse;
  statusCode: number;
}
export type ResResponseInterface = AxiosResponse<ResponseInterface>;
