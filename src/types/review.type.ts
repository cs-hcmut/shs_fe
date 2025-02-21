import { SQLModel } from "./common.type";
import { PagingQueryConfig } from "./paging.type";

export interface UserReview {
  name: string;
  id: string;
}
export interface ProductReview {
  name: string;
  id: string;
}

export interface ReviewModel extends SQLModel {
  user: UserReview;
  product: ProductReview;
  replies: ReviewModel[];
  rating: number;
  comment: string;
}

export interface ReviewCreate {
  user_id: string | undefined;
  product_id: string;
  comment: string;
  rating: number;
  parent_id: string | null;
}

export interface ReviewQueryConfig extends PagingQueryConfig {
  product_id?: string;
}
