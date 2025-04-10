import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  use(req: Request, res: any, next: NextFunction) {
    // Log request
    console.log(`Request: ${req.method} ${req.originalUrl}`);
    console.log('Request body:', req.body);

    // Capture the original send function to log response
    const originalSend = res.send;
    res.send = (body: any) => {
      // Log response
      console.log(`Response status: ${res.statusCode}`);
      console.log('Response body:', body);
      originalSend.call(res, body);
    };

    next();
  }
}
