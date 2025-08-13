// src/core/auth.ts
import type { Next } from 'koa'; // 👈 1
import type { KoaContext } from '../types/koa'; // 👈 1
import * as userService from '../service/userService'; // 👈 1
import config from 'config'; 
// 👇 1
const AUTH_MAX_DELAY = config.get<number>('auth.maxDelay');

export const requireAuthentication = async (ctx: KoaContext, next: Next) => {
  const { authorization } = ctx.headers;

  ctx.state.session = await userService.checkAndParseSession(authorization);

  return next();
};

export const makeRequireRole = (role: string) => async (ctx: KoaContext, next: Next) => {
  const { roles = [] } = ctx.state.session;

  userService.checkRole(role, roles);

  return next();
};

export const authDelay = async (_: KoaContext, next: Next) => {
  await new Promise((resolve) => {
    const delay = Math.round(Math.random() * AUTH_MAX_DELAY);
    setTimeout(resolve, delay);
  });
  return next();
};