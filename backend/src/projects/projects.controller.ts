import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseGuards,
    HttpCode,
    Req,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { AuthGuard } from '@nestjs/passport';
import { ZodValidationPipe } from 'src/shared/pipes/zod-validation.pipe';
import {
    createProjectSchema,
    editProjectSchema,
    projectFilterSchema,
} from 'freelanceman-common';

@UseGuards(AuthGuard('jwt-access'))
@Controller('projects')
export class ProjectsController {
    constructor(private readonly projectsService: ProjectsService) {}

    @Post()
    create(
        @Body(new ZodValidationPipe(createProjectSchema)) createProjectDto: any,
        @Req() req: any,
    ) {
        const userId = req.user.id;
        return this.projectsService.create(userId, createProjectDto);
    }

    @Post('search')
    @HttpCode(200)
    findMany(
        @Body(new ZodValidationPipe(projectFilterSchema)) payload: any,
        @Req() req: any,
    ) {
        const userId = req.user.id;
        return this.projectsService.findMany(userId, payload);
    }

    @Get(':id')
    findOne(@Param('id') projectId: string, @Req() req: any) {
        const userId = req.user.id;
        return this.projectsService.findOne(userId, projectId);
    }

    @Patch(':id')
    update(
        @Param('id') projectId: string,
        @Body(new ZodValidationPipe(editProjectSchema)) payload: any,
        @Req() req: any,
    ) {
        const userId = req.user.id;
        return this.projectsService.update(userId, projectId, payload);
    }

    @Delete(':id')
    remove(@Param('id') projectId: string, @Req() req: any) {
        const userId = req.user.id;
        return this.projectsService.remove(userId, projectId);
    }
}
