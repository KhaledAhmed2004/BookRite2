import Stripe from 'stripe';
import { StatusCodes } from 'http-status-codes';
import ApiError from '../../../errors/ApiError';
import config from '../../../config';

const stripe = new Stripe(config.stripe_secret_key as string);

const createPaymentIntentToDB = async (price: number) => {
  if (typeof price !== 'number' || price <= 0) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Invalid price amount');
  }

  const amount = Math.trunc(price * 100); // Convert to cents

  const paymentIntent = await stripe.paymentIntents.create({
    amount,
    currency: 'usd',
    payment_method_types: ['card'],
  });

  if (!paymentIntent.client_secret) {
    throw new ApiError(
      StatusCodes.BAD_REQUEST,
      'Failed to create payment intent'
    );
  }

  return {
    clientSecret: paymentIntent.client_secret,
  };
};

export const PaymentService = {
  createPaymentIntentToDB,
};
