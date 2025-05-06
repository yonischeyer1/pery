import { Request, Response, NextFunction } from 'express';

const validArticleRegex = /^[a-zA-Z0-9-_]+$/;

export function validateArticleName(req: Request, res: Response, next: NextFunction) {
  const { articleName } = req.params;

  if (!validArticleRegex.test(articleName)) {
    const error = new Error('Invalid article name');
    (error as any).status = 400; // Attach status code to the error
    return next(error); // Pass the error to the next middleware
  }

  next();
}