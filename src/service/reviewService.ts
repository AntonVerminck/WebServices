import { prisma } from '../data';
import type { Review, ReviewCreateInput, ReviewUpdateInput} from '../types/review';
import ServiceError from '../core/serviceError'; // 👈 1
import handleDBError from './_handleDBError';
// Get all reviews
const REVIEW_SELECT = {
  user_id: true,
  id: true,
  review_titel: true,
  review_content: true,
  film_id: true,
  rating: true,

}

export const getAll = async (): Promise<Review[]> => {
  return prisma.review.findMany({
    select: REVIEW_SELECT,
  });
};

export const getById = async (id: number): Promise<Review> => {


  const review = await prisma.review.findUnique({
    where: {
      id
    },
    select: REVIEW_SELECT,
  });

  if (!review) {
    throw ServiceError.notFound('No review with this id exists');
  }

  return review;
};

export const create = async ({
  user_id,
  review_titel,
  review_content,
  film_id,
  rating,
}: ReviewCreateInput): Promise<Review> => {
  try {
    return await prisma.review.create({
      data: {
            user_id,
            review_titel,
            review_content,
            film_id,
            rating,
      },
      select: REVIEW_SELECT,
    });
  } catch (error) {
    throw handleDBError(error);
  }
};

export const updateById = async (id: number, {
  review_titel,
  review_content,
  film_id,
  rating,
}: ReviewUpdateInput): Promise<Review> => {
  try {

    return await prisma.review.update({
      where: {
        id,
      },
      data: {
            review_titel,
            review_content,
            film_id,
            rating,
      },
      select: REVIEW_SELECT,
    });
  } catch (error) {
    throw handleDBError(error);
  }
};

export const deleteById = async (id: number): Promise<void> => {
  try {
    await prisma.review.delete({
      where: {
        id
      },
    });
  } catch (error) {
    throw handleDBError(error);
  }
};

export const getReviewByFilmId = async (filmId: number, userId: number): Promise<Review[]> => {
  return prisma.review.findMany({
    where: {
      film_id: filmId,
      user_id: userId,
    },
    select: REVIEW_SELECT,
  });
};