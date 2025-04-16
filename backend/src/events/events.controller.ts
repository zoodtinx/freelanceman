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
import { EventsService } from './events.service';
import { AuthGuard } from '@nestjs/passport';
import { ZodValidationPipe } from 'src/shared/pipes/zod-validation.pipe';
import {
    createEventSchema,
    updateEventSchema,
    eventFilterSchema,
} from 'freelanceman-common';

@UseGuards(AuthGuard('jwt-access'))
@Controller('events')
export class EventsController {
    constructor(private readonly eventsService: EventsService) {}

    @Post()
    create(
        @Body(new ZodValidationPipe(createEventSchema)) createEventDto: any,
        @Req() req: any,
    ) {
        const userId = req.user.id;
        return this.eventsService.create(userId, createEventDto);
    }

    @Post('search')
    @HttpCode(200)
    findMany(
        @Body(new ZodValidationPipe(eventFilterSchema)) payload: any,
        @Req() req: any,
    ) {
        const userId = req.user.id;
        return this.eventsService.findAll(userId, payload);
    }

    @Get(':id')
    findOne(@Param('id') eventId: string, @Req() req: any) {
        const userId = req.user.id;
        return this.eventsService.findOne(userId, eventId);
    }

    @Patch(':id')
    update(
        @Param('id') eventId: string,
        @Body(new ZodValidationPipe(updateEventSchema)) updateEventDto: any,
        @Req() req: any,
    ) {
        const userId = req.user.id;
        return this.eventsService.update(userId, eventId, updateEventDto);
    }

    @Delete(':id')
    remove(@Param('id') eventId: string, @Req() req: any) {
        const userId = req.user.id;
        return this.eventsService.remove(userId, eventId);
    }
}
