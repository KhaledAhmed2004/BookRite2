import { model, Schema } from 'mongoose';
import { IServiceCategory } from './serviceCategory.interfacet';

const serviceCategorySchema = new Schema<IServiceCategory>(
  {
    name: {
      type: String,
      required: true,
      unique: true, // Ensure unique service category names
      trim: true, // Trim whitespace from the name
    },
    img: {
      type: String,
      required: true, // Ensure image URL is provided
      trim: true, // Trim whitespace from the image URL
    },
  },

  {
    timestamps: true,
  }
);

export const ServiceCategoryModel = model<IServiceCategory>(
  'ServiceCategory',
  serviceCategorySchema
);
