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
         `${import.meta.env.VITE_API_URL}/${apiEndpoint}`,
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
         const errorData = await response.json();
         handleApiError(response.status, errorData.message);
      }

      const text = await response.text();
      return text ? JSON.parse(text) : null;
   } catch (error) {
      if (error instanceof TypeError && error.message === 'Failed to fetch') {
         throw new Error('Network Error');
      }

      console.error(`Error fetching ${model}`, error);
      throw error;
   }
}

export function handleApiError(statusCode: number, message: string) {
   console.log('statusCode', statusCode);

   switch (statusCode) {
      case 401:
         throw new Error('Unauthorized');
      default:
         throw new Error('Unexpected error on our side. Please try again.');
   }
}
