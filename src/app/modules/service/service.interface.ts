import { Types } from 'mongoose';

export type TService = {
  category: Types.ObjectId;
  image: string;
  name: string;
  price: number;
  description: string;
  address: string;
  status: 'active' | 'inactive';
  is_trending?: boolean;
  is_recommended?: boolean;
};
