import { model, Schema } from 'mongoose';

const ServiceSchema = new Schema(
  {
    category: {
      type: Schema.Types.ObjectId,
      ref: 'ServiceCategory',
      required: true,
    },
    image: {
      type: String,
      trim: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    description: {
      type: String,
      trim: true,
    },
    address: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'active',
    },
    is_trending: {
      type: Boolean,
      default: false,
    },
    is_recommended: {
      type: Boolean,
      default: false,
    },
    averageRating: {
      type: Number,
      default: 0,
    },
    totalRating: {
      type: Number,
      default: 0,
    },
    bookedSlotes: [
      {
        date: String,
        timeSlot: String,
      },
    ],
    ratings: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Rating',
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const ServiceModel = model('Service', ServiceSchema);
