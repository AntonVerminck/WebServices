import type { Entity, ListResponse} from './common';


export interface Review extends Entity {
  
  review_titel: string;
  review_content: string;
  film_id: number;
  user_id: number;
  rating: number;
}

export interface ReviewCreateInput {
  film_id: number ;
  user_id: number;  
  rating: number;
  review_titel: string;
  review_content: string;
}

export interface ReviewUpdateInput extends ReviewCreateInput {}

export interface CreateReviewRequest extends ReviewCreateInput {}
export interface UpdateReviewRequest extends ReviewUpdateInput {}
export interface GetAllReviewsResponse extends ListResponse<Review> {}
export interface GetReviewByIdResponse extends Review {}
export interface CreateReviewResponse extends GetReviewByIdResponse {}
export interface UpdateReviewResponse extends GetReviewByIdResponse {}