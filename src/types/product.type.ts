import { SQLModel } from "./common.type";
import { PagingQueryConfig } from "./paging.type";

export interface ProductCategoryModel extends SQLModel {
  name: string;
  description: string;
}

export interface ProductModel extends SQLModel {
  name: string;
  description: string;
  price: number;
  image_url: string | null;
  inventory_quantity: number;
  reorder_point: string;
  category: ProductCategoryModel;
}

export interface ProductCreateDto
  extends Pick<
    ProductModel,
    "name" | "description" | "price" | "inventory_quantity" | "reorder_point"
  > {
  category_id: string;
}

export interface ProductQueryConfig extends PagingQueryConfig {
  id?: string;
  name?: string;
  price?: string;
  reorder_point?: string;
  description?: string;
  category?: string;
  keyword?: string;
  sort?: string;
  minQuantity?: string;
}
