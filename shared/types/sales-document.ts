import { Currency } from "./misc.type";

export interface SalesDocument {
  id: string; 
  type: 'quotation' | 'invoice' | 'receipt'; 
  
  number: string; 
  issuedAt: string;  
  currency: Currency; 
  
  projectId: string; 
  projectTitle: string;
  referenceNumber: string; 
  projectDescription: string; 

  freelancerName: string; 
  freelancerEmail: string; 
  freelancerPhone: string; 
  freelancerTaxId: string; 
  freelancerDetail: string; 

  clientId: string; 
  clientName: string; 
  clientTaxId: string; 
  clientAddress: string; 
  clientPhone: string; 
  clientOffice: string; 
  clientDetail: string; 

  items: SalesDocumentItem[]

  subtotal: number; 
  discount: number; 
  tax: number; 
  total: number; 
  customAdjustment: number; 
  note: string; 

  createdAt: string;
  updatedAt: string;
}

export type SalesDocumentFormPayload = Omit<SalesDocument, 'id' | 'createdAt' | 'createdAt'>

export interface SalesDocumentItem {
   name: string;
   description: string;
   rate: number;
   quantity: number;
}
