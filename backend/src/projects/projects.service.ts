import {
    Injectable,
    BadRequestException,
    InternalServerErrorException,
    NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/shared/database/prisma.service';
import { Prisma } from '@prisma/client';
import { ProjectFilterDto, EditProjectDto } from 'freelanceman-common';
import { getTimezonedDate } from '@/shared/helper/timezoned-date';

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

    async findSelections(userId: string, filter: ProjectFilterDto) {
        console.log('trigged');
        try {
            const projects = await this.prismaService.project.findMany({
                where: {
                    userId,
                    projectStatus: 'active',
                    title: filter.title
                        ? { contains: filter.title, mode: 'insensitive' }
                        : undefined,
                },
                include: {
                    client: {
                        select: {
                            themeColor: true,
                        },
                    },
                },
            });
            return projects.map((project) => ({
                label: project.title,
                value: project.id,
            }));
        } catch {
            throw new InternalServerErrorException('Failed to find projects');
        }
    }

    async findMany(userId: string, filter: ProjectFilterDto) {
        const date = getTimezonedDate()
        
        try {
            const where = {
                userId,
                title: filter.title
                    ? { contains: filter.title, mode: 'insensitive' as const }
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
            };

            const [total, items] = await Promise.all([
                this.prismaService.project.count({ where }),
                this.prismaService.project.findMany({
                    where,
                    include: {
                        client: {
                            select: {
                                id: true,
                                name: true,
                                themeColor: true,
                            },
                        },
                        tasks: {
                            orderBy: { dueAt: 'asc' },
                            take: 1,
                            where: { dueAt: { gte: date } },
                            include: {
                                project: { select: { id: true, title: true } },
                                client: {
                                    select: {
                                        id: true,
                                        name: true,
                                        themeColor: true,
                                    },
                                },
                            },
                        },
                    },
                }),
            ]);

            return { items, total };
        } catch {
            throw new InternalServerErrorException('Failed to find projects');
        }
    }

    async findOne(userId: string, projectId: string) {
        try {
            const project = await this.prismaService.project.findUnique({
                where: { id: projectId, userId },
                include: {
                    client: true,
                    links: true,
                    clientContacts: {
                        include: {
                            clientContact: true,
                        },
                    },
                },
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

    async update(userId: string, projectId: string, updateDto: EditProjectDto) {
        try {
            const { links, contacts, ...dto } = updateDto;

            if (contacts?.contactType === 'client') {
                await this.prismaService.clientContactOnProject.deleteMany({
                    where: { projectId },
                });
            } else if (contacts?.contactType === 'partner') {
                await this.prismaService.partnerContactOnProject.deleteMany({
                    where: { projectId },
                });
            }

            const result = await this.prismaService.project.update({
                where: { id: projectId, userId },
                data: {
                    ...dto,
                    note: dto.note,
                    partnerContacts:
                        contacts?.contactType === 'partner'
                            ? {
                                  create: contacts.contacts.map(
                                      (partnerContactId) => ({
                                          partnerContact: {
                                              connect: { id: partnerContactId },
                                          },
                                      }),
                                  ),
                              }
                            : undefined,
                    clientContacts:
                        contacts?.contactType === 'client'
                            ? {
                                  create: contacts.contacts.map(
                                      (contactId) => ({
                                          clientContact: {
                                              connect: {
                                                  id: contactId, // Connect each client contact dynamically
                                              },
                                          },
                                      }),
                                  ),
                              }
                            : undefined,
                    links: links
                        ? {
                              deleteMany: {},
                              create: links.map((link) => ({
                                  label: link.label,
                                  url: link.url,
                                  user: { connect: { id: userId } },
                              })),
                          }
                        : undefined,
                },
            });

            return result;
        } catch (error) {
            console.log('error', error);
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
            await this.prismaService.project.delete({
                where: { id: projectId, userId },
            });
            return { success: true };
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
