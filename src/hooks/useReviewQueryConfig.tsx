import { isUndefined, omitBy } from "lodash";
import { ReviewQueryConfig } from "../types/review.type";
import useQueryParams from "./useQueryParams";

const ITEM_LIMIT = 100; // Default limit for pagination

export default function useReviewQueryConfig(productid: string) {
  const queryParams = useQueryParams();

  const queryConfig: ReviewQueryConfig = omitBy(
    {
      page: queryParams.page || 1,
      limit: queryParams.limit || ITEM_LIMIT,
      product_id: productid || queryParams.product_id || "",
    },
    isUndefined
  );

  return queryConfig;
}
