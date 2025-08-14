// src/rest/session.ts
import Router from '@koa/router';
import Joi from 'joi';
import validate from '../core/validation';
import * as userService from '../service/userService';
import type {
  KoaContext,
  KoaRouter,
  FilmAppState,
  FilmAppContext,
} from '../types/koa';
import { authDelay } from '../core/auth';
import type { LoginResponse, LoginRequest } from '../types/user';

const login = async (ctx: KoaContext<LoginResponse, void, LoginRequest>) => {

  const { email, password } = ctx.request.body;
  const token = await userService.login(email, password); // 👈 3

  // 👇 4
  ctx.status = 200;
  ctx.body = { token };
};
// 👇 5
login.validationScheme = {
  body: {
    email: Joi.string().email(),
    password: Joi.string(),
  },
};

// 👇 6
export default function installSessionRouter(parent: KoaRouter) {
  const router = new Router<FilmAppState, FilmAppContext>({
    prefix: '/sessions',
  });

  router.post(
    '/',
    authDelay,
    validate(login.validationScheme),
    login,
  );
  parent.use(router.routes()).use(router.allowedMethods());
}