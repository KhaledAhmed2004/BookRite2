import { model, Schema } from 'mongoose';
import { TBanner } from './banner.interface';

const bannerSchema = new Schema<TBanner>(
  {
    image: {
      type: String,
      required: true,
    },
    is_active: {
      type: Boolean,
      default: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export const Banner = model<TBanner>('Banner', bannerSchema);
