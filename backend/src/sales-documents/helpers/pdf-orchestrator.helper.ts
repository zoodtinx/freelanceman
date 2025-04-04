import { InternalServerErrorException } from '@nestjs/common';
import { generatePDFStream } from 'src/sales-documents/helpers/pdf-utils';
import { Readable } from 'stream';

export class PdfOrchestratorHelper {
    static generatePdfStream(createPdfDto: any): Readable {
        return generatePDFStream(createPdfDto) as unknown as Readable;
    }

    static async uploadToS3(s3Service, pdfStream: Readable, fileName: string) {
        try {
            return await s3Service.uploadAndGetSignedUrl({
                file: pdfStream,
                fileName,
                category: 'sales-document',
                contentType: 'application/pdf',
            });
        } catch (err) {
            console.error('S3 upload error:', err);
            throw new InternalServerErrorException('S3 upload failed');
        }
    }

    static async saveFileRecord(
        fileService,
        userId: string,
        dto: any,
        fileName: string,
        signedUrl: string,
    ) {
        try {
            return await fileService.create(userId, {
                originalName: `${dto.number}.pdf`,
                displayName: fileName,
                type: 'application/pdf',
                category: 'sales-document',
                link: signedUrl,
                projectId: dto.projectId,
                clientId: dto.clientId,
            });
        } catch (err) {
            console.error('Prisma (file create) error:', err);
            throw new InternalServerErrorException('Database error');
        }
    }
}
