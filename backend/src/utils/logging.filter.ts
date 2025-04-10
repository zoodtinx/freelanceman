import {
   Catch,
   ExceptionFilter,
   ArgumentsHost,
   HttpException,
   HttpStatus,
 } from '@nestjs/common';
 
 @Catch(HttpException)
 export class LoggingExceptionFilter implements ExceptionFilter {
   catch(exception: HttpException, host: ArgumentsHost) {
     const ctx = host.switchToHttp();
     const response = ctx.getResponse<Response>();
     const request = ctx.getRequest<Request>();
 
     // Log failed request
     console.log(`Failed request: ${request.method} ${request.url}`);
     console.log('Request body:', request.body);
     console.log('Exception:', exception.message);
 
     // Log response (failure)
     console.log(`Response status: ${exception.getStatus()}`);
     console.log('Response body:', exception.getResponse());
 
     (response as any).status(exception.getStatus()).json(exception.getResponse());
   }
 }
 