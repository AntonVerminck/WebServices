import type { Entity, ListResponse} from './common';

export interface Screening extends Entity {
  film_id: number
  postcode: number;
  straat: string ;
  huisnummer: number;
  naam: string;
  datum: Date
}

export interface ScreeningCreateInput {
  film_id: number
  postcode: number;
  straat: string ;
  huisnummer: number;
  naam: string;
  datum: Date
}

export interface ScreeningUpdateInput extends ScreeningCreateInput {}

export interface CreateScreeningRequest extends ScreeningCreateInput {}
export interface UpdateScreeningRequest extends ScreeningUpdateInput {}
export interface GetAllScreeningsResponse extends ListResponse<Screening> {}
export interface GetScreeningByIdResponse extends Screening {}
export interface CreateScreeningResponse extends GetScreeningByIdResponse {}
export interface UpdateScreeningResponse extends GetScreeningByIdResponse {}