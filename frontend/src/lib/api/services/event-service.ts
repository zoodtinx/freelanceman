import { handleApiError } from '@/lib/api/services/helpers/error-handler';
import { ProjectSearchOption } from '@types';

export async function getEvents(
   accessToken: string,
   filter: ProjectSearchOption
) {
   try {
      const res = await fetch(
         `${import.meta.env.VITE_API_URL}events/search`,
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
         handleApiError(res);
      }

      return await res.json();
   } catch (error) {
      if (error instanceof TypeError && error.message === 'Failed to fetch') {
         throw new Error('Network Error');
      }

      console.error('Error fetching events:', error);
      throw error;
   }
}
