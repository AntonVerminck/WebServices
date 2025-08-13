import { prisma } from '../data';
import type { Film, FilmCreateInput, FilmUpdateInput} from '../types/film';
import ServiceError from '../core/serviceError'; 
import handleDBError from './_handleDBError';
// Get all films
const FILM_SELECT = {
  id: true,  
  titel: true,
  regiseur: true,

};

export const getAll = async (): Promise<Film[]> => {
  return prisma.film.findMany({
    select: FILM_SELECT,
  });
};

export const getById = async (id: number): Promise<Film> => {
  const film = await prisma.film.findUnique({
    where: {
      id,
    },
    select: FILM_SELECT,
  });

  if (!film) {
    throw ServiceError.notFound('No film with this id exists');
  }

  return film;
};

export const create = async ({
 titel,
regiseur,
}: FilmCreateInput): Promise<Film> => {
  try {
    return await prisma.film.create({
      data: {
        titel,
        regiseur,
      },
      select: FILM_SELECT,
    });
  } catch (error) {
    throw handleDBError(error);
  }
};

export const updateById = async (id: number, {
 titel,
regiseur,
}: FilmUpdateInput): Promise<Film> => {
  try {

    return await prisma.film.update({
      where: {
        id,
      },
      data: {
        titel,
        regiseur,
      },
      select: FILM_SELECT,
    });
  } catch (error) {
    throw handleDBError(error);
  }
};

export const deleteById = async (id: number): Promise<void> => {
  try {
    await prisma.film.delete({
      where: {
        id
      },
    });
  } catch (error) {
    throw handleDBError(error);
  }
};
