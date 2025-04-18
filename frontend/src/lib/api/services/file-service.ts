import { fetchProMax } from '@/lib/api/services/helpers/fetch-helper';
import { CreateFileDto, EditFileDto, FileFilterDto } from 'freelanceman-common';

export async function getFiles(accessToken: string, filter: FileFilterDto) {
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

export async function createFile(accessToken: string, payload: CreateFileDto) {}

export async function editFile(accessToken: string, payload: EditFileDto) {}

export async function deleteFile(accessToken: string, fileId: string) {}
