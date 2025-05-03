import { fetchProMax } from "@/lib/api/services/helpers/fetch-helper";


export async function getUser(accessToken: string) {
    return await fetchProMax({
         accessToken,
         apiEndpoint: 'users',
         method: 'GET',
         model: 'user',
      });
}

export async function editUser(accessToken: string, payload: any) {}

export async function deleteUser(accessToken: string, userId: string) {}
