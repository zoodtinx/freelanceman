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
import { ClientsService } from './clients.service';
import { AuthGuard } from '@nestjs/passport';
import { ZodValidationPipe } from 'src/shared/pipes/zod-validation.pipe';
import {
    createClientSchema,
    editClientSchema,
    searchClientSchema,
} from 'src/shared/zod-schemas/client.schema';

@UseGuards(AuthGuard('jwt-access'))
@Controller('clients')
export class ClientsController {
    constructor(private readonly clientsService: ClientsService) {}

    @Post()
    create(
        @Body(new ZodValidationPipe(createClientSchema)) createClientDto: any,
        @Req() req: any,
    ) {
        const userId = req.user.id;
        return this.clientsService.create(userId, createClientDto);
    }

    @Post('search')
    @HttpCode(200)
    findMany(
        @Body(new ZodValidationPipe(searchClientSchema)) payload: any,
        @Req() req: any,
    ) {
        const userId = req.user.id;
        return this.clientsService.findMany(userId, payload);
    }

    @Get(':id')
    findOne(@Param('id') taskId: string, @Req() req: any) {
        const userId = req.user.id;
        return this.clientsService.findOne(userId, taskId);
    }

    @Patch(':id')
    update(
        @Param('id') taskId: string,
        @Body(new ZodValidationPipe(editClientSchema))
        payload: any,
        @Req() req: any,
    ) {
        const userId = req.user.id;
        return this.clientsService.update(userId, taskId, payload);
    }

    @Delete(':id')
    remove(@Param('id') taskId: string, @Req() req: any) {
        const userId = req.user.id;
        return this.clientsService.delete(userId, taskId);
    }
}
