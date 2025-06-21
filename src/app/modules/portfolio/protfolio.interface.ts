import { Types } from 'mongoose';

export type TPortfolio = {
  title: string;
  provider: Types.ObjectId; // reference to 'User'
  img?: string;
};
