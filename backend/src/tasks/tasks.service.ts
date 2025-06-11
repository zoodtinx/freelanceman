import {
    Injectable,
    BadRequestException,
    InternalServerErrorException,
    NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/shared/database/prisma.service';
import { CreateTaskDto, EditTaskDto, TaskFilterDto } from 'freelanceman-common';
import { Prisma } from '@prisma/client';

@Injectable()
export class TasksService {
    constructor(private prismaService: PrismaService) {}

    async create(userId: string, createTaskDto: CreateTaskDto) {
        const {projectId, ...taskData} = createTaskDto
        try {
            let clientId: any

            if (projectId) {
                const project = await this.prismaService.project.findUnique({
                    where: { id: projectId },
                    select: { clientId: true },
                });

                if (!project) throw new Error('Project not found');

                clientId = project.clientId
            }

            const result = await this.prismaService.task.create({
                data: {
                    ...taskData,
                    user: {
                        connect: {
                            id: userId
                        }
                    },
                    project: projectId ? {
                        connect: {
                            id: projectId
                        }
                    } : undefined,
                    client: clientId ? {
                        connect: {
                            id: clientId
                        }
                    } : undefined
                },
            });
            return result;
        } catch (error) {
            console.log('error', error)
            if (
                error instanceof Prisma.PrismaClientKnownRequestError &&
                error.code === 'P2002'
            ) {
                throw new BadRequestException(
                    'A task with this unique field already exists',
                );
            }

            throw new InternalServerErrorException('Failed to create task');
        }
    }

    async findAll(userId: string, filter: TaskFilterDto) {
        try {
            const where = {
                userId: userId,
                name: filter.name ? {
                    contains: filter.name,
                    mode: 'insensitive' as const,
                } : undefined,
                status: filter.status,
                dueAt: filter.dueAt,
                projectId: filter.projectId ? filter.projectId : undefined,
                clientId: filter.clientId ? filter.clientId: undefined,
            };

            const [total, items] = await Promise.all([
                this.prismaService.task.count({ where }),
                this.prismaService.task.findMany({
                    where,
                    take: filter.take ? filter.take : 30,
                    orderBy: { dueAt: 'asc' },
                    include: {
                        project: {
                            select: { id: true, title: true },
                        },
                        client: {
                            select: { id: true, name: true, themeColor: true },
                        },
                    },
                }),
            ]);

            console.log('items', items)

            return { items, total };
        } catch {
            throw new InternalServerErrorException('Failed to find tasks');
        }
    }

    async findOne(userId: string, taskId: string) {
        try {
            const task = await this.prismaService.task.findUnique({
                where: { id: taskId, userId },
            });
            if (!task) {
                throw new NotFoundException(`Task with ID ${taskId} not found`);
            }
            return task;
        } catch (error) {
            if (error instanceof NotFoundException) throw error;
            throw new InternalServerErrorException('Failed to find task');
        }
    }

    async update(userId: string, taskId: string, EditTaskDto: EditTaskDto) {
        try {
            await this.prismaService.task.update({
                where: { id: taskId, userId },
                data: EditTaskDto,
            });
            return await this.findOne(userId, taskId);
        } catch (error) {
            throw new InternalServerErrorException('Failed to update task');
        }
    }

    async remove(userId: string, taskId: string) {
        try {
            await this.prismaService.task.delete({
                where: { id: taskId, userId },
            });
            return { success: true };
        } catch (error) {
            throw new InternalServerErrorException('Failed to remove task');
        }
    }
}
