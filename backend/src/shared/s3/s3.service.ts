import {
    DeleteObjectCommand,
    GetObjectCommand,
    PutObjectCommand,
    S3Client,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Readable } from 'stream';

@Injectable()
export class S3Service {
    private s3: S3Client;
    private bucket: string;

    constructor(private configService: ConfigService) {
        this.s3 = new S3Client({
            region: this.configService.get('aws.region'),
            credentials: {
                accessKeyId: this.configService.get('aws.accessKeyId'),
                secretAccessKey: this.configService.get('aws.secretAccessKey'),
            },
        });
        this.bucket = this.configService.get('aws.bucket');
    }

    async getPresignedUrl(payload: {
        userId: string;
        fileName: string;
        category: string;
        contentType: string;
    }) {
        const { fileName, category, contentType, userId } = payload;
        try {
            const command = new PutObjectCommand({
                Bucket: this.bucket,
                Key: `${userId}/${category}/${fileName}`,
                ContentType: contentType,
            });

            const url = await getSignedUrl(this.s3, command, {
                expiresIn: 3600,
            });
            return url;
        } catch (error) {
            console.log('error', error);
            throw new InternalServerErrorException(
                'Failed to generate presigned URL',
            );
        }
    }

    async getSignedUrlForDownload(key: string) {
        try {
            const command = new GetObjectCommand({
                Bucket: this.bucket,
                Key: key,
            });

            const url = await getSignedUrl(this.s3, command, {
                expiresIn: 3600,
            });
            return { url };
        } catch (error) {
            console.log('error', error);
            throw new InternalServerErrorException(
                'Failed to generate presigned URL for download',
            );
        }
    }

    async uploadAndGetSignedUrl(payload: {
        file: Readable;
        userId: string;
        fileName: string;
        category: string;
        contentType: string;
    }) {
        const { fileName, category, contentType, userId, file } = payload;
        try {
            const key = `${userId}/${category}/${fileName}`;

            const command = new PutObjectCommand({
                Bucket: this.bucket,
                Key: key,
                Body: file,
                ContentType: contentType,
            });

            await this.s3.send(command);

            const getCommand = new GetObjectCommand({
                Bucket: this.bucket,
                Key: key,
            });

            const signedUrl = await getSignedUrl(this.s3, getCommand, {
                expiresIn: 3600,
            });

            return { key, signedUrl };
        } catch (error) {
            console.log('error', error);
            throw new InternalServerErrorException(
                'Failed to upload file and generate signed URL',
            );
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
            console.log('error', error);
            throw new InternalServerErrorException('Failed to delete file');
        }
    }
}
