import {
    Injectable,
    BadRequestException,
    InternalServerErrorException,
    NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/shared/database/prisma.service';
import {
    CreateTaskDto,
    UpdateTaskDto,
    SearchTaskSchema,
} from 'src/shared/zod-schemas/task.schema';
import { Prisma } from '@prisma/client';

@Injectable()
export class TasksService {
    constructor(private prismaService: PrismaService) {}

    async create(userId: string, createTaskDto: CreateTaskDto) {
        try {
            const result = await this.prismaService.task.create({
                data: {
                    dueAt: createTaskDto.dueAt,
                    name: createTaskDto.name,
                    status: createTaskDto.status,
                    details: createTaskDto.details,
                    link: createTaskDto.link,
                    projectId: createTaskDto.projectId,
                    clientId: createTaskDto.clientId,
                    userId: userId,
                },
            });
            return result;
        } catch (error) {
            if (
                error instanceof Prisma.PrismaClientKnownRequestError &&
                error.code === 'P2002'
            ) {
                throw new BadRequestException(
                    'A task with this unique field already exists',
                );
            }
            console.log('error', error)
            throw new InternalServerErrorException('Failed to create task');
        }
    }

    async findAll(userId: string, filter: SearchTaskSchema) {
        try {
            console.log('filter', filter);
            const result = await this.prismaService.task.findMany({
                where: {
                    userId: userId,
                    name: {
                        contains: filter.name,
                    },
                    status: filter.status,
                    dueAt: filter.dueAt,
                    projectId: filter.projectId,
                    clientId: filter.clientId,
                },
                orderBy: {
                    dueAt: 'asc'
                }
            });
            console.log('result', result);
            return result;
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

    async update(userId: string, taskId: string, updateTaskDto: UpdateTaskDto) {
        try {
            await this.prismaService.task.update({
                where: { id: taskId, userId },
                data: updateTaskDto,
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
