import { model, Schema } from 'mongoose';
import { string } from 'zod';

const ServiceSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'ServiceCategory', // 👈 Reference to another collection
      required: true,
    },
    status: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'active',
    },
    img: {
      type: String,
      trim: true,
    },
    address: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    bookedSlotes: [
      {
        date: string,
        timeSlot: string,
      },
    ],
    is_trending: {
      type: Boolean,
      default: false, // 👈 Default value can be false
    },
    is_recommended: {
      type: Boolean,
      default: false, // 👈 Default value can also be false
    },
    averageRating: {
      type: Number,
      default: 0,
    },
    totalRating: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export const ServiceModel = model('Service', ServiceSchema);
