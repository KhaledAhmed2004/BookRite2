import { Model, Types } from 'mongoose';
import { USER_ROLES } from '../../../enums/user';

export type IUser = {
  name: string;
  email: string;
  role: USER_ROLES;
  password: string;
  phone_number?: string;
  date_of_birth?: string;
  gender?: 'male' | 'female';
  address?: string;
  location?: boolean;
  profile_picture?: string;
  status: 'active' | 'blocked';
  is_verified: boolean;
  is_deleted?: boolean;
  authentication?: {
    isResetPassword: boolean;
    oneTimeCode: number;
    expireAt: Date;
  };
};

export type UserModal = {
  isExistUserById(id: string): any;
  isExistUserByEmail(email: string): any;
  isMatchPassword(password: string, hashPassword: string): boolean;
} & Model<IUser>;
