import { PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import {
    BadRequestException,
    Injectable,
    InternalServerErrorException,
    NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/shared/database/prisma.service';
import { S3Service } from 'src/shared/s3/s3.service';
import {
    CreateFileDto,
    GetPresignedUrlDto,
    SearchFileDto,
    UpdateFileDto,
} from 'src/shared/zod-schemas/file.schema';

@Injectable()
export class FilesService {
    constructor(
        private prisma: PrismaService,
        private configService: ConfigService,
        private s3Service: S3Service,
    ) {}

    async create(userId: string, dto: CreateFileDto) {
        try {
            return await this.prisma.file.create({
                data: {
                    originalName: dto.originalName,
                    displayName: dto.displayName,
                    type: dto.type,
                    category: dto.category,
                    link: dto.link,
                    projectId: dto.projectId,
                    clientId: dto.clientId,
                    size: dto.size,
                    userId,
                },
            });
        } catch (error) {
            if (
                error instanceof Prisma.PrismaClientKnownRequestError &&
                error.code === 'P2002'
            ) {
                throw new BadRequestException('Duplicate file');
            }
            throw new InternalServerErrorException('Failed to create file');
        }
    }

    async getUploadUrl(getPresignedUrlDto: GetPresignedUrlDto) {
        const { fileName, category, contentType } = getPresignedUrlDto;

        try {
            const presignedUrl = await this.s3Service.getPresignedUrl(
                fileName,
                category,
                contentType,
            );
            return presignedUrl;
        } catch (error) {
            throw new Error('Failed to get upload URL');
        }
    }

    async findMany(userId: string, filter: SearchFileDto) {
        try {
            return await this.prisma.file.findMany({
                where: {
                    userId,
                    displayName: filter.displayName
                        ? {
                              contains: filter.displayName,
                              mode: 'insensitive',
                          }
                        : undefined,
                    type: filter.type,
                    category: filter.category,
                    clientId: filter.clientId,
                    projectId: filter.projectId,
                },
            });
        } catch {
            throw new InternalServerErrorException('Failed to find files');
        }
    }

    async findOne(userId: string, fileId: string) {
        try {
            const file = await this.prisma.file.findUnique({
                where: { id: fileId, userId },
            });
            if (!file)
                throw new NotFoundException(`File with ID ${fileId} not found`);
            return file;
        } catch (error) {
            if (error instanceof NotFoundException) throw error;
            throw new InternalServerErrorException('Failed to find file');
        }
    }

    async update(userId: string, fileId: string, dto: UpdateFileDto) {
        try {
            return await this.prisma.file.update({
                where: { id: fileId, userId },
                data: dto,
            });
        } catch (error) {
            if (
                error instanceof Prisma.PrismaClientKnownRequestError &&
                error.code === 'P2025'
            ) {
                throw new BadRequestException(
                    `File with ID ${fileId} not found`,
                );
            }
            throw new InternalServerErrorException('Failed to update file');
        }
    }

    async delete(userId: string, fileId: string) {
        try {
            const result = await this.prisma.file.findUnique({
                where: { id: fileId, userId: userId },
                select: { s3Key: true },
            });

            await this.s3Service.deleteFile(result.s3Key);

            return await this.prisma.file.delete({
                where: { id: fileId, userId },
            });
        } catch (error) {
            if (
                error instanceof Prisma.PrismaClientKnownRequestError &&
                error.code === 'P2025'
            ) {
                throw new BadRequestException(
                    `File with ID ${fileId} not found`,
                );
            }
            throw new InternalServerErrorException('Failed to delete file');
        }
    }
}
