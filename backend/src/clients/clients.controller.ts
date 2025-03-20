import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UsePipes } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { AuthGuard } from '@nestjs/passport';
import { ZodValidationPipe } from 'src/shared/pipes/zod-validation.pipe';
import { createClientSchema, findManyClientSchema } from 'src/shared/zod-schemas/client.schema';

@UseGuards(AuthGuard('jwt-access'))
@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(createClientSchema))
  create(@Body() payload: any) {
    const newClientInfo = payload.newClientInfo
    return this.clientsService.create(newClientInfo);
  }

  @Post('search')
  @UsePipes(new ZodValidationPipe(findManyClientSchema))
  findMany(@Body() payload: any) {
    const filter = payload.filter
    return this.clientsService.findMany(filter);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return  this.clientsService.findOne(id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() payload: any) {
    const updateClientInfo = payload.updateClientInfo
    return  this.clientsService.update(id, updateClientInfo)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return  this.clientsService.delete(id)
  }
}
