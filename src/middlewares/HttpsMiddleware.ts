import { Request, Response, NextFunction } from "express";

const handler = (req: Request, res: Response, next: NextFunction) => {
  if (!req.secure && req.get('x-forwarded-proto') !== 'https')
    return res.redirect('https://' + req.get('host') + req.url);

  return next();
};

export default handler;