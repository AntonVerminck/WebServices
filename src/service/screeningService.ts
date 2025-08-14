import { prisma } from '../data';
import type { Screening, ScreeningCreateInput, ScreeningUpdateInput} from '../types/screening';
import ServiceError from '../core/serviceError'; // 👈 1
import handleDBError from './_handleDBError';
// Get all screenings
const SCREENING_SELECT = {
  film_id: true,
  id: true,
  naam: true,
  straat: true,
  postcode: true,
  huisnummer: true,
  datum: true,

};

export const getAll = async (): Promise<Screening[]> => {
  return prisma.screening.findMany({
    select: SCREENING_SELECT,
  });
};

export const getById = async (id: number): Promise<Screening> => {

  const screening = await prisma.screening.findUnique({
    where: {
      id,
    },
    select: SCREENING_SELECT,
  });

  if (!screening) {
    throw ServiceError.notFound('No screening with this id exists');
  }

  return screening;
};

export const create = async ({
  film_id,
  straat,
  huisnummer,
  naam,
  postcode,
  datum,
}: ScreeningCreateInput): Promise<Screening> => {
  try {
    return await prisma.screening.create({
      data: {
        film_id,
        straat,
        huisnummer,
        naam,
        postcode,
        datum,
      },
      select: SCREENING_SELECT,
    });
  } catch (error) {
    throw handleDBError(error);
  }
};

export const updateById = async (id: number, {
  straat,
  huisnummer,
  naam,
  postcode,
}: ScreeningUpdateInput): Promise<Screening> => {
  try {

    return await prisma.screening.update({
      where: {
        id,
      },
      data: {
        straat,
        huisnummer,
        naam,
        postcode,
      },
      select: SCREENING_SELECT,
    });
  } catch (error) {
    throw handleDBError(error);
  }
};

export const deleteById = async (id: number): Promise<void> => {
  try {
    await prisma.screening.delete({
      where: {
        id,
      },
    });
  } catch (error) {
    throw handleDBError(error);
  }
};

export const getScreeningsByFilmId = async (id: number): Promise<void> => {
  try {
    await prisma.screening.delete({
      where: {
        id,
      },
    });
  } catch (error) {
    throw handleDBError(error);
  }
};
