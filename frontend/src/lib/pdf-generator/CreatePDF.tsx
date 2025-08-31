import {
   Page,
   Text,
   View,
   Document,
   PDFDownloadLink,
   PDFViewer,
   Font,
   Image,
} from '@react-pdf/renderer';
import { FilePlus2 } from 'lucide-react';
import { SalesDocumentFindOneResponse } from 'freelanceman-common';
import SvgQuotation from '@/lib/pdf-generator/icons/Quotation';
import { format } from 'date-fns';
import { styles } from '@/lib/pdf-generator/styles';
import SvgInvoice from '@/lib/pdf-generator/icons/Invoice';
import SvgReceipt from '@/lib/pdf-generator/icons/Receipt';
import { cn } from '@/lib/helper/utils';
import { defaultCreateSalesDocumentValue } from '@/components/shared/ui/helpers/constants/default-values';

Font.register({
   family: 'Lexend',
   fonts: [
      { src: '/fonts/Lexend-Bold.woff', fontWeight: 'bold' },
      { src: '/fonts/Lexend-SemiBold.woff', fontWeight: 'semibold' },
      { src: '/fonts/Lexend-Regular.woff', fontWeight: 'normal' },
      { src: '/fonts/Lexend-Medium.woff', fontWeight: 'medium' },
      { src: '/fonts/Lexend-Light.woff', fontWeight: 'light' },
   ],
});

interface InvoiceData {
   invoiceNumber: string;
   date: string;
   clientName: string;
   amount: string;
}

interface QuotationDocumentProps {
   data: SalesDocumentFindOneResponse;
}

