import Router from '@koa/router';
import installScreeningRouter from './screening';
import installHealthRouter from './health';
import installFilmRouter from './film';
import installSessionRouter from './session';
import installUserRouter from './user';
import installReviewRouter from './review';

import type { FilmAppContext, FilmAppState, KoaApplication } from '../types/koa';

export default (app: KoaApplication) => {
  const router = new Router<FilmAppState, FilmAppContext>({
    prefix: '/api',
  });
  installUserRouter(router)
  installScreeningRouter(router)
  installFilmRouter(router)
  installHealthRouter(router);
  installSessionRouter(router);
  installReviewRouter(router)

  app.use(router.routes()).use(router.allowedMethods());
};