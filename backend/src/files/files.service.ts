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
    FileFilterDto,
    EditFileDto,
} from 'freelanceman-common';

@Injectable()
export class FilesService {
    constructor(
        private prisma: PrismaService,
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
                    s3Key: dto.s3Key,
                    projectId: dto.projectId,
                    clientId: dto.clientId,
                    size: dto.size,
                    userId,
                },
            });
        } catch (error) {
            console.log('error', error)
            if (
                error instanceof Prisma.PrismaClientKnownRequestError &&
                error.code === 'P2002'
            ) {
                throw new BadRequestException('Duplicate file');
            }
            throw new InternalServerErrorException('Failed to create file');
        }
    }

    async findMany(userId: string, filter: FileFilterDto) {
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
                orderBy: {
                    updatedAt: {
                        sort: 'desc'
                    }
                }
            });
        } catch (error) {
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

    async update(userId: string, fileId: string, dto: EditFileDto) {
        console.log('dto', dto)
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
            });

            console.log('result', result)

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