const DocumentTemplate: React.FC<QuotationDocumentProps> = ({ data }) => {
   console.log('data', data);

   const issuedAt = format(
      new Date(data.issuedAt ?? new Date().toISOString()),
      'MMMM d, yyyy'
   );

   const header = (() => {
      switch (data.category) {
         case 'quotation':
            return <SvgQuotation height={25} width={134} />;
         case 'invoice':
            return <SvgInvoice height={25} width={115} />;
         case 'receipt':
            return <SvgReceipt height={25} width={103} />;
         default:
            return <SvgQuotation height={25} width={134} />;
      }
   })();

   const subtotal =
      data.items?.reduce((sum, item) => sum + item.rate * item.quantity, 0) ||
      0;

   const discountPercent = data.discountPercent || 0;
   const discountFlat = data.discountFlat || 0;
   const tax = data.tax || 0;

   const discountPercentAmount = (data.discountPercent || 0) * (subtotal / 100);
   const discountAmount = subtotal * (discountPercent / 100) + discountFlat;

   let total = subtotal - discountAmount;

   if (tax > 0) {
      total += total * (tax / 100);
   }

   const taxAmount = total * (tax / 100);

   return (
      <Document>
         <Page size="A4" style={styles.page}>
            <View>
               <View style={styles.header}>
                  <View style={{ textAlign: 'right' }}>
                     <View style={{ flexDirection: 'row' }}>
                        <Text
                           style={{
                              width: '40px',
                              textAlign: 'left',
                              fontWeight: 'semibold',
                           }}
                        >
                           Number:
                        </Text>
                        <Text>{data.number}</Text>
                     </View>
                     <View style={{ flexDirection: 'row' }}>
                        <Text
                           style={{
                              width: '40px',
                              textAlign: 'left',
                              fontWeight: 'semibold',
                           }}
                        >
                           Issued:
                        </Text>
                        <Text>{issuedAt}</Text>
                     </View>
                  </View>
                  <View>{header}</View>
               </View>

               <View
                  style={{
                     flexDirection: 'row',
                     justifyContent: 'space-between',
                     marginBottom: 15,
                  }}
               >
                  <View style={styles.freelancerAddressSection}>
                     <Text style={{ fontWeight: 'semibold' }}>Freelancer</Text>
                     <Text>{data.freelancerName}</Text>
                     <Text style={{ width: '75%' }}>
                        {data.freelancerAddress}
                     </Text>
                     <Text>{data.freelancerPhone}</Text>
                     <Text>{data.freelancerEmail}</Text>
                  </View>
                  <View style={styles.clientAddressSection}>
                     <Text style={{ fontWeight: 'semibold' }}>Client</Text>
                     <Text>{data.clientName}</Text>
                     <Text style={{ width: '75%', textAlign: 'right' }}>
                        {data.clientAddress}
                     </Text>
                     <Text>{data.clientPhone}</Text>
                     <Text>{data.clientOffice}</Text>
                  </View>
               </View>

               <View style={styles.table}>
                  <View style={styles.tableHeader}>
                     <Text style={styles.tableColHeaderDescription}>
                        Description
                     </Text>
                     <Text style={styles.tableColHeader}>Rate</Text>
                     <Text style={styles.tableColHeader}>Quantity</Text>
                     <Text style={styles.tableColHeader}>Total</Text>
                  </View>
                  {data.items.map((item, index) => (
                     <View style={styles.tableRow} key={index}>
                        <View style={styles.tableColDescription}>
                           <Text style={{ fontWeight: 'normal' }}>
                              {item.title}
                           </Text>
                           <Text style={{ color: '#A4A4A4', fontSize: '7' }}>
                              {item.description && item.description}
                           </Text>
                        </View>
                        <Text style={styles.tableCol}>
                           {item.rate
                              .toLocaleString(undefined, {
                                 minimumFractionDigits: 2,
                                 maximumFractionDigits: 2,
                              })
                              .toUpperCase()}
                        </Text>
                        <Text style={styles.tableCol}>{item.quantity}</Text>
                        <Text style={styles.tableCol}>
                           {(item.rate * item.quantity)
                              .toLocaleString(undefined, {
                                 minimumFractionDigits: 2,
                                 maximumFractionDigits: 2,
                              })
                              .toUpperCase()}
                        </Text>
                     </View>
                  ))}
               </View>

               <View style={styles.totalsSection}>
                  {data.note ? (
                     <View style={styles.notes}>
                        <Text style={{ fontSize: '7' }}>Note:</Text>
                        <Text style={{ fontSize: '7' }}>{data.note}</Text>
                     </View>
                  ) : (
                     <View />
                  )}
                  <View style={styles.totalsBox}>
                     <View style={styles.totalsRow}>
                        <Text>Subtotal:</Text>
                        <Text>
                           {(typeof subtotal === 'number' && !isNaN(subtotal)
                              ? subtotal
                              : 0
                           )
                              .toLocaleString(undefined, {
                                 minimumFractionDigits: 2,
                                 maximumFractionDigits: 2,
                              })
                              .toUpperCase()}{' '}
                           {data.currency}
                        </Text>
                     </View>
                     <View style={styles.totalsRow}>
                        <Text>Discount:</Text>
                        <Text>
                           {discountAmount.toLocaleString(undefined, {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                           })}{' '}
                           {data.currency}
                        </Text>
                     </View>
                     <View style={styles.totalsRow}>
                        <Text>Tax:</Text>
                        <Text>
                           ({data.tax}%){' '}
                           {(typeof taxAmount === 'number' && !isNaN(taxAmount)
                              ? taxAmount
                              : 0
                           )
                              .toLocaleString(undefined, {
                                 minimumFractionDigits: 2,
                                 maximumFractionDigits: 2,
                              })
                              .toUpperCase()}{' '}
                           {data.currency}
                        </Text>
                     </View>
                     <View style={styles.totalsRow}>
                        <Text style={{ fontWeight: 'semibold' }}>Total:</Text>
                        <Text style={{ fontWeight: 'semibold' }}>
                           {(typeof total === 'number' && !isNaN(total)
                              ? total
                              : 0
                           )
                              .toLocaleString(undefined, {
                                 minimumFractionDigits: 2,
                                 maximumFractionDigits: 2,
                              })
                              .toUpperCase()}{' '}
                           {data.currency}
                        </Text>
                     </View>
                  </View>
               </View>
            </View>
            <View>
               {data.category !== 'quotation' && <View style={styles.paymentSection}>
                  <Text>
                     Payment will be considered complete once the company has
                     received the full amount.
                  </Text>
                  <Text>Cash / Cheque / Bank Transfer / Credit Card</Text>
                  <View style={styles.flexContainer}>
                     <View style={styles.flexItem}>
                        <Text>Bank</Text>
                        <View style={styles.borderBottom} />
                     </View>
                     <View style={styles.flexItem}>
                        <Text>No.</Text>
                        <View style={styles.borderBottom} />
                     </View>
                     <View style={styles.flexItem}>
                        <Text>Date</Text>
                        <View style={styles.borderBottom} />
                     </View>
                     <View style={styles.flexItem}>
                        <Text>Amount</Text>
                        <View style={styles.borderBottom} />
                     </View>
                  </View>
               </View> }
               <View>
                  <View style={styles.signatureSection}>
                     <View style={styles.column}>
                        <Text style={styles.name}>{data.clientName}</Text>
                        <View style={styles.signatureContainer}>
                           <View style={styles.signatureLineWrapper}>
                              <View style={styles.dashedLine} />
                              <Text style={styles.lineLabel}>Payer</Text>
                           </View>
                           <View style={styles.signatureLineWrapper}>
                              <View style={styles.dashedLine} />
                              <Text style={styles.lineLabel}>Date</Text>
                           </View>
                        </View>
                     </View>
                     <View style={styles.column}>
                        <Text style={{ ...styles.name, textAlign: 'right' }}>
                           {data.freelancerName}
                        </Text>
                        <View style={styles.signatureContainer}>
                           <View style={styles.signatureLineWrapper}>
                              <View style={styles.dashedLine} />
                              <Text style={styles.lineLabel}>Recipient</Text>
                           </View>
                           <View style={styles.signatureLineWrapper}>
                              <View style={styles.dashedLine} />
                              <Text style={styles.lineLabel}>Date</Text>
                           </View>
                        </View>
                     </View>
                  </View>
                  <View style={styles.footer}>
                     <View style={styles.footerTextContainer}>
                        <Text style={styles.footerText}>
                           Created using FreelanceMan
                        </Text>
                        <Image
                           src="https://i.postimg.cc/Qdz9F4Gx/Artboard-1.png"
                           style={styles.logo}
                        />
                     </View>
                  </View>
               </View>
            </View>
         </Page>
      </Document>
   );
};

