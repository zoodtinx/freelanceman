interface FetchRequestOptions {
   accessToken: string;
   apiEndpoint: string;
   requestPayload?: any;
   method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
   model?: string;
}

export async function fetchProMax({
   accessToken,
   apiEndpoint,
   requestPayload,
   method,
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
         handleApiError(response.status);
      }

      const text = await response.text();
      return text ? JSON.parse(text) : null;
   } catch (error) {
      if (error instanceof TypeError && error.message === 'Failed to fetch') {
         throw new Error('Network Error');
      }

      throw error;
   }
}

function handleApiError(statusCode: number) {
   switch (statusCode) {
      case 401:
         throw new Error('Unauthorized');
      default:
         throw new Error('Unexpected error on our side. Please try again.');
   }
}
