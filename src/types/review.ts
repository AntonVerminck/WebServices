import type { Entity} from './common';

export interface Review extends Entity {
  
  review_titel: string;
  review_content: string;
  film_id: number;
  user_id: number;
  rating: number;
}
