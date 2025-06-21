import { Schema, model } from 'mongoose';
import { TBooking } from './bookings.interfacet';

const bookingSchema = new Schema<TBooking>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    providerId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User', // assuming provider is also from User model
    },
    serviceId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Service',
    },
    date: {
      type: String,
      required: true,
    },
    timeSlot: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['confirmed', 'pending', 'cancelled'],
      default: 'pending',
    },
  },
  {
    timestamps: true,
  }
);

export const BookingModel = model<TBooking>('Booking', bookingSchema);
