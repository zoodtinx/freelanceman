import { ProjectSearchOption } from '@types';

export async function getProjects(
   accessToken: string,
   filter: ProjectSearchOption
) {
   try {
      const res = await fetch(
         `${import.meta.env.VITE_API_URL}projects/search`,
         {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
               Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify(filter),
         }
      );

      if (!res.ok) {
         let errorMessage = 'An unexpected error occurred';
         let statusCode = 500;

         try {
            const errorData = await res.json();
            errorMessage = errorData.message || errorMessage;
            statusCode = errorData.statusCode || statusCode;
            console.log('statusCode', statusCode)
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

      return await res.json();
   } catch (error) {
      if (error instanceof TypeError && error.message === 'Failed to fetch') {
         throw new Error(
            'Network Error'
         );
      }

      console.error('Error fetching projects:', error);
      throw error;
   }
}
