import { CreateSalesDocumentDto } from '../../shared/zod-schemas/sales-document.schema';
import PDFDocument from 'pdfkit';
import { z } from 'zod';

export function generatePDFStream(data: CreateSalesDocumentDto) {
    const doc = new PDFDocument({ margin: 50 });

    doc.fontSize(20).text(data.title, { align: 'center' });
    doc.moveDown();

    doc.fontSize(12);
    doc.text(`Category: ${data.category}`);
    doc.text(`Document No.: ${data.number}`);
    doc.text(`Issued At: ${new Date(data.issuedAt).toLocaleDateString()}`);
    doc.text(`Currency: ${data.currency}`);
    doc.moveDown();

    doc.text(`Project ID: ${data.projectId}`);
    doc.text(`Reference Number: ${data.referenceNumber}`);
    doc.text(`Project Description: ${data.projectDescription}`);
    doc.moveDown();

    doc.text(`Freelancer: ${data.freelancerName}`);
    doc.text(`Email: ${data.freelancerEmail}`);
    doc.text(`Phone: ${data.freelancerPhone}`);
    doc.text(`Tax ID: ${data.freelancerTaxId}`);
    if (data.freelancerDetail) doc.text(`Details: ${data.freelancerDetail}`);
    doc.moveDown();

    doc.text(`Client: ${data.clientName}`);
    doc.text(`Tax ID: ${data.clientTaxId}`);
    if (data.clientAddress) doc.text(`Address: ${data.clientAddress}`);
    if (data.clientPhone) doc.text(`Phone: ${data.clientPhone}`);
    if (data.clientOffice) doc.text(`Office: ${data.clientOffice}`);
    if (data.clientDetail) doc.text(`Details: ${data.clientDetail}`);
    doc.moveDown();

    doc.text(`Subtotal: ${data.subtotal.toFixed(2)} ${data.currency}`);
    if (data.discount)
        doc.text(`Discount: -${data.discount.toFixed(2)} ${data.currency}`);
    doc.text(`Tax: ${data.tax.toFixed(2)} ${data.currency}`);
    if (data.customAdjustment)
        doc.text(
            `Adjustment: ${data.customAdjustment.toFixed(2)} ${data.currency}`,
        );
    doc.text(`Total: ${data.total.toFixed(2)} ${data.currency}`);
    doc.moveDown();

    if (data.note) doc.text(`Note: ${data.note}`);

    doc.end();
    return doc;
}

