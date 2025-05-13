import {
   Injectable,
   NestInterceptor,
   ExecutionContext,
   CallHandler,
   Logger,
 } from '@nestjs/common';
 import { Observable, throwError } from 'rxjs';
 import { tap, catchError } from 'rxjs/operators';
 
 @Injectable()
 export class LoggingInterceptor implements NestInterceptor {
   private readonly logger = new Logger(LoggingInterceptor.name);
 
   intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
     const request = context.switchToHttp().getRequest();
     const { method, originalUrl, ip, headers, body, params, query } = request;
 
     // Log incoming request
     this.logger.log(
       `Incoming Request:
       Method: ${method} 
       URL: ${originalUrl}
       Params: ${JSON.stringify(params)}
       Query: ${JSON.stringify(query)}
       Body: ${JSON.stringify(body)}`
     );
 
     const now = Date.now();
 
     return next.handle().pipe(
       // Success response logging
       tap((responseBody) => {
         const response = context.switchToHttp().getResponse();
          this.logger.debug(
            `Success Response:
            Status: ${response.statusCode}
            Duration: ${Date.now() - now}ms
            Body: ${safeJsonPreview(responseBody)}`
          );
       }),
       // Error logging (including guard failures)
       catchError((err) => {
         const response = context.switchToHttp().getResponse();
         const statusCode = err.status || err.statusCode || 500;
         
         this.logger.error(
           `Error Response:
           Status: ${statusCode}
           Duration: ${Date.now() - now}ms
           Message: ${err.message}
           Stack: ${err.stack}
           Error Details: ${JSON.stringify(err.response || err)}`
         );
 
         return throwError(() => err); // Note: Updated to recommended throwError syntax
       })
     );
   }
 }

 function safeJsonPreview(data: any): string {
  try {
    const json = JSON.stringify(data);
    return json.length > 200 ? json.slice(0, 200) + '... (truncated)' : json;
  } catch {
    return '[Unserializable response body]';
  }
}