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
} from '../types/screening';
import type { IdParams } from '../types/common';
import Role from '../core/roles';
import Joi from 'joi';
import validate from '../core/validation'; 
import { requireAuthentication, makeRequireRole } from '../core/auth';

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
const getScreeningById = async (ctx: KoaContext<GetScreeningByIdResponse, IdParams>) => {
  const screening = await screeningService.getById(Number(ctx.params.id));
  ctx.body = screening;
};
getScreeningById.validationScheme = {
  body: {
    id: Joi.number().integer().positive(),
  },
};
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
  
  router.post('/', requireAuthentication , RequireAdmin , validate(createScreening.validationScheme) , createScreening);
  router.get('/:id', requireAuthentication , validate(createScreening.validationScheme), 
    validate(createScreening.validationScheme) ,getScreeningById);
  router.put('/:id', requireAuthentication ,RequireAdmin , validate(createScreening.validationScheme),updateScreening);
  router.delete('/:id',RequireAdmin , validate(createScreening.validationScheme) , deleteScreening);

  parent.use(router.routes()).use(router.allowedMethods());
};