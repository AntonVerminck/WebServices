import Router from '@koa/router';
import * as screeningService from '../service/screeningService';
import type { FilmAppContext, FilmAppState} from '../types/koa';
import type { KoaContext, KoaRouter } from '../types/koa';
import type {
  CreateScreeningRequest,
  CreateScreeningResponse,
  GetScreeningByIdResponse,
  UpdateScreeningRequest,
  UpdateScreeningResponse,
  GetAllScreeningsResponse,
} from '../types/screening';
import type { IdParams } from '../types/common';
import Role from '../core/roles';
import Joi from 'joi';
import validate from '../core/validation'; 
import { requireAuthentication, makeRequireRole } from '../core/auth';
/**
 * @api {post} /screenings Create a new Screening 
 * @apiName createScreenings
 * @apiGroup Screenings
 * 
 * @apibody {String} titel de titel van Screening
 * @apibody {String} regiseur persson die regiseur is van de Screening
 *  
 * @apiSuccess {Screening} an Screening object
 * @apiError (status: 400) BadRequest Invalid data provided.
 * @apiError (status: 401) Unauthorized, no authorization detected  .

 */

const createScreening = async (ctx: KoaContext<CreateScreeningResponse, void, CreateScreeningRequest>) => {
  const screening = await screeningService.create(ctx.request.body);
  ctx.status = 201;
  ctx.body = screening;
};
createScreening.validationScheme = {
  body: {
    film_id: Joi.number().integer().positive(),
    straat: Joi.string(),
    naam: Joi.string(),
    postcode: Joi.number().positive(),
    huisnummer: Joi.number().positive(),
    datum: Joi.date(),
  },
};
/**
 * @api {get} /screenings get all screenings
 * @apiName getAllFilms
 * @apiGroup Films
 * @apiSuccess {Films[]} items List of Films
 * @apiError (status: 400) BadRequest, Invalid data provided.
 * @apiError (status: 401) Unauthorized, login error.
 */

const getAllScreenings = async (ctx: KoaContext<GetAllScreeningsResponse>) => {
  ctx.body = {
    items: await screeningService.getAll(),
  };
};
getAllScreenings.validationScheme = null;
/**
 * @api {get} /screenings/:id Get a Screening by its Id
 * @apiName getScreeningByID
 * @apiGroup Screenings
 * @apiSuccess {Screening} an Screening object 
 * @apiParam id the Screening id
 * @apiError (status: 400) BadRequest Invalid data provided.
 * @apiError (status: 401) Unauthorized, no authorization detected  .
 *   @apiError (status: 404) NotFound.
 */
const getScreeningById = async (ctx: KoaContext<GetScreeningByIdResponse, IdParams>) => {
  const screening = await screeningService.getById(Number(ctx.params.id));
  ctx.body = screening;
};
getScreeningById.validationScheme = {
  params: {
    id: Joi.number().integer().positive(),
  },
};
/**
 * @api {put} /screenings/:id Update info of a Screening with its Id
 * @apiName updateScreenings
 * @apiGroup Screenings
 * @apiParam id the Screening id
 * @apiSuccess {screenings} returns updated Screening
 * @apiError (status: 400) BadRequest Invalid data provided.
 * @apiError (status: 401) Unauthorized, login error.
 *  @apiError (status: 404) NotFound.
 */
const updateScreening = async (ctx: KoaContext<UpdateScreeningResponse, IdParams, UpdateScreeningRequest>) => {
  const screening = await screeningService.updateById(ctx.params.id, ctx.request.body);
  ctx.body = screening; 
};
updateScreening.validationScheme = {
  body: {
    film_id: Joi.number().integer().positive(),
    straat: Joi.string(),
    naam: Joi.string(),
    postcode: Joi.number().positive(),
    huisnummer: Joi.number().positive(),
    datum: Joi.date(),
  },
};
/**
 * @api {Delete} /screenings/:id Delete Screening by its Id
 * @apiName deleteScreenings
 * @apiGroup Screenings
* @apiParam {Number}id the Screening id
 * @apiError (status: 400) BadRequest Invalid data provided.
 * @apiError (status: 401) Unauthorized, login error.
 *  @apiError (status: 404) NotFound.
 */
const deleteScreening = async (ctx: KoaContext<void, IdParams>) => {
  screeningService.deleteById(ctx.params.id);
  ctx.status = 204;
};
deleteScreening.validationScheme = {
  params: {
    id: Joi.number().integer().positive(),
  },
};

export default (parent: KoaRouter) => {
  const router = new Router<FilmAppState, FilmAppContext>({
    prefix: '/screenings',
  });

  const RequireAdmin = makeRequireRole(Role.ADMIN);
  router.get('/', requireAuthentication,validate(getAllScreenings.validationScheme) ,getAllScreenings);

  router.post('/', requireAuthentication , RequireAdmin , validate(createScreening.validationScheme) , createScreening);
  router.get('/:id', requireAuthentication , validate(getScreeningById.validationScheme), 
    validate(createScreening.validationScheme) ,getScreeningById);
  router.put('/:id', requireAuthentication ,RequireAdmin , validate(updateScreening.validationScheme),updateScreening);
  router.delete('/:id',RequireAdmin , validate(deleteScreening.validationScheme) , deleteScreening);

  parent.use(router.routes()).use(router.allowedMethods());
};