import http from "../utils/http.util";
import {
  ProductCreateDto,
  ProductQueryConfig,
  ProductModel,
  ProductCategoryModel,
} from "../types/product.type";
import { PagingResponse } from "../types/common.type";

const URL = "/v1/product";
const ProductCategoryURL = "/v1/product-category";

const productApi = {
  searchProducts(params: ProductQueryConfig) {
    return http.get<PagingResponse<ProductModel[]>>(`${URL}`, { params });
  },

  getProductById(id: string) {
    return http.get<ProductModel>(`${URL}/${id}`);
  },

  listProductCategories() {
    return http.get<PagingResponse<ProductCategoryModel[]>>(ProductCategoryURL);
  },

  createMultipleProducts(body: ProductCreateDto[]) {
    return http.post<ProductModel[]>(URL, body);
  },
};

export default productApi;
