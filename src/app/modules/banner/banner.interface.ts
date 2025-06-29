import { Types } from 'mongoose';

export type TBanner = {
  _id?: Types.ObjectId;
  image: string;
  is_active: boolean;
  isDeleted: boolean;
};
