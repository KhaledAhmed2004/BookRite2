import { Types } from 'mongoose';

export type TBooking = {
  userId: Types.ObjectId; // jei user book korse
  providerId: Types.ObjectId; // jei provider er service
  serviceId: Types.ObjectId; // kon service
  date: string; // kon date e (format: YYYY-MM-DD)
  timeSlot: string; // kon time slot e (e.g., '14:00-15:00')
  status: 'confirmed' | 'pending' | 'cancelled'; // booking status
};