export const mockQuotationData = {
   id: '0123-4567-89ab-cdef',
   userId: 'user-xyz',
   title: 'Invoice',
   category: 'quotation',
   number: 'Q-2025-001',
   issuedAt: '2025-08-30',
   currency: 'USD',
   projectId: 'project-123',
   referenceNumber: 'REF-9876',
   projectTitle: 'E-commerce Website',
   projectDescription: 'Full website development',
   freelancerName: 'Jane Doe',
   freelancerEmail: 'jane.doe@example.com',
   freelancerPhone: '+1-555-1234',
   freelancerTaxId: 'TA-12345',
   freelancerAddress: '123 Main Street, Anytown, USA 12345',
   clientId: 'client-abcd-efgh-ijkl-mnop',
   clientName: 'ABC Corporation',
   clientTaxId: 'T-98765',
   clientAddress: '456 Business Blvd, City, Country',
   clientPhone: '+1-555-5678',
   clientOffice: 'Main Office',
   clientDetail: 'Contact: John Smith',
   discount: 25,
   tax: 50,
   discountPercent: 0,
   discountFlat: 25,
   total: 1525,
   note: 'This quotation is valid for 30 days from the issued date. All prices are in USD.',
   createdAt: '2025-08-30',
   items: [
      {
         title: 'Design Services',
         rate: 1000,
         quantity: 1,
         description: 'Website design and wireframing.',
      },
      {
         title: 'Consultation',
         rate: 500,
         quantity: 1,
         description: 'Project management and strategy meetings.',
      },
   ],
};

export const ViewerComponent = () => {
   const invoiceData = {
      invoiceNumber: 'INV-001',
      date: '2025-08-30',
      clientName: 'Acme Corp.',
      amount: '500.00',
   };

   return (
      <div style={{ width: '100%', height: '100vh' }}>
         <PDFViewer style={{ width: '100%', height: '100%' }}>
            <DocumentTemplate data={mockQuotationData} />
         </PDFViewer>
      </div>
   );
};

interface CreatePDFButtonProps {
   enable: boolean;
   data: SalesDocumentFindOneResponse;
}

const CreatePDFButton = ({ data, enable }: CreatePDFButtonProps) => {
   const isEmptyObject =
      data && Object.keys(data).length === 0 && data.constructor === Object;
   const pdfData = isEmptyObject ? defaultCreateSalesDocumentValue : data;

   return (
      <PDFDownloadLink
         document={<DocumentTemplate data={pdfData} />}
         fileName="invoice.pdf"
         className={cn(
            'bg-primary rounded-md text-foreground font-medium px-2 flex items-center gap-1 active:ring-1',
            'active:ring-2 ring-offset-2 ring-primary ring-offset-background',
            !enable && 'bg-tertiary text-secondary'
         )}
      >
         <FilePlus2 className="w-4 h-4" />
         <p>Create PDF</p>
      </PDFDownloadLink>
   );
};

export default CreatePDFButton;
