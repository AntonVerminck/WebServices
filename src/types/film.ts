import type { Entity, ListResponse} from './common';

export interface Film extends Entity {
  titel: string;
  regiseur: string;

}

export interface FilmCreateInput {
  titel: string;
  regiseur: string;
}

export interface FilmUpdateInput extends FilmCreateInput {}

export interface CreateFilmRequest extends FilmCreateInput {}
export interface UpdateFilmRequest extends FilmUpdateInput {}
export interface GetAllFilmsResponse extends ListResponse<Film> {}
export interface GetFilmByIdResponse extends Film {}
export interface CreateFilmResponse extends GetFilmByIdResponse {}
export interface UpdateFilmResponse extends GetFilmByIdResponse {}