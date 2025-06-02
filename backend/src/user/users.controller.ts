import {
    Controller,
    Get,
    Body,
    Patch,
    UseGuards,
    Req,
    Param,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';
import { ZodValidationPipe } from 'src/shared/pipes/zod-validation.pipe';
import { editUserProfileSchema } from 'freelanceman-common';

@UseGuards(AuthGuard('jwt-access'))
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get()
    findOne(@Req() req: any) {
        const userId = req.user.id;
        return this.usersService.findOne(userId);
    }

    @Patch()
    update(
        @Req() req: any,
        @Body(new ZodValidationPipe(editUserProfileSchema)) payload: any,
    ) {
        const userId = req.user.id;
        return this.usersService.update(userId, payload);
    }

    @Get('/visited/:page')
    setVisited(@Param('page') page: string, @Req() req: any) {
        const userId = req.user.id;
        return this.usersService.setVisited(userId, page);
    }
}
