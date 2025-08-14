// src/service/_handleDBError.ts
import ServiceError from '../core/serviceError'; // 👈 2

// 👇 1
const handleDBError = (error: any) => {
  // 👇 3
  const { code = '', message } = error;

  if (code === 'P2002') {
    switch (true) {
      case message.includes('idx_user_email_unique'):
        throw ServiceError.validationFailed(
          'There is already a user with this email address',
        );
      default:
        throw ServiceError.validationFailed('This item already exists');
    }
  }

  if (code === 'P2025') {
    switch (true) {
      case message.includes('fk_film_screening'):
        throw ServiceError.notFound('This screening does not exist');
      case message.includes('fk_review_user'):
        throw ServiceError.notFound('This user does not exist');
      case message.includes('screening'):
        throw ServiceError.notFound('No screening with this id exists');
      case message.includes('film'):
        throw ServiceError.notFound('No film with this id exists');
      case message.includes('review'):
        throw ServiceError.notFound('No review with this id exists');
      case message.includes('user'):
        throw ServiceError.notFound('No user with this id exists');
    }
  }

  if (code === 'P2003') {
    switch (true) {
      case message.includes('film_id'):
        throw ServiceError.conflict(
          'This Movie does not exist or is still linked to review',
        );
      case message.includes('user_id'):
        throw ServiceError.conflict(
          'This user does not exist or is still linked to review',
        );
    }
  }

  // Rethrow error because we don't know what happened
  throw error;
};

export default handleDBError; // 👈 1