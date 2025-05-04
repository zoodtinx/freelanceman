import { fetchProMax } from '@/lib/api/services/helpers/fetch-helper';
import { CreateFileDto, EditFileDto, FileFilterDto, GetPresignedUrlDto } from 'freelanceman-common';

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
      model: 'file',
   });
}

export async function createFile(accessToken: string, payload: CreateFileDto) {
   return await fetchProMax({
      accessToken,
      apiEndpoint: 'files',
      method: 'POST',
      model: 'file',
      requestPayload: payload,
   });
}

export async function editFile(accessToken: string, payload: EditFileDto) {
   return await fetchProMax({
      accessToken,
      apiEndpoint: `files/${payload.id}`,
      method: 'PATCH',
      model: 'file',
      requestPayload: payload,
   });
}

export async function deleteFile(accessToken: string, fileId: string) {
   return await fetchProMax({
      accessToken,
      apiEndpoint: `files/${fileId}`,
      method: 'DELETE',
      model: 'file',
   });
}

export async function getFileUrl(accessToken: string, fileKey: string) {
   return await fetchProMax({
      accessToken,
      apiEndpoint: `files/url`,
      requestPayload: {key: fileKey},
      method: 'POST',
      model: 'fileUrl',
   });
}

export async function getPresignedUrl(accessToken: string, payload: GetPresignedUrlDto) {
   return await fetchProMax({
      accessToken,
      apiEndpoint: `files/presign`,
      requestPayload: payload,
      method: 'POST',
      model: 'presignedUrl',
   });
}