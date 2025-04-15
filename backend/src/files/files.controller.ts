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
import { AuthGuard } from '@nestjs/passport';
import { ZodValidationPipe } from 'src/shared/pipes/zod-validation.pipe';
import {
    createFileSchema,
    getPresignedUrlSchema,
    fileFilterSchema,
    updateFileSchema,
} from '@schemas';
import { FilesService } from 'src/files/files.service';

@UseGuards(AuthGuard('jwt-access'))
@Controller('files')
export class FilesController {
    constructor(private readonly filesService: FilesService) {}

    @Post()
    create(
        @Body(new ZodValidationPipe(createFileSchema))
        createDto: any,
        @Req() req: any,
    ) {
        const userId = req.user.id;
        return this.filesService.create(userId, createDto);
    }

    @Post('presign')
    @HttpCode(200)
    getPresignedUrl(
        @Body(new ZodValidationPipe(getPresignedUrlSchema))
        getPresignedUrlDto: any,
    ) {
        const presignedUrl = this.filesService.getUploadUrl(getPresignedUrlDto);
        return { presignedUrl: presignedUrl };
    }

    @Post('search')
    @HttpCode(200)
    findMany(
        @Body(new ZodValidationPipe(fileFilterSchema)) payload: any,
        @Req() req: any,
    ) {
        const userId = req.user.id;
        return this.filesService.findMany(userId, payload);
    }

    @Get(':id')
    findOne(@Param('id') fileId: string, @Req() req: any) {
        const userId = req.user.id;
        return this.filesService.findOne(userId, fileId);
    }

    @Patch(':id')
    update(
        @Param('id') fileId: string,
        @Body(new ZodValidationPipe(updateFileSchema))
        updateDto: any,
        @Req() req: any,
    ) {
        const userId = req.user.id;
        return this.filesService.update(userId, fileId, updateDto);
    }

    @Delete(':id')
    remove(@Param('id') fileId: string, @Req() req: any) {
        const userId = req.user.id;
        return this.filesService.delete(userId, fileId);
    }
}
