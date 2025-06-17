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
import { FilesService } from 'src/files/files.service';
import { S3Service } from '@/shared/s3/s3.service';
import { z } from 'zod';
import {
    createFileSchema,
    editFileSchema,
    fileFilterSchema,
    S3GetPresignedUrlDto,
    s3GetPresignedUrlDtoSchema,
} from 'freelanceman-common';

@UseGuards(AuthGuard('jwt-access'))
@Controller('files')
export class FilesController {
    constructor(
        private readonly filesService: FilesService,
        private readonly s3Service: S3Service,
    ) {}

    @Post()
    create(
        @Body(new ZodValidationPipe(createFileSchema))
        createDto: any,
        @Req() req: any,
    ) {
        const userId = req.user.id;
        return this.filesService.create(userId, createDto);
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
        @Body(new ZodValidationPipe(editFileSchema))
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

    @Post('delete-many')
    @HttpCode(200)
    removeMany(
        @Body(new ZodValidationPipe(z.array(z.string()))) fileIds: string[],
        @Req() req: any,
    ) {
        const userId = req.user.id;
        return this.filesService.deleteMany(userId, fileIds);
    }

    @Post('url')
    @HttpCode(200)
    getFileUrl(@Body('key') fileKey: string) {
        return this.s3Service.getSignedUrlForDownload(fileKey);
    }

    @Post('presign')
    @HttpCode(200)
    getPresignedUrl(
        @Body(new ZodValidationPipe(s3GetPresignedUrlDtoSchema))
        payload: S3GetPresignedUrlDto,
        @Req() req: any,
    ) {
        const userId = req.user.id;
        return this.s3Service.getPresignedUrl(userId, payload);
    }
}
