import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { ReviewQueryConfig } from "../types/review.type";
import reviewApi from "../apis/review.api";

const useListReviews = (qf: ReviewQueryConfig) => {
  return useQuery({
    queryKey: ["review", qf],
    queryFn: () => reviewApi.searchReviews(qf),
    enabled: !!qf,
  });
};

const useGetReviewById = (id: string) => {
  return useQuery({
    queryKey: ["review", id],
    queryFn: () => reviewApi.getReviewById(id),
  });
};

// ! Mutations

const useCreateReview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: reviewApi.createReview,
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["review"],
      });
    },
  });
};

const ReviewQuery = {
  useListReviews,
  useGetReviewById,
  mutation: {
    useCreateReview,
  },
};

export default ReviewQuery;
