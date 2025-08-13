import Router from '@koa/router';
import * as reviewService from '../service/reviewService';
import type { FilmAppContext, FilmAppState} from '../types/koa';
import type { KoaContext, KoaRouter } from '../types/koa';
import type {
  CreateReviewRequest,
  CreateReviewResponse,
  GetReviewByIdResponse,
  UpdateReviewRequest,
  UpdateReviewResponse,
} from '../types/review';
import type { IdParams } from '../types/common';
import Joi from 'joi'
import validate from '../core/validation'; 
import { requireAuthentication } from '../core/auth';



const createReview = async (ctx: KoaContext<CreateReviewResponse, void, CreateReviewRequest>) => {
  const review = await reviewService.create(ctx.request.body);
  ctx.status = 201;
  ctx.body = review;
};
createReview.validationScheme = {
  body: {
    review_titel: Joi.string().min(1).max(255),
    review_content: Joi.string(),
    rating: Joi.number().min(1).max(10)  
  }
}

const getReviewById = async (ctx: KoaContext<GetReviewByIdResponse, IdParams>) => {
  const review = await reviewService.getById(Number(ctx.params.id))
  ctx.body = review;
};
getReviewById.validationScheme = {
  params: {
    id: Joi.number().integer().positive(),
  },
}

const updateReview = async (ctx: KoaContext<UpdateReviewResponse, IdParams, UpdateReviewRequest>) => {
  const review = await reviewService.updateById(ctx.params.id, ctx.request.body);
  ctx.body = review;
  
};
updateReview.validationScheme = {
  params: { id: Joi.number().integer().positive() },
  body: {
    review_titel: Joi.string().min(1).max(255),
    review_content: Joi.string(),
    rating: Joi.number().min(1).max(10)  
  },
};


const deleteReview = async (ctx: KoaContext<void, IdParams>) => {
  reviewService.deleteById(ctx.params.id);
  ctx.status = 204;
};
deleteReview.validationScheme = {
  params: {
    id: Joi.number().integer().positive(),
  },
};
export default (parent: KoaRouter) => {
  const router = new Router<FilmAppState, FilmAppContext>({
    prefix: '/reviews',
  });

  
  router.post('/', requireAuthentication,validate(createReview.validationScheme) ,createReview);
  router.get('/:id', requireAuthentication,validate(getReviewById.validationScheme) ,getReviewById);
  router.put('/:id', requireAuthentication,validate(updateReview.validationScheme),updateReview);
  router.delete('/:id', requireAuthentication,validate(deleteReview.validationScheme) ,deleteReview);

  parent.use(router.routes()).use(router.allowedMethods());
};