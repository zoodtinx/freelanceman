import { handleApiError } from '@/lib/api/services/helpers/error-handler';

interface FetchRequestOptions {
   method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
   accessToken: string;
   apiEndpoint: string;
   requestPayload?: any;
   model?: string;
}

export async function fetchProMax({
   accessToken,
   apiEndpoint,
   requestPayload,
   method,
   model,
}: FetchRequestOptions) {
   try {
      const response = await fetch(
         `${import.meta.env.VITE_API_URL}${apiEndpoint}`,
         {
            method,
            headers: {
               'Content-Type': 'application/json',
               Authorization: `Bearer ${accessToken}`,
            },
            body: method !== 'GET' ? JSON.stringify(requestPayload) : undefined,
         }
      );

      if (!response.ok) {
         handleApiError(response);
      }

      return await response.json();
   } catch (error) {
      if (error instanceof TypeError && error.message === 'Failed to fetch') {
         throw new Error('Network Error');
      }

      console.error(`Error fetching ${model}`, error);
      throw error;
   }
}
