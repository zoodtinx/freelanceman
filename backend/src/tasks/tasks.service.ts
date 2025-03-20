import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PrismaService } from 'src/shared/database/prisma.service';

@Injectable()
export class TasksService {
  constructor(
          private prismaService: PrismaService,
      ) {}
  
  create(createTaskDto: CreateTaskDto) {
    return 'This action adds a new task';
  }

  findAll() {
    return `This action returns all tasks`;
  }

  async findOne(id: string) {
    const task = await this.prismaService.task.findFirst({
      where: { id: id }
    })
    
    if (!task) {
      throw new NotFoundException(`Task with id: ${id} is not found`);
    }

    return `This action returns a #${id} task`;
  }

  update(id: number, updateTaskDto: UpdateTaskDto) {
    return `This action updates a #${id} task`;
  }

  remove(id: number) {
    return `This action removes a #${id} task`;
  }
}
