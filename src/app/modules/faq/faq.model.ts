import { model, Schema } from 'mongoose';
import { TFaq } from './faq.interfacet';

const faqSchema = new Schema<TFaq>(
  {
    title: {
      type: String,
      required: true,
      trim: true, // Removes leading/trailing spaces
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export const FaqModel = model<TFaq>('Faq', faqSchema);
