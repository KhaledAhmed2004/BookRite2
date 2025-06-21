import { Types } from 'mongoose';

export type TService = {
  name: string;
  category: Types.ObjectId; // reference to 'ServiceCategory'
  status?: 'active' | 'inactive';
  img?: string;
  address?: string;
  description?: string;
  price: number;
  is_trending?: boolean;
  is_recommended?: boolean;
};
