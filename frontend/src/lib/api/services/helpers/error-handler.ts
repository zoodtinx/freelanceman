
export async function handleApiError(res: Response) {
   let errorMessage = 'An unexpected error occurred';
   let statusCode = 500;

   try {
      const errorData = await res.json();
      errorMessage = errorData.message || errorMessage;
      statusCode = errorData.statusCode || statusCode;
      console.log('statusCode', statusCode);
   } catch (e) {
      console.error('Error parsing response JSON', e);
   }

   let error;
   switch (statusCode) {
      case 401:
         error = new Error('Unauthorized');
         break;
      case 403:
         error = new Error('Forbidden');
         break;
      case 404:
         error = new Error('Not Found');
         break;
      case 500:
         error = new Error('Internal Server Error');
         break;
      default:
         error = new Error(errorMessage);
   }

   throw error;
}
