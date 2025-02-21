import { PagingResponse } from "../types/common.type";
import {
  ReviewCreate,
  ReviewModel,
  ReviewQueryConfig,
} from "../types/review.type";
import http from "../utils/http.util";

const URL = "/v1/review";

const reviewApi = {
  searchReviews(params: ReviewQueryConfig) {
    return http.get<PagingResponse<ReviewModel[]>>(`${URL}`, { params });
  },

  getReviewById(id: string) {
    return http.get<ReviewModel>(`${URL}/${id}`);
  },

  createReview(body: ReviewCreate) {
    return http.post<ReviewModel>(URL, body);
  },
};

export default reviewApi;
