import {
    DeleteObjectCommand,
    PutObjectCommand,
    S3Client,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/shared/database/prisma.service';

@Injectable()
export class S3Service {
    private s3: S3Client;
    private bucket: string;

    constructor(
        private configService: ConfigService,
        private prisma: PrismaService,
        private s3Service: S3Service,
    ) {
        this.s3 = new S3Client({
            region: this.configService.get('AWS_REGION'),
            credentials: {
                accessKeyId: this.configService.get('AWS_ACCESS_KEY_ID'),
                secretAccessKey: this.configService.get(
                    'AWS_SECRET_ACCESS_KEY_ID',
                ),
            },
        });
        this.bucket = this.configService.get('AWS_BUCKET_NAME');
    }

    async getPresignedUrl(fileName: string, category: string, contentType: string) {
        try {
          const command = new PutObjectCommand({
            Bucket: this.bucket,
            Key: `${category}/${fileName}`,
            ContentType: contentType,
          });
      
          const url = await getSignedUrl(this.s3, command, { expiresIn: 3600 });
          return url;
        } catch (error) {
          // optionally log or rethrow
          throw new Error('Failed to generate presigned URL');
        }
      }
      
      async deleteFile(key: string) {
        try {
          const command = new DeleteObjectCommand({
            Bucket: this.bucket,
            Key: key,
          });
          await this.s3.send(command);
        } catch (error) {
          throw new Error('Failed to delete file');
        }
      }
      
}
