export function handleApiError(statusCode: number, message: string) {
   switch (statusCode) {
      case 401:
         throw new Error('Unauthorized');
      case 403:
         throw new Error('Forbidden');
      case 404:
         throw new Error('Not Found');
      case 500:
         throw new Error('Internal Server Error');
      default:
         throw new Error(message || 'An unexpected error occurred');
   }
}
