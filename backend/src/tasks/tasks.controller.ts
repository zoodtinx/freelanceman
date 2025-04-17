import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  HttpCode,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { AuthGuard } from '@nestjs/passport';
import { ZodValidationPipe } from 'src/shared/pipes/zod-validation.pipe';
import {
  createTaskSchema,
  editTaskSchema,
  taskFilterSchema,
} from 'freelanceman-common';

@UseGuards(AuthGuard('jwt-access'))
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  create(
    @Body(new ZodValidationPipe(createTaskSchema)) createTaskDto: any,
    @Req() req: any,
  ) {
    const userId = req.user.id;
    return this.tasksService.create(userId, createTaskDto);
  }

  @Post('search')
  @HttpCode(200)
  findMany(
    @Body(new ZodValidationPipe(taskFilterSchema)) payload: any,
    @Req() req: any,
  ) {
    const userId = req.user.id;
    return this.tasksService.findAll(userId, payload);
  }

  @Get(':id')
  findOne(@Param('id') taskId: string, @Req() req: any) {
    const userId = req.user.id;
    return this.tasksService.findOne(userId, taskId);
  }

  @Patch(':id')
  update(
    @Param('id') taskId: string,
    @Body(new ZodValidationPipe(editTaskSchema)) payload: any,
    @Req() req: any,
  ) {
    const userId = req.user.id;
    return this.tasksService.update(userId, taskId, payload);
  }

  @Delete(':id')
  remove(@Param('id') taskId: string, @Req() req: any) {
    const userId = req.user.id;
    return this.tasksService.remove(userId, taskId);
  }
}
