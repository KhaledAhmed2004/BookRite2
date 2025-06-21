import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { PortfolioService } from './portfolio.service';
import { getSingleFilePath } from '../../../shared/getFilePath';

// Create a new portfolio
const createPortfolio = catchAsync(async (req: Request, res: Response) => {
  const img = getSingleFilePath(req.files, 'image');
  const data = {
    img,
    ...req.body,
  };
  const result = await PortfolioService.createPortfolio(data);
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: 'Portfolio created successfully',
    data: result,
  });
});

// Get all portfolios
const getAllPortfolios = catchAsync(async (req: Request, res: Response) => {
  const result = await PortfolioService.getAllPortfolios(req.query);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Portfolios retrieved successfully',
    data: result,
  });
});

// Get a single portfolio by ID
const getSinglePortfolio = catchAsync(async (req: Request, res: Response) => {
  const { portfolioId } = req.params;
  const result = await PortfolioService.getSinglePortfolio(portfolioId);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Portfolio retrieved successfully',
    data: result,
  });
});

// Update a portfolio by ID
const updatePortfolio = catchAsync(async (req: Request, res: Response) => {
  const { portfolioId } = req.params;
  const img = getSingleFilePath(req.files, 'image');
  const updatedData = {
    img,
    ...req.body,
  };
  const result = await PortfolioService.updatePortfolio(
    portfolioId,
    updatedData
  );
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Portfolio updated successfully',
    data: result,
  });
});

// Delete a portfolio by ID
const deletePortfolio = catchAsync(async (req: Request, res: Response) => {
  const { portfolioId } = req.params;
  await PortfolioService.deletePortfolio(portfolioId);
  sendResponse(res, {
    statusCode: StatusCodes.NO_CONTENT,
    success: true,
    message: 'Portfolio deleted successfully',
    data: null,
  });
});

export const PortfolioController = {
  createPortfolio,
  updatePortfolio,
  deletePortfolio,
  getAllPortfolios,
  getSinglePortfolio,
};
