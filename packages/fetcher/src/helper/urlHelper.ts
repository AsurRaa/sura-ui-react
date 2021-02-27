export interface getReturnUrlWithPageInterface {
  url: string;
  page?: number;
}

export const getReturnUrlWithPage = ({
  page,
  url,
}: getReturnUrlWithPageInterface): string => {
  return `${url}?limit=10&page=${page}`;
};
