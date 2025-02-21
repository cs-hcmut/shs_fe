import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ProductQueryConfig } from "../types/product.type";
import productApi from "../apis/product.api";

const useListProducts = (qf: ProductQueryConfig) => {
  return useQuery({
    queryKey: ["product", qf],
    queryFn: () => productApi.searchProducts(qf),
    enabled: !!qf,
  });
};

const useGetProductById = (id: string) => {
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => productApi.getProductById(id),
  });
};

const useListProductCategories = () => {
  return useQuery({
    queryKey: ["product-category"],
    queryFn: () => productApi.listProductCategories(),
  });
};

// ! Mutations

const useCreateMultipleProducts = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: productApi.createMultipleProducts,
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["product"],
      });
    },
  });
};

const ProductQuery = {
  useListProducts,
  useGetProductById,
  useListProductCategories,
  mutation: {
    useCreateMultipleProducts,
  },
};

export default ProductQuery;
