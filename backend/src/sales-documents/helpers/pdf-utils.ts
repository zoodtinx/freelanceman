import puppeteer from 'puppeteer';
import { readFileSync } from 'fs';
import { join, resolve, basename } from 'path';
import { Buffer } from 'buffer';

// export async function generatePDFBuffer(
//     data: CreateSalesDocumentDto,
// ): Promise<Buffer> {
//     return new Promise((resolve, reject) => {
//         const doc = new PDFDocument({ margin: 50 });
//         const chunks: Uint8Array[] = [];

//         doc.on('data', (chunk) => chunks.push(chunk));
//         doc.on('end', () => resolve(Buffer.concat(chunks)));
//         doc.on('error', reject);

//         // PDF Content Generation
//         doc.fontSize(20).text(data.title, { align: 'center' });
//         doc.moveDown();

//         doc.fontSize(12);
//         doc.text(`Category: ${data.category}`);
//         doc.text(`Document No.: ${data.number}`);
//         doc.text(`Issued At: ${new Date(data.issuedAt).toLocaleDateString()}`);
//         doc.text(`Currency: ${data.currency}`);
//         doc.moveDown();

//         doc.text(`Project ID: ${data.projectId}`);
//         doc.text(`Reference Number: ${data.referenceNumber}`);
//         doc.text(`Project Description: ${data.projectDescription}`);
//         doc.moveDown();

//         doc.text(`Freelancer: ${data.freelancerName}`);
//         doc.text(`Email: ${data.freelancerEmail}`);
//         doc.text(`Phone: ${data.freelancerPhone}`);
//         doc.text(`Tax ID: ${data.freelancerTaxId}`);
//         doc.moveDown();

//         doc.text(`Client: ${data.clientName}`);
//         doc.text(`Tax ID: ${data.clientTaxId}`);
//         if (data.clientAddress) doc.text(`Address: ${data.clientAddress}`);
//         if (data.clientPhone) doc.text(`Phone: ${data.clientPhone}`);
//         if (data.clientOffice) doc.text(`Office: ${data.clientOffice}`);
//         if (data.clientDetail) doc.text(`Details: ${data.clientDetail}`);
//         doc.moveDown();

//         doc.text(`Tax: ${data.tax.toFixed(2)} ${data.currency}`);
//         doc.moveDown();

//         if (data.note) doc.text(`Note: ${data.note}`);

//         doc.end();
//     });
// }

export async function generatePDFBuffer(): Promise<Buffer> {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    

    const filePath = join(__dirname, 'template.html');
    console.log('filePath', filePath)
    const htmlContent = readFileSync(filePath, 'utf8');

    await page.setContent(htmlContent);

    const pdfBuffer = Buffer.from(await page.pdf({ format: 'A4', printBackground: true }));

    await browser.close();

    return pdfBuffer;
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw error;
  }
}
