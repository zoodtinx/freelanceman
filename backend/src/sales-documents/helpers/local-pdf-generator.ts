import puppeteer from 'puppeteer';
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { CreatePdfDto } from 'freelanceman-common';
import { getTimezonedDateFromISOString } from '../../shared/helper/timezoned-date';

export async function generatePDF(
    data: CreatePdfDto,
    outputPath: string,
): Promise<void> {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    const cssPath = join(__dirname, 'output.css');

    const normalFontData = readFileSync(
        join(__dirname, './fonts/Inter_18pt-Regular.ttf'),
    ).toString('base64');
    const mediumFontData = readFileSync(
        join(__dirname, './fonts/Inter_18pt-Medium.ttf'),
    ).toString('base64');
    const semiBoldFontData = readFileSync(
        join(__dirname, './fonts/Inter_18pt-SemiBold.ttf'),
    ).toString('base64');

    const cssContent = readFileSync(cssPath, 'utf8');

    await page.setContent(getHtml(data));

    await page.addStyleTag({
        content: `
      @font-face {
        font-family: 'Lexend';
        src: url(data:font/ttf;base64,${normalFontData}) format("truetype");
        font-weight: normal;
        font-style: normal;
      }
      @font-face {
        font-family: 'Lexend';
        src: url(data:font/ttf;base64,${mediumFontData}) format("truetype");
        font-weight: 500;
        font-style: normal;
      }
      @font-face {
        font-family: 'Lexend';
        src: url(data:font/ttf;base64,${semiBoldFontData}) format("truetype");
        font-weight: 600;
        font-style: normal;
      }
    `,
    });

    await page.addStyleTag({ content: cssContent });

    await page.pdf({
        path: outputPath,
        format: 'A4',
        printBackground: true,
    });

    await browser.close();
}

