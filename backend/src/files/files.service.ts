import {
    BadRequestException,
    Injectable,
    InternalServerErrorException,
    NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { S3Service } from 'src/shared/s3/s3.service';
import { CreateFileDto, FileFilterDto, EditFileDto } from 'freelanceman-common';
import { PrismaService } from '@/shared/database/prisma.service';

@Injectable()
export class FilesService {
    constructor(
        private prisma: PrismaService,
        private s3Service: S3Service,
    ) {}

    async create(userId: string, createFileDto: CreateFileDto) {
        const { projectId, ...fileData } = createFileDto;

        let project;
        if (projectId) {
            project = await this.prisma.project.findUnique({
                where: { id: projectId },
                select: {
                    id: true,
                    client: { select: { id: true } },
                },
            });
        }

        try {
            return await this.prisma.file.create({
                data: {
                    ...fileData,
                    project: project?.id
                        ? { connect: { id: project.id } }
                        : undefined,
                    client: project?.client?.id
                        ? { connect: { id: project.client.id } }
                        : undefined,
                    user: { connect: { id: userId } },
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

    async findMany(userId: string, filter: FileFilterDto) {
        try {
            const where = {
                userId,
                name: filter.name
                    ? {
                          contains: filter.name,
                          mode: 'insensitive' as const,
                      }
                    : undefined,
                type: filter.type,
                category: filter.category,
                clientId: filter.clientId,
                projectId: filter.projectId,
            };

            const [unfilteredTotal, total, items] = await Promise.all([
                this.prisma.file.count({where: {userId}}),
                this.prisma.file.count({ where }),
                this.prisma.file.findMany({
                    where,
                    take: filter.take ? filter.take : 30,
                    include: {
                        client: {
                            select: {
                                id: true,
                                name: true,
                                themeColor: true,
                            },
                        },
                        project: {
                            select: {
                                id: true,
                                name: true,
                            },
                        },
                    },
                    orderBy: {
                        updatedAt: 'desc',
                    },
                }),
            ]);

            return { items, total,unfilteredTotal };
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

    async update(userId: string, fileId: string, dto: EditFileDto) {
        console.log('dto', dto);
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
            const file = await this.prisma.file.findUnique({
                where: { id: fileId, userId: userId },
            });

            if (!file) {
                throw new Error();
            }

            if (file.s3Key) {
                await this.s3Service.deleteFile(file.s3Key);
            }

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

    async deleteMany(userId: string, fileIds: string[]) {
        try {
            const files = await this.prisma.file.findMany({
                where: {
                    id: { in: fileIds },
                    userId,
                },
            });

            console.log('files', files);

            if (files.length !== fileIds.length) {
                throw new BadRequestException('Some files were not found');
            }

            const s3Keys = files
                .map((file) => file.s3Key)
                .filter((key) => key !== null);

            if (s3Keys.length !== 0) {
                await Promise.all(
                    s3Keys.map((key) => this.s3Service.deleteFile(key)),
                );
            }

            return await this.prisma.file.deleteMany({
                where: {
                    id: { in: fileIds },
                    userId,
                },
            });
        } catch (error) {
            console.log('error', error);
            throw new InternalServerErrorException('Failed to delete files');
        }
    }
}
