import axios, { AxiosError, AxiosResponse } from "axios";

import HttpStatusCode from "../constants/httpStatusCode.enum";
import { defaultPaging } from "../types/paging.type";
import moment from "moment";
import { PagingResponse } from "../types/_commons/common.type";

export const extractKeyFromUrl = (url: string): string => {
  const regex = /\/([^/?]+)\?/;
  const match = url.match(regex);
  return match ? match[1] : "";
};

export function isAxiosError<T>(error: unknown): error is AxiosError<T> {
  return axios.isAxiosError(error);
}

export function isAxiosBadRequestError<FormError>(
  error: unknown
): error is AxiosError<FormError> {
  return (
    isAxiosError(error) && error.response?.status === HttpStatusCode.BadRequest
  );
}

export const createPaging = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  responseData: AxiosResponse<PagingResponse<any[]>, any> | undefined
) => {
  if (responseData) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { data, ...paging } = responseData.data;
    return paging;
  }
  return defaultPaging;
};

export const removeSpecialCharacter = (str: string) =>
  str.replace(
    // eslint-disable-next-line no-useless-escape
    /!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g,
    ""
  );

export const generateNameId = ({ name, id }: { name: string; id: string }) => {
  return removeSpecialCharacter(name).replace(/\s/g, "-") + `-i:${id}`;
};

export const getIdFromNameId = (nameId: string) => {
  const arr = nameId.split("-i:");
  return arr[arr.length - 1];
};

export const getNameFromNameId = (nameId: string) => {
  const arr = nameId.split("-i:");
  return arr[0];
};

export function formatCurrency(currency: number) {
  return new Intl.NumberFormat("de-DE").format(currency);
}

export const formatDate = (timeStamp: string) => {
  return moment(timeStamp).format("YYYY-MM-DD");
};
