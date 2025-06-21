import { StatusCodes } from 'http-status-codes';
import ApiError from '../../../errors/ApiError';
import { FaqModel } from './faq.model';
import { TFaq } from './faq.interfacet';

// ✅ Create a new FAQ
const createFaq = async (payload: TFaq) => {
  const created = await FaqModel.create(payload);

  if (!created) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Failed to create FAQ');
  }

  return created;
};

// ✅ Get all FAQs
const getAllFaqs = async () => {
  const faqs = await FaqModel.find();

  if (!faqs.length) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'No FAQs found');
  }

  return faqs;
};

// ✅ Get a single FAQ by ID
const getSingleFaq = async (id: string) => {
  const faq = await FaqModel.findById(id);

  if (!faq) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'FAQ not found');
  }

  return faq;
};

// ✅ Update a FAQ by ID
const updateFaq = async (faqId: string, payload: Partial<TFaq>) => {
  const updated = await FaqModel.findByIdAndUpdate(faqId, payload, {
    new: true,
  });

  if (!updated) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Failed to update FAQ');
  }

  return updated;
};

// ✅ Delete a FAQ by ID
const deleteFaq = async (faqId: string) => {
  const existing = await FaqModel.findById(faqId);

  if (!existing) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'FAQ not found');
  }

  await FaqModel.findByIdAndDelete(faqId);
};

export const FaqService = {
  createFaq,
  getAllFaqs,
  getSingleFaq,
  updateFaq,
  deleteFaq,
};
