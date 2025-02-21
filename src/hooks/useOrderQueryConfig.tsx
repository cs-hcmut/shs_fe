import omitBy from "lodash/omitBy";
import isUndefined from "lodash/isUndefined";
import useQueryParams from "./useQueryParams";
import { OrderQueryConfig } from "../types/order.type";

export type OrderQueryParams = {
  [key in keyof OrderQueryConfig]: string;
};

export const ORDER_LIMIT_PER_PAGE = 100;

export default function useOrderQueryConfig() {
  const queryParams: OrderQueryParams = useQueryParams();
  const queryConfig: OrderQueryParams = omitBy(
    {
      page: queryParams.page || 1,
      limit: queryParams.limit || ORDER_LIMIT_PER_PAGE,
      status: queryParams.status,
      start_date: queryParams.start_date,
      end_date: queryParams.end_date,
    },
    isUndefined
  );
  return queryConfig;
}
