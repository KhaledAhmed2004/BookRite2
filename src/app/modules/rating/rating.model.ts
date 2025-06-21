import { Schema, model } from 'mongoose';
import { TRating } from './rating.interfacet';

const ratingSchema = new Schema<TRating>(
  {
    service: { type: Schema.Types.ObjectId, ref: 'Service', required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, trim: true },
  },
  { timestamps: true }
);

export const RatingModel = model<TRating>('Rating', ratingSchema);
