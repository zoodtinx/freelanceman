export interface ProjectPaymentData {
   id: string;
   title: string;
   client: string;
   clientId: string;
   themeColor: string;
   budget: string;
   currency: string;
   paymentStatus: "unpaid" | "processing" | "paid";
   quotation?: SalesDocument;
   invoice?: SalesDocument;
   receipt?: SalesDocument;
   salesDocuments: []
}

export type ProjectPaymentDataFilter = Partial<
   Pick<ProjectPaymentData, "title" | "clientId" | "paymentStatus">
>;

interface SalesDocument {
   id: string;
   fileLink?: string;
}
