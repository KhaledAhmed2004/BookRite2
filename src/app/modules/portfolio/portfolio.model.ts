import { model, Schema } from 'mongoose';

const PortfolioSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    provider: {
      type: Schema.Types.ObjectId,
      ref: 'User', // Capitalized collection name for clarity
      required: true,
    },
    img: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export const PortfolioModel = model('Portfolio', PortfolioSchema);
