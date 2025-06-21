import { Model, Types } from 'mongoose';
import { USER_ROLES } from '../../../enums/user';

export type IUser = {
  name: string;
  role: USER_ROLES;
  phone_number?: string;
  email: string;
  password: string;
  location?: string;
  date_of_birth?: string;
  profile_picture?: string;
  status: 'active' | 'delete';
  address?: string;
  gender?: 'male' | 'female';
  bookmarks?: Types.ObjectId[];
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
