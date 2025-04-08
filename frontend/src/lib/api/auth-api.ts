interface AuthApiResponse {
   success: boolean,
   data: any
}

interface registerUserRequestPayload {
   email: string;
   password: string;
}

interface RegisterUserResponsePayload {
   accessToken: string;
   user: any
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

   return res.json();
}

export async function login(
   payload: registerUserRequestPayload
): Promise<AuthApiResponse> {
   const res = await fetch(`${import.meta.env.VITE_API_URL}auth/login`, {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
   });

   if (!res.ok) {
      return {
         success: false,
         data: res.json()
      }
   }

   return {
      success: true,
      data: res.json()
   }
}

