import Router from '@koa/router';
import * as healthService from '../service/health';
import type { FilmAppContext, FilmAppState} from '../types/koa';
import type { KoaContext, KoaRouter } from '../types/koa';
import type { PingResponse, VersionResponse } from '../types/health';
import validate from '../core/validation';

/**
 * @api {get} /health/ping ping the server
 * @apiName ping
 * @apiGroup Health
 *
 *
 * @apiSuccess {String} pong 
 */

const ping = async (ctx: KoaContext<PingResponse>) => {
  ctx.status = 200;
  ctx.body = healthService.ping();
};
ping.validationScheme = null;

/**
 * @api {get} /health/version Ask what the current version is
 * @apiName getVersion
 * @apiGroup Health
 *
 *
 * @apiSuccess {String} Versie gelinkt aan package.json
 */

const getVersion = async (ctx: KoaContext<VersionResponse>) => {
  ctx.status = 200;
  ctx.body = healthService.getVersion();
};
getVersion.validationScheme = null;
export default function installPlacesRoutes(parent: KoaRouter) {
  const router = new Router<FilmAppState, FilmAppContext>({ prefix: '/health' });

  router.get('/ping', validate(ping.validationScheme), ping);
  router.get('/version', validate(getVersion.validationScheme), getVersion);

  parent
    .use(router.routes())
    .use(router.allowedMethods());
};