function getHtml(data: CreatePdfDto) {
    const date = getTimezonedDateFromISOString(data.issuedAt);

    const currency = data.currency ?? 'THB';

    const itemsHtml = data.items
        .map(
            (item, index) => `
        <tr>
          <td class="border-b px-2 py-1 text-center w-3">${index + 1}</td>
          <td class="border-b px-2 py-2">
            <p>${item.title}</p>
            ${
                item.description
                    ? `<p class="text-[11px] text-gray-400">${item.description}</p>`
                    : ''
            }
          </td>
          <td class="border-b px-2 py-1 text-right">${item.quantity.toLocaleString()}</td>
          <td class="border-b px-2 py-1 text-right">${item.rate.toLocaleString()}</td>
          <td class="border-b px-2 py-1 text-right">${
              (item.quantity * item.rate).toLocaleString()
          }</td>
        </tr>
      `,
        )
        .join('');

    const subtotal = data.items.reduce(
        (acc, item) => acc + item.quantity * item.rate,
        0,
    );

    const discount =
        data.discountFlat ??
        (data.discountPercent ? (subtotal * data.discountPercent) / 100 : 0);

    const tax = data.tax ? ((subtotal - discount) * data.tax) / 100 : 0;

    const total = subtotal - discount + tax;

    const subtotalFormatted = subtotal.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });
    const discountFormatted = discount.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });
    const taxFormatted = tax.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });
    const totalFormatted = total.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });

    console.log('discountFormatted', discountFormatted);

    const conditionField =
        data.category !== 'quotation'
            ? `<div>
            <p>Payment will be considered complete once the company has received the full amount.</p>
            <p>Cash / Cheque / Bank Transfer / Credit Card</p>
            <div class="flex w-full py-4 pb-5 gap-1">
               <div class="flex flex-1 grow gap-1">
                  <span>Bank</span>
                  <div class="border-b grow" style="margin: 0.25rem;"></div>
               </div>
               <div class="flex flex-1 grow gap-1">
                  <span>No.</span>
                  <div class="border-b grow" style="margin: 0.25rem;"></div>
               </div>
               <div class="flex flex-1 grow gap-1">
                  <span>Date</span>
                  <div class="border-b grow" style="margin: 0.25rem;"></div>
               </div>
               <div class="flex flex-1 grow gap-1">
                  <span>Amount</span>
                  <div class="border-b grow" style="margin: 0.25rem;"></div>
               </div>
            </div>
         </div>`
            : '';

    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <style>
        body {
          width: 210mm;
          max-width: 210mm;
          height: 297mm;
          margin: 0 auto;
        }
      </style>
    </head>
    <body class="flex flex-col justify-between font-sans border text-[12px] font-normal text-gray-800 bg-white relative">
      <div class="flex flex-col justify-between grow p-8">
        <div class="flex flex-col">
          <div class="flex justify-between mb-6">
            <div class="flex flex-col gap-3 justify-between w-3/4">
              <section class="max-w-1/3">
                <h2 class="font-semibold">Issued By</h2>
                <p>${data.freelancerName}</p>
                ${
                    data.freelancerPhone
                        ? `<p>Tel: <span>${data.freelancerPhone}</span></p>`
                        : ''
                }
                ${
                    data.freelancerAddress
                        ? `<p class="w-2/3">${data.freelancerAddress}</p>`
                        : ''
                }
                ${
                    data.freelancerTaxId
                        ? `<p>Tax ID: <span>${data.freelancerTaxId}</span></p>`
                        : ''
                }
              </section>
              <section class="max-w-1/3">
                <h2 class="font-semibold">Client Information</h2>
                <p>${data.clientName}</p>
                ${
                    data.clientAddress
                        ? `<p class="w-2/3">${data.clientAddress}</p>`
                        : ''
                }
                ${
                    data.clientTaxId
                        ? `<p>Tax ID: <span>${data.clientTaxId}</span></p>`
                        : ''
                }
              </section>
            </div>
            <header class="flex flex-col justify-between items-end w-1/4">
              <h1 class="text-[27px] text-right font-medium text-gray-500 border-[1.5px] border-gray-300 px-4 rounded-xl justify-center w-fit">
                ${data.category.charAt(0).toUpperCase() + data.category.slice(1)}
              </h1>
              <div class="flex flex-col items-end">
                ${data.number ? `<p class="mt-1">No: ${data.number}</p>` : ''}
                <p class="mt-1">Issued: ${date}</p>
              </div>
            </header>
          </div>

          <table class="mb-6 w-full border-collapse">
            <thead>
              <tr class="bg-gray-200">
                <th class="pl-3 py-1 text-left w-[5px] rounded-tl-lg rounded-bl-lg">No.</th>
                <th class="px-3 py-1 text-left w-1/2">Item</th>
                <th class="px-2 py-1 text-right">Quantity</th>
                <th class="px-2 py-1 text-right">Rate</th>
                <th class="px-3 py-1 text-right rounded-tr-lg rounded-br-lg">Total</th>
              </tr>
            </thead>
            <tbody>
            ${itemsHtml}
            </tbody>
          </table>

          <div class="flex flex-col items-end w-full">
            <div class="flex">
              <p class="text-[11px]">Subtotal:</p>
              <p class="w-[120px] justify-between text-right">${subtotalFormatted} <span class="text-[11px]">${currency}</span></p>
            </div>
            ${
                Number(discountFormatted) !== 0
                    ? `<div class="flex">
              <p class="text-[11px]">Discount:</p>
              <p class="w-[120px] justify-between text-right">${discountFormatted} <span class="text-[11px]">${currency}</span></p>
            </div>`
                    : ''
            }
            ${
                Number(discountFormatted) !== 0
                    ? `<div class="flex">
              <p class="text-[11px]">Tax:</p>
              <p class="w-[120px] justify-between text-right">${taxFormatted} <span class="text-[11px]">${currency}</span></p>
            </div>`
                    : ''
            }
            <div class="flex">
              <p class="text-[11px]">Total:</p>
              <p class="w-[120px] justify-between text-right">${totalFormatted} <span class="text-[11px]">${currency}</span></p>
            </div>
          </div>
        </div>
        <div class="">
        ${
            data.note
                ? `<div style="padding-bottom: 1.25rem;" class="flex flex-col"><p>Note:</p><p class="w-full">${data.note}</p></div>`
                : ''
        }   
        ${conditionField}
        <div class="flex justify-between" style="padding-bottom: 1rem;">
            <div class="flex flex-col w-2/5">
               <p>${data.clientName}</p>
               <div class="flex grow gap-3">
                  <div class="flex-col flex-1">
                     <div class="h-16 border-b border-dashed">
                     </div>
                     <p class="text-center mt-1">Payer</p>
                  </div>
                  <div class="flex-col flex-1">
                     <div class="h-16 border-b border-dashed">
                     </div>
                     <p class="text-center mt-1">Date</p>
                  </div>
               </div>
            </div>
            <div class="flex flex-col w-2/5">
               <p class="text-right">${data.freelancerName}</p>
               <div class="flex grow gap-3">
                  <div class="flex-col flex-1">
                     <div class="h-16 border-b border-dashed">
                     </div>
                     <p class="text-center mt-1">Recipient</p>
                  </div>
                  <div class="flex-col flex-1">
                     <div class="h-16 border-b border-dashed">
                     </div>
                     <p class="text-center mt-1">Date</p>
                  </div>
               </div>
            </div>
         </div>
         <div class="flex justify-between w-full text-gray-400" >
            <div></div>
            <div class="flex items-center gap-1">
               <p class="text-[11px]">Created using FreelanceMan</p>
               <img src="https://i.postimg.cc/Qdz9F4Gx/Artboard-1.png" alt="" srcset="" style="width: 1.75rem;">
            </div>
         </div>
      </div>
   </div>
</body>
</html>
  `;
}
