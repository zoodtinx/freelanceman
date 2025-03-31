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
    searchSalesDocumentSchema,
    updateSalesDocumentSchema,
} from 'src/shared/zod-schemas/sales-document.schema';
import { SalesDocumentsService } from 'src/sales-documents/sales-documents.service';

@UseGuards(AuthGuard('jwt-access'))
@Controller('sales-documents')
export class SalesDocumentsController {
    constructor(
        private readonly salesDocumentsService: SalesDocumentsService,
    ) {}

    @Post()
    create(
        @Body(new ZodValidationPipe(createSalesDocumentSchema))
        createDto: any,
        @Req() req: any,
    ) {
        const userId = req.user.id;
        return this.salesDocumentsService.create(userId, createDto);
    }

    @Post('search')
    @HttpCode(200)
    findMany(
        @Body(new ZodValidationPipe(searchSalesDocumentSchema)) payload: any,
        @Req() req: any,
    ) {
        const userId = req.user.id;
        return this.salesDocumentsService.findMany(userId, payload);
    }

    @Get(':id')
    findOne(@Param('id') docId: string, @Req() req: any) {
        const userId = req.user.id;
        return this.salesDocumentsService.findOne(userId, docId);
    }

    @Patch(':id')
    update(
        @Param('id') docId: string,
        @Body(new ZodValidationPipe(updateSalesDocumentSchema))
        updateDto: any,
        @Req() req: any,
    ) {
        const userId = req.user.id;
        return this.salesDocumentsService.update(userId, docId, updateDto);
    }

    @Delete(':id')
    remove(@Param('id') docId: string, @Req() req: any) {
        const userId = req.user.id;
        return this.salesDocumentsService.delete(userId, docId);
    }

    @Post('create-pdf')
    createPdf(
        @Body(new ZodValidationPipe(createSalesDocumentSchema))
        createPdfDto: any,
        @Req() req: any,
    ) {
        const userId = req.user.id;
        return this.salesDocumentsService.create(userId, createPdfDto)
    }
}
