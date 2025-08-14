import type { Entity, ListResponse} from './common';
import type { Film } from './film';
import type { User } from './user';
export interface Review extends Entity {
  
  review_titel: string;
  review_content: string;
  film:  Pick<Film, 'id'>;
  user: Pick<User, 'id'>;
  rating: number;
}

export interface ReviewCreateInput {
  review_titel: string;
  review_content: string;
  film_id: number;
  user_id: number;
  rating: number;
}

export interface ReviewUpdateInput extends ReviewCreateInput {}

export interface CreateReviewRequest extends  Omit<ReviewCreateInput, 'userId'> {}
export interface UpdateReviewRequest extends Omit<ReviewCreateInput, 'userId'> {}
export interface GetAllReviewsResponse extends ListResponse<Review> {}
export interface GetReviewByIdResponse extends Review {}
export interface CreateReviewResponse extends GetReviewByIdResponse {}
export interface UpdateReviewResponse extends GetReviewByIdResponse {}