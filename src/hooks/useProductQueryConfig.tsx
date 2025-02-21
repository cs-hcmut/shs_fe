import omitBy from "lodash/omitBy";
import isUndefined from "lodash/isUndefined";
import { ProductQueryConfig } from "../types/product.type";
import useQueryParams from "./useQueryParams";

export type ProductQueryParams = {
  [key in keyof ProductQueryConfig]: string;
};

export const PRODUCT_LIMIT_PER_PAGE = 12;

export default function useProductQueryConfig() {
  const queryParams: ProductQueryParams = useQueryParams();
  const queryConfig: ProductQueryParams = omitBy(
    {
      page: queryParams.page || 1,
      limit: queryParams.limit || PRODUCT_LIMIT_PER_PAGE,
      name: queryParams.name,
      price: queryParams.price,
      description: queryParams.description,
      keyword: queryParams.keyword,
      category: queryParams.category,
      reorder_point: queryParams.reorder_point,
      sort: queryParams.sort,
      minQuantity: queryParams.minQuantity,
    },
    isUndefined
  );
  return queryConfig;
}
