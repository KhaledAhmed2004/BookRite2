import { Types } from 'mongoose';

export type TRating = {
  service: Types.ObjectId;
  user: Types.ObjectId;
  rating: number;
  comment: string;
};
