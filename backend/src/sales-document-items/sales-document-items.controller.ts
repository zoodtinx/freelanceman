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
    createSalesDocumentItemSchema,
    updateSalesDocumentItemSchema,
} from 'src/shared/zod-schemas/sales-document-item.schema';
import { SalesDocumentItemsService } from 'src/sales-document-items/sales-document-items.service';

@UseGuards(AuthGuard('jwt-access'))
@Controller('sales-document-items')
export class SalesDocumentItemsController {
    constructor(
        private readonly salesDocumentItemsService: SalesDocumentItemsService,
    ) {}

    @Post()
    create(
        @Body(new ZodValidationPipe(createSalesDocumentItemSchema))
        createDto: any,
        @Req() req: any,
    ) {
        const userId = req.user.id;
        return this.salesDocumentItemsService.create(userId, createDto);
    }


    @Get('all/:documentId')
    findMany(@Param('projectId') documentId: string, @Req() req: any) {
        const userId = req.user.id;
        return this.salesDocumentItemsService.findMany(userId, documentId);
    }

    @Get(':id')
    findOne(@Param('id') itemId: string, @Req() req: any) {
        const userId = req.user.id;
        return this.salesDocumentItemsService.findOne(userId, itemId);
    }

    @Patch(':id')
    update(
        @Param('id') itemId: string,
        @Body(new ZodValidationPipe(updateSalesDocumentItemSchema))
        updateDto: any,
        @Req() req: any,
    ) {
        const userId = req.user.id;
        return this.salesDocumentItemsService.update(userId, itemId, updateDto);
    }

    @Delete(':id')
    remove(@Param('id') itemId: string, @Req() req: any) {
        const userId = req.user.id;
        return this.salesDocumentItemsService.delete(userId, itemId);
    }
}
