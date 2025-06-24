interface AuthApiResponse {
   success: boolean;
   data: {
      accessToken: string;
      user: any;
   };
}

interface registerUserRequestPayload {
   email: string;
   password: string;
}

const fetchWithTimeout = async (
   url: string,
   options: RequestInit = {},
   timeoutMs = 10000
) => {
   const controller = new AbortController();
   const timeout = setTimeout(() => controller.abort(), timeoutMs);

   try {
      const res = await fetch(url, { ...options, signal: controller.signal });
      clearTimeout(timeout);

      const data = await res.json();
      const success = res.ok;

      return { success, data };
   } catch (err) {
      clearTimeout(timeout);
      return {
         success: false,
         data: { message: 'Request failed or timed out', error: err },
      };
   }
};

export async function register(
   payload: registerUserRequestPayload
): Promise<AuthApiResponse> {
   return await fetchWithTimeout(
      `${import.meta.env.VITE_API_URL}/auth/register`,
      {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify(payload),
      }
   );
}

export async function login(
   payload: registerUserRequestPayload
): Promise<AuthApiResponse> {
   return await fetchWithTimeout(`${import.meta.env.VITE_API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(payload),
   });
}

export async function logOut(token: string) {
   return await fetchWithTimeout(
      `${import.meta.env.VITE_API_URL}/auth/logout`,
      {
         method: 'GET',
         credentials: 'include',
         headers: { Authorization: `Bearer ${token}` },
      }
   );
}

export async function refreshAccess(): Promise<AuthApiResponse> {
   return await fetchWithTimeout(
      `${import.meta.env.VITE_API_URL}/auth/refresh`,
      {
         method: 'GET',
         credentials: 'include',
      }
   );
}

export async function checkAccess(token: string) {
   return await fetchWithTimeout(`${import.meta.env.VITE_API_URL}/auth/check`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
   });
}

export async function getFullDemo() {
   return await fetchWithTimeout(`${import.meta.env.VITE_API_URL}/demo`, {
      method: 'GET',
      credentials: 'include',
   });
}

export async function getBlankDemo() {
   return await fetchWithTimeout(`${import.meta.env.VITE_API_URL}/demo/blank`, {
      method: 'GET',
      credentials: 'include',
   });
}
