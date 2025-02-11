import { Currency } from "./misc.type";

export interface SalesDocument {
  id: string; 
  title: string;
  category: 'quotation' | 'invoice' | 'receipt'; 
  
  number: string; 
  issuedAt: string;  
  currency: Currency; 
  
  projectId: string; 
  projectTitle: string;
  referenceNumber: string; 
  projectDescription: string; 
  selectedProjectClientId: string; 

  freelancerName: string; 
  freelancerEmail: string; 
  freelancerPhone: string; 
  freelancerTaxId: string; 
  freelancerDetail?: string; 

  clientId: string; 
  clientName: string; 
  clientTaxId: string; 
  clientAddress?: string; 
  clientPhone?: string; 
  clientOffice?: string; 
  clientDetail?: string; 

  items: SalesDocumentItem[]

  subtotal: number; 
  discount?: number; 
  tax: number; 
  total: number; 
  customAdjustment?: number; 
  note?: string; 

  createdAt: string;
  updatedAt: string;
}

export type CreateSalesDocumentDto = Omit<
  SalesDocument,
  "id" | "createdAt" | "updatedAt"
>;

export type EditSalesDocumentDto = Partial<
  Omit<SalesDocument, "id" | "createdAt" | "updatedAt">
>;

export interface SalesDocumentItem {
   title: string;
   description?: string;
   rate: number;
   quantity: number;
}

export interface SalesDocumentSearchOption {
  id?: string, 
  title?: string;
   clientId?: string;
   projectId?: string;
   category?: "quotation" | "invoice" | "receipt";
}