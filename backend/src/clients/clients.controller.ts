import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseGuards,
    UsePipes,
    HttpCode,
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
    ) {
        return this.clientsService.create(createClientDto);
    }

    @Post('search')
    @HttpCode(200)
    findMany(@Body(new ZodValidationPipe(searchClientSchema)) payload: any) {
        return this.clientsService.findMany(payload);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.clientsService.findOne(id);
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body(new ZodValidationPipe(editClientSchema))
        payload: any,
    ) {
        return this.clientsService.update(id, payload);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.clientsService.delete(id);
    }
}
