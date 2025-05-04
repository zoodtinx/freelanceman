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
    editFileSchema,
    GetPresignedUrlDto,
} from 'freelanceman-common';
import { FilesService } from 'src/files/files.service';
import { S3Service } from '@/shared/s3/s3.service';

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

    @Post('url')
    @HttpCode(200)
    getFileUrl(@Body('key') fileKey: string) {
        return this.s3Service.getSignedUrlForDownload(fileKey);
    }

    @Post('presign')
    @HttpCode(200)
    getPresignedUrl(
        @Body(new ZodValidationPipe(getPresignedUrlSchema))
        payload: GetPresignedUrlDto,
        @Req() req: any,
    ) {
        const userId = req.user.id;
        return this.s3Service.getPresignedUrl(userId, payload);
    }
}
