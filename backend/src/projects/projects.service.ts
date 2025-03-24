import {
    Injectable,
    BadRequestException,
    InternalServerErrorException,
    NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/shared/database/prisma.service';
import { Prisma } from '@prisma/client';
import {
    SearchProjectDto,
    CreateProjectDto,
    UpdateProjectDto,
} from 'src/shared/zod-schemas/project.schema';

@Injectable()
export class ProjectsService {
    constructor(private prismaService: PrismaService) {}

    async create(userId: string, createProjectDto: any) {
        try {
            const result = await this.prismaService.project.create({
                data: {
                    ...createProjectDto,
                    userId,
                },
            });
            return result;
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new BadRequestException(
                        'A project with this unique field already exists',
                    );
                }
            }

            throw new InternalServerErrorException('Failed to create project');
        }
    }

    async findMany(userId: string, filter: SearchProjectDto) {
        try {
            const projects = await this.prismaService.project.findMany({
                where: {
                    userId,
                    title: filter.title
                        ? { contains: filter.title, mode: 'insensitive' }
                        : undefined,
                    projectStatus: filter.projectStatus || undefined,
                    paymentStatus: filter.paymentStatus || undefined,
                    pinned: filter.pinned,
                    id: filter.projectId || undefined,
                    clientId: filter.clientId || undefined,
                    events: filter.eventId
                        ? { some: { id: filter.eventId } }
                        : undefined,
                    tasks: filter.taskId
                        ? { some: { id: filter.taskId } }
                        : undefined,
                    clientContacts: filter.contactId
                        ? { some: { clientContactId: filter.contactId } }
                        : undefined,
                    partnerContacts: filter.partnerId
                        ? { some: { partnerContactId: filter.partnerId } }
                        : undefined,
                },
            });

            return projects;
        } catch {
            throw new InternalServerErrorException('Failed to find projects');
        }
    }

    async findOne(userId: string, projectId: string) {
        try {
            const project = await this.prismaService.project.findUnique({
                where: { id: projectId, userId },
            });

            if (!project) {
                throw new NotFoundException(
                    `Project with ID ${projectId} not found`,
                );
            }

            return project;
        } catch (error) {
            if (error instanceof NotFoundException) throw error;
            throw new InternalServerErrorException('Failed to find project');
        }
    }

    async update(
        userId: string,
        projectId: string,
        updateDto: UpdateProjectDto,
    ) {
        try {
            const result = await this.prismaService.project.update({
                where: { id: projectId, userId },
                data: updateDto,
            });
            return result;
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2025') {
                    throw new BadRequestException(
                        `Project with ID ${projectId} not found`,
                    );
                }
            }
            throw new InternalServerErrorException('Failed to update project');
        }
    }

    async remove(userId: string, projectId: string) {
        try {
            const result = await this.prismaService.project.delete({
                where: { id: projectId, userId },
            });
            return result;
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2025') {
                    throw new BadRequestException(
                        `Project with ID ${projectId} not found`,
                    );
                }
            }
            throw new InternalServerErrorException('Failed to remove project');
        }
    }
}
