import type { Prisma } from '@prisma/client';
import type { Entity, ListResponse } from './common';

export interface User extends Entity {
  voornaam: string;
  achternaam: string;
  email: string;
  password_hash: string;
  roles: Prisma.JsonValue;
}

export interface UserCreateInput {
  voornaam: string;
  achternaam: string;
  email: string;
  password: string;
}

export interface PublicUser extends Pick<User, 'id' | 'voornaam'| 'achternaam' | 'email'> {}

export interface UserUpdateInput extends Pick<UserCreateInput, 'voornaam'| 'achternaam' | 'email'> {}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface GetUserRequest {
  id: number | 'me';
}
export interface RegisterUserRequest {
  voornaam: string;
  achternaam: string;
  email: string;
  password: string;
}
export interface UpdateUserRequest extends Pick<RegisterUserRequest, 'voornaam'| 'achternaam' | 'email'> {}

export interface GetAllUsersResponse extends ListResponse<PublicUser> {}
export interface GetUserByIdResponse extends PublicUser {}
export interface UpdateUserResponse extends GetUserByIdResponse {}

export interface LoginResponse {
  token: string;
}