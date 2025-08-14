import Router from '@koa/router';
import * as filmService from '../service/filmService';
import * as reviewService from '../service/reviewService';
import * as screeningService from '../service/screeningService';
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
import type {
  GetAllReviewsResponse,
} from '../types/review';
import type {
  GetAllScreeningsResponse,
} from '../types/screening';

/**
 * @api {get} /films get all films
 * @apiName getAllFilms
 * @apiGroup Films
 * @apiSuccess {Films[]} items is List of Films
 * @apiError (status: 400) BadRequest, Invalid data provided.
 * @apiError (status: 401) Unauthorized, login error.
 */

const getAllFilms = async (ctx: KoaContext<GetAllFilmsResponse>) => {
  const films = await filmService.getAll();
  ctx.body = {
    items: films,
  };
};
getAllFilms.validationScheme = null;

/**
 * @api {post} /films Create a new film 
 * @apiName createFilms
 * @apiGroup Films
 * 
 * @apibody {String} titel: de titel van film
 * @apibody {String} regiseur: persson die regiseur is van de film
 *  
 * @apiSuccess status 201
 * @apiSuccess {Film} an Film object
 * @apiError (status: 400) BadRequest Invalid data provided.
 * @apiError (status: 401) Unauthorized, no authorization detected  .

 */

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
/**
 * @api {get} /films/:id Get a film by its Id
 * @apiName getFilmByID
 * @apiGroup Films
 * @apiSuccess (200) {Film} an Film object 
 * @apiError (status: 400) BadRequest Invalid data provided.
 * @apiError (status: 401) Unauthorized, no authorization detected  .
 *   @apiError (status: 404) NotFound.
 */

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
/**
 * @api {put} /films/:id Update info of a Film with its Id
 * @apiName updateFilms
 * @apiGroup Films
 * @apiSuccess {Films} returns updated film
 * @apiError (status: 400) BadRequest Invalid data provided.
 * @apiError (status: 401) Unauthorized, login error.
 *  @apiError (status: 404) NotFound.
 */

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
/**
 * @api {Delete} /films/:id Delete film by its Id
 * @apiName deleteFilms
 * @apiGroup Films
 * @apiSuccess {status: 204}  empty response 
 * @apiError (status: 400) BadRequest Invalid data provided.
 * @apiError (status: 401) Unauthorized, login error.
 *  @apiError (status: 404) NotFound.
 */

const deleteFilms = async (ctx: KoaContext<void, IdParams>) => {
  filmService.deleteById(ctx.params.id);
  ctx.status = 204;
};
deleteFilms.validationScheme = {
  params: {
    id: Joi.number().integer().positive(),
  },
};
/**
 * @api {get} /films/:id/reviews get the reviews of a certain movie
 * @apiName getReviewsByFilmId
 * @apiGroup Films
 * @apiSuccess {Review[]} List of Review objects
 * @apiError (400) BadRequest Invalid data provided.
 * @apiError (401) Unauthorized, login error.
 * @apiError (status: 404) NotFound.
 */

const getReviewsByFilmId = async (ctx: KoaContext<GetAllReviewsResponse, IdParams>) => {
  const reviews = await reviewService.getReviewsByFilmId(ctx.params.id);
  ctx.body = {
    items: reviews,
  }; 
};
getReviewsByFilmId.validationScheme = {
  params: {
    id: Joi.number().integer().positive(),
  },
};
/**
 * @api {get} /films/:id/screenings get the screenings of a certain movie
 * @apiName getScreeningsByFilmId
 * @apiGroup Films
 * @apiSuccess {Screening[]} List of Screenig objects
 * @apiError (400) BadRequest Invalid data provided.
 * @apiError (401) Unauthorized, login error.
 * @apiError (status: 404) NotFound.
 */

const getScreeningsByFilmId = async (ctx: KoaContext<GetAllScreeningsResponse, IdParams>) => {
  const reviews = await screeningService.getScreeningsByFilmId(ctx.params.id);
  ctx.body = {
    items: reviews,
  }; 
};
getScreeningsByFilmId.validationScheme = {
  params: {
    id: Joi.number().integer().positive(),
  },
};

export default (parent: KoaRouter) => {
  const router = new Router<FilmAppState, FilmAppContext>({
    prefix: '/films',
  });

  const requireAdmin = makeRequireRole(Role.ADMIN);

  router.get('/', 
    requireAuthentication,validate(getAllFilms.validationScheme) ,
    getAllFilms);

  router.post('/',
    requireAuthentication,requireAdmin,validate(createFilms.validationScheme) ,
    createFilms);

  router.get('/:id',
    requireAuthentication,validate(getFilmsById.validationScheme) ,
    getFilmsById);

  router.put('/:id',
    requireAuthentication,requireAdmin,validate(updateFilms.validationScheme),
    updateFilms);

  router.delete('/:id',
    requireAuthentication,requireAdmin,validate(deleteFilms.validationScheme) ,
    deleteFilms);

  router.get('/:id/reviews',
    requireAuthentication, validate(getReviewsByFilmId.validationScheme) ,
    getReviewsByFilmId);

  router.get(
    '/:id/screenings',
    requireAuthentication, validate(getScreeningsByFilmId.validationScheme),
    getScreeningsByFilmId);
  parent.use(router.routes()).use(router.allowedMethods());
};