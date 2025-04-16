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
    createClientContactSchema,
    clientContactFilterSchema,
    updateClientContactSchema,
} from 'freelanceman-common';
import { ClientContactService } from 'src/client-contacts/client-contacts.service';

@UseGuards(AuthGuard('jwt-access'))
@Controller('client-contacts')
export class ClientContactsController {
    constructor(private readonly clientContactsService: ClientContactService) {}

    @Post()
    create(
        @Body(new ZodValidationPipe(createClientContactSchema))
        createClientDto: any,
        @Req() req: any,
    ) {
        const userId = req.user.id;
        return this.clientContactsService.create(userId, createClientDto);
    }

    @Post('search')
    @HttpCode(200)
    findMany(
        @Body(new ZodValidationPipe(clientContactFilterSchema)) payload: any,
        @Req() req: any,
    ) {
        const userId = req.user.id;
        return this.clientContactsService.findAll(userId, payload);
    }

    @Get(':id')
    findOne(@Param('id') clientId: string, @Req() req: any) {
        const userId = req.user.id;
        return this.clientContactsService.findOne(userId, clientId);
    }

    @Patch(':id')
    update(
        @Param('id') clientId: string,
        @Body(new ZodValidationPipe(updateClientContactSchema))
        updateClientDto: any,
        @Req() req: any,
    ) {
        const userId = req.user.id;
        return this.clientContactsService.update(
            userId,
            clientId,
            updateClientDto,
        );
    }

    @Delete(':id')
    remove(@Param('id') clientId: string, @Req() req: any) {
        const userId = req.user.id;
        return this.clientContactsService.remove(userId, clientId);
    }
}
