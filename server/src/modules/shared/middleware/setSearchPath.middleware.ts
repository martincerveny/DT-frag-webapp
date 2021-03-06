import { getConnection } from 'typeorm';
import { Request, Response, NextFunction } from 'express';

/**
 * Sets search_path globally for each request based on DB_SCHEMA
 */
export async function setSearchPathMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const connection = getConnection();
  await connection.query(
    `SET SESSION search_path TO ${process.env.DB_SCHEMA}, public`,
  );
  next();
}
