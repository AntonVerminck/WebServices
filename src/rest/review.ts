import Router from '@koa/router';
import * as reviewService from '../service/reviewService';
import type { FilmAppContext, FilmAppState} from '../types/koa';
import type { KoaContext, KoaRouter } from '../types/koa';
import type {
  CreateReviewRequest,
  CreateReviewResponse,
  GetAllReviewsResponse,
  GetReviewByIdResponse,
  UpdateReviewRequest,
  UpdateReviewResponse,
} from '../types/review';
import type { IdParams } from '../types/common';
import Joi from 'joi';
import validate from '../core/validation'; 
import { requireAuthentication } from '../core/auth';

/**
 * @api {post} /reviews Create a new Review 
 * @apiName createReviews
 * @apiGroup Reviews
 * 
 * @apibody {String} titel de titel van Review
 * @apibody {String} regiseur persson die regiseur is van de Review
 *  
 * @apiSuccess {Review} an Review object
 * @apiError (status: 400) BadRequest Invalid data provided.
 * @apiError (status: 401) Unauthorized, no authorization detected  .

 */

const createReview = async (ctx: KoaContext<CreateReviewResponse, void, CreateReviewRequest>) => {
  const review = await reviewService.create({
    ...ctx.request.body, 
    user_id: ctx.state.session.userId,
  });
  ctx.status = 201;
  ctx.body = review;
};
createReview.validationScheme = {
  body: {
    review_titel: Joi.string().min(1).max(255),
    review_content: Joi.string(),
    rating: Joi.number().min(1).max(10),  
    Review_id:Joi.number().positive(),
  },
};

/**
 * @api {get} /reviews get all reviews
 * @apiName getAllReviews
 * @apiGroup Reviews
 * @apiSuccess {reviews[]} items List of reviews
 * @apiError (status: 400) BadRequest, Invalid data provided.
 * @apiError (status: 401) Unauthorized, login error.
 */

const getAllReviews = async (ctx: KoaContext<GetAllReviewsResponse>) => {
  ctx.body = {
    items: await reviewService.getAll(
      ctx.state.session.userId,
      ctx.state.session.roles,
    ),
  };
};
getAllReviews.validationScheme = null;
/**
 * @api {get} /reviews/:id Get a Review by its Id
 * @apiName getReviewByID
 * @apiGroup Reviews
 * @apiSuccess {Review} an Review object 
 * @apiParam id the Review id
 * @apiError (status: 400) BadRequest Invalid data provided.
 * @apiError (status: 401) Unauthorized, no authorization detected  .
 *   @apiError (status: 404) NotFound.
 */
const getReviewById = async (ctx: KoaContext<GetReviewByIdResponse, IdParams>) => {
  const review = await reviewService.getById(Number(ctx.params.id));
  ctx.body = review;
};
getReviewById.validationScheme = {
  params: {
    id: Joi.number().integer().positive(),
  },
};
/**
 * @api {put} /reviews/:id Update info of a Review with its Id
 * @apiName updateReviews
 * @apiGroup Reviews
 * @apiParam id the Review id
 * @apiSuccess {reviews} returns updated Review
 * @apiError (status: 400) BadRequest Invalid data provided.
 * @apiError (status: 401) Unauthorized, login error.
 *  @apiError (status: 404) NotFound.
 */

const updateReview = async (ctx: KoaContext<UpdateReviewResponse, IdParams, UpdateReviewRequest>) => {
  const review = await reviewService.updateById(ctx.params.id, ctx.request.body);
  ctx.body = review;
  
};
updateReview.validationScheme = {
  params: { id: Joi.number().integer().positive() },
  body: {
    review_titel: Joi.string().min(1).max(255),
    review_content: Joi.string(),
    rating: Joi.number().min(1).max(10),  
  },
};
/**
 * @api {Delete} /reviews/:id Delete Review by its Id
 * @apiName deleteReviews
 * @apiGroup Reviews
* @apiParam {Number}id the Review id
 * @apiError (status: 400) BadRequest Invalid data provided.
 * @apiError (status: 401) Unauthorized, login error.
 *  @apiError (status: 404) NotFound.
 */

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

  router.get('/', requireAuthentication,validate(getAllReviews.validationScheme), getAllReviews  );
  router.post('/', requireAuthentication,validate(createReview.validationScheme) ,createReview);
  router.get('/:id', requireAuthentication,validate(getReviewById.validationScheme) ,getReviewById);
  router.put('/:id', requireAuthentication,validate(updateReview.validationScheme),updateReview);
  router.delete('/:id', requireAuthentication,validate(deleteReview.validationScheme) ,deleteReview);

  parent.use(router.routes()).use(router.allowedMethods());
};