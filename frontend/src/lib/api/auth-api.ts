interface AuthApiResponse {
   success: boolean;
   data: {
      accessToken: string
   };
}

interface registerUserRequestPayload {
   email: string;
   password: string;
}

interface RegisterUserResponsePayload {
   accessToken: string;
   user: any;
}

export async function register(
   payload: registerUserRequestPayload
): Promise<AuthApiResponse> {
   const res = await fetch(`${import.meta.env.VITE_API_URL}auth/register`, {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
   });

   return {
      success: true,
      data: await res.json(),
   };
}

export async function login(
   payload: registerUserRequestPayload
): Promise<AuthApiResponse> {
   const res = await fetch(`${import.meta.env.VITE_API_URL}auth/login`, {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(payload),
   });

   if (!res.ok) {
      throw new Error('Session expired');
   }

   return {
      success: true,
      data: await res.json(),
   };
}

export async function logOut(token: string) {
   const res = await fetch(`${import.meta.env.VITE_API_URL}auth/logout`, {
      method: 'GET',
      credentials: 'include',
      headers: {
         Authorization: `Bearer ${token}`,
      },
   });

   if (!res.ok) {
      throw new Error('Error signing out');
   }

   return {
      success: true
   };
}

export async function refreshAccess(): Promise<AuthApiResponse> {
   const res = await fetch(`${import.meta.env.VITE_API_URL}auth/refresh`, {
      method: 'GET',
      credentials: 'include',
   });

   if (!res.ok) {
      return {
         success: false,
         data: await res.json(),
      };
   }

   return {
      success: true,
      data: await res.json(),
   };
}

export async function checkAccess(token: string) {
   const res = await fetch(`${import.meta.env.VITE_API_URL}auth/check`, {
      method: 'GET',
      headers: {
         Authorization: `Bearer ${token}`,
      },
   });

   if (!res.ok) {
      return {
         success: false,
         data: await res.json(),
      };
   }

   return {
      success: true,
      data: await res.json(),
   };
}
