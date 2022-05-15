import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface UserPayload {
  id: string;
  email: string;
}

// Add currentUser as a req property <optional>
declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayload;
    }
  }
}

/**
 * This middleware will attach decoded currentUser information from jwt if it is setted in session object.
 * @param req
 * @param res
 * @param next
 * @returns
 */
export const currentUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.session?.jwt) {
    return next();
  }

  try {
    const payload = jwt.verify(
      req.session.jwt,
      process.env.JWT_KEY!
    ) as UserPayload;
    req.currentUser = payload;
  } catch (error) {}
  next();
};
