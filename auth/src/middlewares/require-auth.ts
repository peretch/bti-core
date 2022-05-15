import { Request, Response, NextFunction } from 'express';
import { NotAuthorizedError } from '../errors/not-authorized-error';

export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { currentUser } = req;
  if (!currentUser) {
    throw new NotAuthorizedError();
  }
  next();
};
