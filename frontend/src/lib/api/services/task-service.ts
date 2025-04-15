import { handleApiError } from '@/lib/api/services/helpers/error-handler';

export async function getTasks(
   accessToken: string,
   filter: ProjectSearchOption
) {
   try {
      const res = await fetch(
         `${import.meta.env.VITE_API_URL}tasks/search`,
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

      console.error('Error fetching projects:', error);
      throw error;
   }
}
