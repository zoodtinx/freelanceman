import {
    DeleteObjectCommand,
    PutObjectCommand,
    S3Client,
} from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/shared/database/prisma.service';

@Injectable()
export class S3Service {
    constructor(
              private prisma: PrismaService,
              private configService: ConfigService,
              private s3Service: S3Service,
          ) {}

    private s3: S3Client;
    private bucket: string;

    constructor(private config: ConfigService) {
        this.s3 = new S3Client({
            region: this.config.get('AWS_REGION'),
            credentials: {
                accessKeyId: this.config.get('AWS_ACCESS_KEY_ID'),
                secretAccessKey: this.config.get('AWS_SECRET_ACCESS_KEY_ID'),
            },
        });
        this.bucket = this.config.get('AWS_BUCKET_NAME');
    }

    async getPresignedUrl(key: string, body: Buffer, contentType: string) {
        const command = new PutObjectCommand({
            Bucket: this.bucket,
            Key: key,
            ContentType: contentType,
        });



        return `https://${this.bucket}.s3.amazonaws.com/${key}`;
    }

    async deleteFile(key: string) {
        const command = new DeleteObjectCommand({
            Bucket: this.bucket,
            Key: key,
        });
        await this.s3.send(command);
    }
}
