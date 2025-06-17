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
    createSalesDocumentSchema,
    salesDocumentFilterSchema,
    editSalesDocumentSchema,
    createPdfDtoSchema,
} from 'freelanceman-common';
import { SalesDocumentsService } from 'src/sales-documents/sales-documents.service';

@UseGuards(AuthGuard('jwt-access'))
@Controller('sales-documents')
export class SalesDocumentsController {
    constructor(
        private readonly salesDocumentsService: SalesDocumentsService,
    ) {}

    @Post()
    async create(
        @Body(new ZodValidationPipe(createSalesDocumentSchema))
        createDto: any,
        @Req() req: any,
    ) {
        const userId = req.user.id;
        const result = await this.salesDocumentsService.create(
            userId,
            createDto,
        );
        return result;
    }

    @Post('search')
    @HttpCode(200)
    async findMany(
        @Body(new ZodValidationPipe(salesDocumentFilterSchema)) payload: any,
        @Req() req: any,
    ) {
        const userId = req.user.id;
        const result = await this.salesDocumentsService.findMany(
            userId,
            payload,
        );
        return result;
    }

    @Get(':id')
    async findOne(@Param('id') docId: string, @Req() req: any) {
        const userId = req.user.id;
        return this.salesDocumentsService.findOne(userId, docId);
    }

    @Patch(':id')
    async update(
        @Param('id') docId: string,
        @Body(new ZodValidationPipe(editSalesDocumentSchema))
        updateDto: any,
        @Req() req: any,
    ) {
        const userId = req.user.id;
        const result = await this.salesDocumentsService.update(
            userId,
            docId,
            updateDto,
        );
        if (!result) {
            return { success: false, message: 'Failed to update document' };
        }
        return result;
    }

    @Delete(':id')
    async remove(@Param('id') docId: string, @Req() req: any) {
        const userId = req.user.id;
        return this.salesDocumentsService.delete(userId, docId);
    }

    @Post('create-pdf')
    async createPdf(
        @Body(new ZodValidationPipe(createPdfDtoSchema))
        createPdfDto: any,
        @Req() req: any,
    ) {
        const userId = req.user.id;
        const result = await this.salesDocumentsService.createPdf(
            userId,
            createPdfDto,
        );
        return result;
    }
}
