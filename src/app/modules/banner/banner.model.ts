import { model, Schema } from 'mongoose';
import { TBanner } from './banner.interface';

const bannerSchema = new Schema<TBanner>(
  {
    image_url: {
      type: String,
      required: true,
    },
    is_active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Banner = model<TBanner>('Banner', bannerSchema);
