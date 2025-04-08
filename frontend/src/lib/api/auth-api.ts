interface registerUserPayload {
   email: string;
   password: string;
}

export async function registerUser(payload: registerUserPayload) {
   const res = await fetch(`${import.meta.env.VITE_API_URL}auth/register`, {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json',
       },       
      body: JSON.stringify(payload),
   });

   return res.json();
}
