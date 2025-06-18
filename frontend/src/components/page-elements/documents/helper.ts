import {
   CreateSalesDocumentDto,
   EditSalesDocumentDto,
} from 'freelanceman-common';

export const getCreateSalesDocumentPayload = (
   data: any
): CreateSalesDocumentDto => {
   return {
      category: data.category,
      issuedAt: data.issuedAt,
      projectId: data.projectId,
      freelancerName: data.freelancerName,
      clientId: data.clientId,
      clientName: data.clientName,
      items: data.items,

      projectTitle: data.projectTitle,
      number: data.number,
      currency: data.currency,
      referenceNumber: data.referenceNumber,
      projectDescription: data.projectDescription,

      freelancerEmail: data.freelancerEmail,
      freelancerPhone: data.freelancerPhone,
      freelancerTaxId: data.freelancerTaxId,
      freelancerAddress: data.freelancerAddress,

      clientTaxId: data.clientTaxId,
      clientAddress: data.clientAddress,
      clientPhone: data.clientPhone,
      clientOffice: data.clientOffice,
      clientDetail: data.clientDetail,

      tax: Number(data.tax),
      discountPercent: Number(data.discountPercent),
      discountFlat: Number(data.discountFlat),

      note: data.note,
   };
};

export const getEditSalesDocumentPayload = (
   data: any
): EditSalesDocumentDto => {
   return {
      id: data.id,
      category: data.category,
      issuedAt: data.issuedAt,
      projectId: data.projectId,
      freelancerName: data.freelancerName,
      clientId: data.clientId,
      clientName: data.clientName,
      items: data.items,

      title: data.title,
      number: data.number,
      currency: data.currency,
      referenceNumber: data.referenceNumber,
      projectDescription: data.projectDescription,

      freelancerEmail: data.freelancerEmail,
      freelancerPhone: data.freelancerPhone,
      freelancerTaxId: data.freelancerTaxId,
      freelancerAddress: data.freelancerAddress,

      clientTaxId: data.clientTaxId,
      clientAddress: data.clientAddress,
      clientPhone: data.clientPhone,
      clientOffice: data.clientOffice,
      clientDetail: data.clientDetail,

      tax: Number(data.tax),
      discountPercent: Number(data.discountPercent),
      discountFlat: Number(data.discountFlat),

      note: data.note,
   };
};

export function camelToSentenceCase(input: string): string {
   return input
      .replace(/([a-z])([A-Z])/g, '$1 $2')
      .toLowerCase()
      .replace(/^\w/, (char) => char.toUpperCase());
}

export function camelToLowerCase(input: string): string {
   return input
      .replace(/([A-Z])/g, ' $1')
      .toLowerCase()
      .trim();
}
