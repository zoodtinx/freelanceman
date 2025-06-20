interface AuthApiResponse {
   success: boolean;
   data: {
      accessToken: string
      user: any
   };
}

interface registerUserRequestPayload {
   email: string;
   password: string;
}


export async function register(
   payload: registerUserRequestPayload
): Promise<AuthApiResponse> {
   const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/register`, {
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
   const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
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
   const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/logout`, {
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
   console.log('import.meta.env.VITE_API_URL', import.meta.env.VITE_API_URL)
   const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/refresh`, {
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
   const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/check`, {
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

export async function getFullDemo() {
   const res = await fetch(`${import.meta.env.VITE_API_URL}/demo`, {
      method: 'GET',
      credentials: 'include',
   });

   console.log('Response Headers:', Array.from(res.headers.entries()));

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

export async function getBlankDemo() {
   const res = await fetch(`${import.meta.env.VITE_API_URL}/demo/blank`, {
      method: 'GET',
      credentials: 'include',
   });

   console.log('Response Headers:', Array.from(res.headers.entries()));

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

// export async function googleSignIn() {
//    const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/google`, {
//       method: 'GET',
//       credentials: 'include',
//    });

//    console.log('Response Headers:', Array.from(res.headers.entries()));

//    if (!res.ok) {
//       return {
//          success: false,
//          data: await res.json(),
//       };
//    }

//    return {
//       success: true,
//       data: await res.json(),
//    };
// }