import { fetchProMax } from '@/lib/api/services/helpers/fetch-helper';
import { FileSearchOption } from '@types';

export async function getFiles(
   accessToken: string,
   filter: FileSearchOption
) {
   return await fetchProMax({
      accessToken,
      apiEndpoint: 'files/search',
      method: 'POST',
      model: 'file',
      requestPayload: filter,
   });
}

export async function getFile(accessToken: string, fileId: string) {
   return await fetchProMax({
      accessToken,
      apiEndpoint: `partner-contacts/${fileId}`,
      method: 'GET',
      model: 'client',
   });
}
