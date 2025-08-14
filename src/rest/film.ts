import Router from '@koa/router';
import * as filmService from '../service/filmService';
import type { FilmAppContext, FilmAppState} from '../types/koa';
import type { KoaContext, KoaRouter } from '../types/koa';
import Role from '../core/roles';
import type {
  CreateFilmRequest,
  CreateFilmResponse,
  GetAllFilmsResponse,
  GetFilmByIdResponse,
  UpdateFilmRequest,
  UpdateFilmResponse,
} from '../types/film';
import type { IdParams } from '../types/common';
import Joi from 'joi';
import validate from '../core/validation'; 
import { requireAuthentication, makeRequireRole } from '../core/auth';

const getAllFilms = async (ctx: KoaContext<GetAllFilmsResponse>) => {
  const films = await filmService.getAll();
  ctx.body = {
    items: films,
  };
};
getAllFilms.validationScheme = null;

const createFilms = async (ctx: KoaContext<CreateFilmResponse, void, CreateFilmRequest>) => {
  const film = await filmService.create(ctx.request.body);
  ctx.status = 201;
  ctx.body = film;
};
createFilms.validationScheme = {
  body: {
    titel: Joi.string().min(1).max(255),
    regiseur: Joi.string(),
  },
};

const getFilmsById = async (ctx: KoaContext<GetFilmByIdResponse, IdParams>) => {
  const film = await filmService.getById(Number(ctx.params.id));
  ctx.body = film;
};
getFilmsById.validationScheme = {
  // 👇 3
  params: {
    id: Joi.number().integer().positive(),
  },
};

const updateFilms = async (ctx: KoaContext<UpdateFilmResponse, IdParams, UpdateFilmRequest>) => {
  const film = await filmService.updateById(ctx.params.id, ctx.request.body);
  ctx.body = film;
};
updateFilms.validationScheme = {
  params: { id: Joi.number().integer().positive() },
  body: {
    titel: Joi.string().max(255),
    regiseur: Joi.string().max(255),
  },
};

const deleteFilms = async (ctx: KoaContext<void, IdParams>) => {
  filmService.deleteById(ctx.params.id);
  ctx.status = 204;
};
deleteFilms.validationScheme = {
  params: {
    id: Joi.number().integer().positive(),
  },
};

const getReviewsByFilmId = async (ctx: KoaContext<void, IdParams>) => {
  filmService.getReviewsByFilmId(ctx.params.id);
  ctx.status = 204;
};
deleteFilms.validationScheme = {
  params: {
    id: Joi.number().integer().positive(),
  },
};

export default (parent: KoaRouter) => {
  const router = new Router<FilmAppState, FilmAppContext>({
    prefix: '/films',
  });

  const requireAdmin = makeRequireRole(Role.ADMIN);

  router.get('/', requireAuthentication,validate(getAllFilms.validationScheme) ,getAllFilms);
  router.post('/',requireAuthentication,requireAdmin,validate(createFilms.validationScheme) ,createFilms);
  router.get('/:id',requireAuthentication,validate(getFilmsById.validationScheme) ,
    validate(getFilmsById.validationScheme), getFilmsById);
  router.put('/:id',requireAuthentication,requireAdmin,validate(updateFilms.validationScheme), updateFilms);
  router.delete('/:id',requireAuthentication,requireAdmin,validate(deleteFilms.validationScheme) ,deleteFilms);
  router.get('/:id/reviews',requireAuthentication ,getReviewsByFilmId);
  parent.use(router.routes()).use(router.allowedMethods());
};