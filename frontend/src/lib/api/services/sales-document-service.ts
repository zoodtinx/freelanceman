import { fetchProMax } from '@/lib/api/services/helpers/fetch-helper';
import {
   CreateSalesDocumentDto,
   EditSalesDocumentDto,
   SalesDocumentFilterDto,
} from 'freelanceman-common';
import { CreatePdfDto } from 'freelanceman-common/src/schemas';

export async function getSalesDocuments(accessToken: string, filter: SalesDocumentFilterDto) {
   return await fetchProMax({
      accessToken,
      apiEndpoint: 'sales-documents/search',
      method: 'POST',
      model: 'salesDocument',
      requestPayload: filter,
   });
}

export async function getSalesDocument(accessToken: string, id: string) {
   return await fetchProMax({
      accessToken,
      apiEndpoint: `sales-documents/${id}`,
      method: 'GET',
      model: 'salesDocument',
   });
}

export async function createSalesDocument(
   accessToken: string,
   payload: CreateSalesDocumentDto
) {
   return await fetchProMax({
      accessToken,
      apiEndpoint: 'sales-documents',
      method: 'POST',
      model: 'salesDocument',
      requestPayload: payload,
   });
}

export async function editSalesDocument(
   accessToken: string,
   payload: EditSalesDocumentDto
) {
   return await fetchProMax({
      accessToken,
      apiEndpoint: `sales-documents/${payload.id}`,
      method: 'PATCH',
      model: 'salesDocument',
      requestPayload: payload,
   });
}

export async function deleteSalesDocument(accessToken: string, id: string) {
   return await fetchProMax({
      accessToken,
      apiEndpoint: `sales-documents/${id}`,
      method: 'DELETE',
      model: 'salesDocument',
   });
}

export async function createPdf(accessToken: string, payload: CreatePdfDto) {
   return await fetchProMax({
      accessToken,
      apiEndpoint: 'sales-documents/create-pdf',
      method: 'POST',
      model: 'salesDocument',
      requestPayload: payload,
   });
}
