import AppError from '@shared/errors/AppError';
import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import authConfig from '@config/auth';
export default function isAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('JWT Token is missing');
  }

  //Possivel desistruturação por split
  const [type, token] = authHeader.split(' ');
  try {
    const decoded_token = verify(token, authConfig.jwt.secret);
    return next();
  } catch (e) {
    throw new AppError('invalid JWT token');
  }
}
