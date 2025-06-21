import { StatusCodes } from 'http-status-codes';
import ApiError from '../../../errors/ApiError';
import QueryBuilder from '../../builder/QueryBuilder';
import { PortfolioModel } from './portfolio.model';
import { TPortfolio } from './protfolio.interface';

// Create a new portfolio
const createPortfolio = async (payload: TPortfolio) => {
  const created = await PortfolioModel.create(payload);

  if (!created) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Failed to create portfolio');
  }

  return created;
};

// Get all portfolios
const getAllPortfolios = async (query: Record<string, unknown>) => {
  const portfolioQuery = new QueryBuilder(PortfolioModel.find(), query)
    .search(['title']) // only searchable field based on your schema
    .filter()
    .sort()
    .paginate()
    .fields();

  const portfolios = await portfolioQuery.modelQuery.exec();

  if (!portfolios.length) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'No portfolios found');
  }

  return portfolios;
};

// Get a single portfolio by ID
const getSinglePortfolio = async (portfolioId: string) => {
  const portfolio = await PortfolioModel.findById(portfolioId);

  if (!portfolio) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Portfolio not found');
  }

  return portfolio;
};

// Update a portfolio by ID
const updatePortfolio = async (
  portfolioId: string,
  payload: Partial<TPortfolio>
) => {
  const existing = await PortfolioModel.findById(portfolioId);

  if (!existing) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Portfolio not found');
  }

  const updated = await PortfolioModel.findByIdAndUpdate(portfolioId, payload, {
    new: true,
    runValidators: true,
  });

  if (!updated) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Failed to update portfolio');
  }

  return updated;
};

// Delete a portfolio by ID
const deletePortfolio = async (portfolioId: string) => {
  const existing = await PortfolioModel.findById(portfolioId);

  if (!existing) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Portfolio not found');
  }

  await PortfolioModel.findByIdAndDelete(portfolioId);
};

export const PortfolioService = {
  createPortfolio,
  updatePortfolio,
  deletePortfolio,
  getAllPortfolios,
  getSinglePortfolio,
};
